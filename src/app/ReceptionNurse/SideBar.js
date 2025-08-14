"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // الصحيح
import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";

const SideBar = () => {
  const router = useRouter();

  const handleClick = (tab) => {
    router.push(`/?tab=${tab}`);
  };
  return (
    <aside className="relative w-1/5 flex flex-col text-center p-4 bg-[#284cff0d] rounded-2xl h-[50dvh] max-md:h-dvh max-md:px-2 max-md:w-1/6">
      {/* Profile Link */}
      <Link
        href="/ReceptionNurse/?tab=personal"
        onClick={() => handleClick("personal")}
        className="w-full flex flex-row text-center my-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 my-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <h4 className="text-[18px] font-medium mx-2 cursor-pointer transition-all hover:text-[#284CFF] max-md:hidden">
          الملف الشخصي
        </h4>
      </Link>
      {/* Salary Link */}
      <Link href="/SalaryPage" className="w-full flex flex-row text-left my-3">
        <FaMoneyBillAlt className="my-auto text-2xl" />

        <h4 className="text-[18px] font-medium mx-2 cursor-pointer transition-all hover:text-[#284CFF] max-md:hidden">
          الراتب
        </h4>
      </Link>
    </aside>
  );
};

export default SideBar;
