"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth, useUserFullName } from "@/app/AuthService";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { userRole, isAuthenticated, logout } = useAuth();
  const fullName = useUserFullName();

  // تحديد لوحة التحكم المناسبة بناءً على نوع المستخدم
  const getDashboardLink = () => {
    switch (userRole) {
      case "Admin":
      case "HR":
        return "/ManagerDashoard";
      case "Doctor":
        return "/DoctorDachboard";
      case "Patient":
        return "/PatiantDashboard";
      case "Reception":
        return "/ReceptionNurse";
      case "Nurse":
        return "/ReceptionNurse";
      default:
        return "/";
    }
  };

  const shouldShowDashboard =
    isAuthenticated &&
    ["Admin", "HR", "Doctor", "Patient", "Reception", "Nurse"].includes(
      userRole
    );

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="w-full py-4 shadow-md fixed top-0 left-0 z-50 bg-white dark:bg-gray-800">
      {/* for big monitor like [laptop] */}
      <nav className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href={"/"}>
          <h2 className="font-semibold text-2xl">أهل الخير</h2>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          {/* home Link */}
          <Link href="/" className="flex items-center cursor-pointer navHover">
            {/* Home Icon */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg> */}
            الرئيسية
          </Link>

          {/* Dashboard Link - يظهر فقط للمستخدمين المسجلين دخولاً */}
          {shouldShowDashboard && (
            // DashBoard Button
            <Link
              href={getDashboardLink()}
              className="flex items-center cursor-pointer navHover"
            >
              {/* Star Icon */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg> */}
              لوحة التحكم
            </Link>
          )}

          {/* AboutUs Button */}
          <Link
            href={"/AboutUs"}
            className="flex items-center cursor-pointer navHover"
          >
            {/* Heart Icon */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg> */}
            تعرف علينا
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <span className="py-2 px-4 text-white">مرحباً، {fullName}</span>
              <button
                onClick={logout}
                className="py-2 px-4 bg-red-600 text-white cursor-pointer rounded-lg block"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            // if he is not auth
            <>
              <Link
                href="/user/register"
                className="py-2 px-4 text-[#284CFF] border border-[#284CFF] cursor-pointer rounded-lg block"
              >
                إنشاء حساب
              </Link>
              <Link
                href="/user/login"
                className="py-2 px-4 bg-[#284CFF] text-white cursor-pointer rounded-lg block"
              >
                تسجيل الدخول
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="h-8 w-8 text-[#284CFF]" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-[#284CFF]" />
            )}
          </button>
        </div>
      </nav>

      {/* for small monitor like [Mobile] */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-16 left-0 w-full shadow-lg py-4 bg-[#1d232a] px-5"
        >
          <ul className="text-center space-y-4">
            {/* Home Link */}
            <li>
              <Link
                href="/"
                className="block py-2 hover:text-[#284CFF]"
                onClick={() => setIsOpen(false)}
              >
                الرئيسية
              </Link>
            </li>
            {/* Dashboard Link */}
            {shouldShowDashboard && (
              <li>
                <Link
                  href={getDashboardLink()}
                  className="block py-2 hover:text-[#284CFF]"
                  onClick={() => setIsOpen(false)}
                >
                  لوحة التحكم
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/AboutUs"
                className="block py-2 hover:text-[#284CFF]"
                onClick={() => setIsOpen(false)}
              >
                تعرف علينا
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <span className="py-2 px-4 text-white">مرحباً، {fullName}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2 bg-red-600 text-white rounded-lg block"
                >
                  تسجيل الخروج
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/user/register"
                    className="w-full py-2 text-[#284CFF] border border-[#284CFF] rounded-lg block"
                    onClick={() => setIsOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/login"
                    className="w-full py-2 bg-[#284CFF] text-white rounded-lg block"
                    onClick={() => setIsOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
export default NavBar;
