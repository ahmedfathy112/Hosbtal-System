"use client";
import React from "react";
import { HomeCard } from "../ReusableComponet/HomeCard";

const HomePage = () => {
  // Steps Section details
  const steps = [
    {
      icon: "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25",
      title: "تسجيل الدخول",
      description: "سجل دخولك كمريض أو طبيب أو مسؤول للمستشفى",
    },
    {
      icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
      title: "إدارة الملف الشخصي",
      description: "أكمل بياناتك الشخصية لتجربة مخصصة",
    },
    {
      icon: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75",
      title: "حجز المواعيد",
      description: "أحجز موعداً مع الطبيب المناسب في الوقت المناسب",
    },
  ];

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="w-full flex justify-center items-center flex-col text-center py-32 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
          نظام حجز المواعيد الطبية السهل
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          منصة بسيطة وسلسة لحجز المواعيد الطبية بكل سهولة ويسر
        </p>
        {/* unuseless Button */}

        {/* <div className="flex gap-4">
          <button className="py-3 px-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-200">
            إبدأ الآن
          </button>
          <button className="py-3 px-6 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg shadow-sm transition-all duration-200">
            تعرف أكثر
          </button>
        </div> */}
      </section>

      {/* Our Features Section */}
      <section className="w-full py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            مميزات النظام
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            نقدم حلاً بسيطاً وسهلاً لحجز المواعيد الطبية بكفاءة عالية
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Appointments Card */}
          <HomeCard
            tittle="حجز المواعيد"
            paragraph="نظام سهل وبسيط لحجز المواعيد مع أفضل الأطباء في أي وقت ومن أي مكان"
            iconPath="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
          />

          {/* Paitent Card */}
          <HomeCard
            tittle="لوحة المريض"
            paragraph="واجهة سهلة الاستخدام تمكن المريض من إدارة مواعيده بكل بساطة"
            iconPath="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />

          {/* Doctors Card */}
          <HomeCard
            tittle="لوحة الطبيب"
            paragraph="أدوات بسيطة للأطباء لإدارة المواعيد وجدولة المرضى"
            iconPath="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />

          {/* Manager Card*/}
          <HomeCard
            tittle="الإدارة"
            paragraph="نظام مبسط لإدارة العيادات وتنظيم المواعيد بكفاءة"
            iconPath="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </div>
      </section>

      {/* How System Work Section */}
      <section className="w-full py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              كيف يعمل النظام؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              خطوات بسيطة لحجز موعدك الطبي بكل سهولة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer hover:-translate-y-1.5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-blue-600 dark:text-blue-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={step.icon}
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
