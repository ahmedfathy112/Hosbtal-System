"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // الصحيح
import React from "react";

const SideBar = () => {
  const router = useRouter();

  const handleClick = (tab) => {
    router.push(`/?tab=${tab}`);
  };
  return (
    <aside className="relative w-1/5 flex flex-col text-center p-4 bg-[#284cff0d] rounded-2xl h-[50dvh] max-md:h-dvh max-md:px-2 max-md:w-1/6">
      {/* Profile Link */}
      <Link
        href="/DoctorDachboard/?tab=personalDoc"
        onClick={() => handleClick("personalDoc")}
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
      {/* Appoin Link */}
      <Link
        href="/DoctorDachboard/?tab=bookingDoc"
        onClick={() => handleClick("bookingDoc")}
        className="w-full flex flex-row text-left my-3"
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>

        <h4 className="text-[18px] font-medium mx-2 cursor-pointer transition-all hover:text-[#284CFF] max-md:hidden">
          الحجوزات
        </h4>
      </Link>
      {/* Doctor Details Link */}
      <div className="w-full flex flex-row text-left my-3">
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
            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <h4 className="text-[18px] font-medium mx-2 cursor-pointer transition-all hover:text-[#284CFF] max-md:hidden">
          الراتب
        </h4>
      </div>

      {/* SignOut Button */}
      <button className="absolute bottom-3 flex flex-row text-left my-3 text-[18px] bg-red-600 font-medium mx-2 py-2 px-3 rounded-2xl outline-0 border-0 cursor-pointer max-md:bottom-1/3 max-md:px-1 max-md:left-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 my-auto mx-1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
        <span className="max-md:hidden">تسجيل الخروج</span>
      </button>
    </aside>
  );
};

export default SideBar;
