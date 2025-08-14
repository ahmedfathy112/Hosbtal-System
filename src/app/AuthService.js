"use client";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// Authentication context for managing user state, roles, and permissions
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userFullName, setUserFullName] = useState("");
  const router = useRouter();

  // decode the token to fetch the data
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        const decoded = decodeToken(token);

        if (decoded && decoded.exp * 1000 > Date.now()) {
          const role =
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          const fullname = decoded.fullname;

          const userData = {
            id: decoded.userId,
            email: decoded.email,
            fullname: fullname,
            role: role,
          };

          setUser(userData);
          setUserRole(role);
          setUserFullName(fullname);
          setIsAuthenticated(true);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // const login = async (username, password) => {
  //   try {
  //     const response = await axios.post(
  //       "https://hospital111.runasp.net/api/Auth/login",
  //       { username, password }
  //     );

  //     if (response.data.token) {
  //       localStorage.setItem("authToken", response.data.token);
  //       const decoded = decodeToken(response.data.token);
  //       const fullname = decoded.fullname;
  //       const role =
  //         decoded[
  //           "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  //         ];

  //       const userData = {
  //         id: decoded.userId,
  //         email: decoded.email,
  //         fullname: fullname,
  //         role: role,
  //       };

  //       setUser(userData);
  //       setUserRole(role);
  //       setUserFullName(fullname);
  //       setIsAuthenticated(true);
  //       axios.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${response.data.token}`;

  //       return { success: true, user: userData };
  //     }
  //     return {
  //       success: false,
  //       message: response.data.message || "Login failed",
  //     };
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     return {
  //       success: false,
  //       message: error.response?.data?.message || "Login failed",
  //     };
  //   }
  // };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setUserRole(null);
    setUserFullName("");
    setIsAuthenticated(false);
    delete axios.defaults.headers.common["Authorization"];
    router.push("/user/login");
  };

  // Role checking functions
  const hasRole = (requiredRole) => userRole === requiredRole;
  const hasAnyRole = (requiredRoles) => requiredRoles.includes(userRole);

  // Specific role checkers for validation
  const isAdmin = () => userRole === "Admin";
  const isHR = () => userRole === "HR";
  const isNurse = () => userRole === "Nurse";
  const isReception = () => userRole === "Reception";
  const isPatient = () => userRole === "Patient";
  const isAllowed = (allowedRoles) => allowedRoles.includes(userRole);

  const value = useMemo(
    () => ({
      user,
      userId: user?.id,
      userFullName,
      isAuthenticated,
      userRole,
      loading,
      // login,
      logout,
      hasRole,
      hasAnyRole,
      isAdmin,
      isHR,
      isNurse,
      isReception,
      isPatient,
      isAllowed,
    }),
    [user, isAuthenticated, userRole, loading, userFullName]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useUserId = () => {
  const { userId } = useAuth();
  return userId;
};

export const useUserFullName = () => {
  const { userFullName } = useAuth();
  return userFullName;
};
