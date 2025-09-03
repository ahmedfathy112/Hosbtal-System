"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth, useUserFullName } from "@/app/AuthService";
import Logo from "../../ahlElkherLogo.webp";
import Image from "next/image";

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
        <Link href={"/"} className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" className="w-[84px] h-[84px]"></Image>
          <h2 className="font-semibold text-2xl">أهل الخير</h2>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          {/* home Link */}
          <Link href="/" className="flex items-center cursor-pointer navHover">
            {/* Home Icon */}
            الرئيسية
          </Link>

          {/*زرار الداش بورد بيظهر بس للي مسجلين دخول*/}
          {shouldShowDashboard && (
            // DashBoard Button
            <Link
              href={getDashboardLink()}
              className="flex items-center cursor-pointer navHover"
            >
              {/* Star Icon */}
              لوحة التحكم
            </Link>
          )}

          {/* AboutUs Button */}
          <Link
            href={"/AboutUs"}
            className="flex items-center cursor-pointer navHover"
          >
            {/* Heart Icon */}
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
