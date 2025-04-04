import React from "react";
import { HomeCard } from "../ReusableComponet/HomeCard";

const HomePage = () => {
  return (
    <main className="min-h-dvh">
      {/* Hero Section */}
      <section className="w-full flex justify-center items-center flex-col text-center my-[160px] max-md:my-[100px]">
        <h1 className="text-5xl font-semibold my-4">
          نظام إداره المستشفيات المتكامل
        </h1>
        <p className="text-[21px] text-gray-400 my-4 font-medium">
          منصة متكامله لإداره المستشفيات والمراكز الطبيه بكفاءه عالية وتجربة
          مستخدم سلسه
        </p>
        <button className="py-2 px-4 bg-[#284CFF] text-white cursor-pointer rounded-lg">
          إبدأ الأن
        </button>
      </section>
      {/* Our Featuers Section */}
      <section className="w-full my-4 text-center flex flex-col">
        <h3 className="text-3xl font-medium my-6">المميزات الرئيسية</h3>
        <div className="flex flex-row flex-wrap justify-center">
          <HomeCard
            tittle="حجز الموعيد"
            paragraph="نظام متكامل لحجز الموعيد وادارتها بسهوله"
            button="اكتشف المزيد"
            width={1 / 5}
            iconPath="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
          />
          <HomeCard
            tittle="لوحة تحكم المريض"
            paragraph="واجهة سهلة الأستخدام تمكن المريض من متابعة الحجوزات والوصفات الطبية"
            button="اكتشف المزيد"
            width="1/5"
            iconPath="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
          <HomeCard
            tittle="لوحة تحكم الطبيب"
            paragraph="أدوات متقدمه للاطباء لإداره المواعيد ومتابعة الحالات واصدار التقارير الطبية"
            width="1/5"
            button="اكتشف المزيد"
            iconPath="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
          <HomeCard
            tittle="إدارة المستشفي"
            paragraph="نظام متكامل لإدارة المستشفي ومتابعه الحالات ومتابعة الموظفين والمخزون"
            width="1/5"
            button="اكتشف المزيد"
            iconPath="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </div>
      </section>
      {/* How System Work Section */}
      <section className="w-full my-4 text-center flex flex-col">
        <h3 className="text-3xl font-medium my-6">كيف يعمل النظام</h3>
        <div className="w-full flex justify-center flex-col">
          <div className="flex flex-row my-4 mx-auto w-[600px] max-md:w-full max-md:px-3">
            {/* login Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3 my-auto text-[#284CFF]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
            <div className="flex flex-col text-left">
              <h4>تسجيل الدخول</h4>
              <p>سجل دخولك كمريض او طبيب او مسؤول للمستشفي</p>
            </div>
          </div>
          <div className="flex flex-row my-4 mx-auto w-[600px] max-md:w-full max-md:px-3">
            {/* person Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3 text-[#284CFF]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <div className="flex flex-col text-left">
              <h4>إدارة الملف الشخصي</h4>
              <p>أكمل بياناتك الشخصية والطبية لتجربة مخصصه</p>
            </div>
          </div>
          <div className="flex flex-row my-4 mx-auto w-[600px] max-md:w-full max-md:px-3">
            {/* person Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-[#284CFF] mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>

            <div className="flex flex-col text-left">
              <h4>حجز المواعيد</h4>
              <p>أحجز موعدا مع الطبيب المناسب لك في الوقت المناسب لك</p>
            </div>
          </div>
          <div className="flex flex-row my-4 mx-auto w-[600px] max-md:w-full max-md:px-3">
            {/* person Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3 text-[#284CFF]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>

            <div className="flex flex-col text-left">
              <h4>متابعة الحالة الصحيه</h4>
              <p>تابع حالتك الصحية والتقارير الطبيه الخاصة بك</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default HomePage;
