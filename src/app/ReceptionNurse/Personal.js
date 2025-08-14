"use client";
import React, { useState, useEffect } from "react";
import { fetchUserById } from "@/app/ApiRequsets";

const Personal = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*
  --Here we get the token from the localStorage 
  ---then we get the userId after decoding the token
  ----then we use the userId to fetch the user date from the endpoint fetchUserById
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("من فضلك سجل مره اخري");
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId;

        if (!userId) {
          throw new Error("توجد مشكله حاول مره إعاده التسجيل");
        }

        const userResponse = await fetchUserById(userId);
        setUserData(userResponse);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="animate-pulse text-gray-500">
          جاري تحميل البيانات...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-gray-500">لا توجد بيانات متاحة</div>
      </div>
    );
  }

  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">معلومات الموظف</h2>
      {/* card for personal hedding */}
      <div className="w-full flex flex-col justify-start rounded-2xl bg-[#284cff1d] py-7 px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <h3 className="font-medium text-xl my-2.5">المعلومات الشخصيه</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          معلومات الموظف الأساسية
        </span>
      </div>
      {/* section of personal hedding */}
      <section className="w-full flex flex-row flex-wrap justify-between rounded-2xl bg-[#284cff1d] py-7 px-5 my-8">
        {/* the Name */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">الأسم</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {userData.fullname || "غير متوفر"}
            </span>
          </div>
        </div>
        {/* the Phone */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">رقم الهاتف</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {userData.phoneNumber || "غير متوفر"}
            </span>
          </div>
        </div>
        {/* the Email */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">البريد الإلكتروني</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {userData.email || "غير متوفر"}
            </span>
          </div>
        </div>
        {/* the Gender */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">النوع</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {userData.gender === "female" ? "أنثى" : "ذكر"}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Personal;
