import React, { useState } from "react";

const Booking = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const appointments = [
    {
      date: "15 يناير 2023",
      time: "10:30 صباحًا",
      Reason: "التهاب عصعصي الباطنية",
      patiantName: "محمود السعيد محمد",
      Gender: "أنثي",
    },
    {
      date: "22 فبراير 2023",
      time: "12:00 ظهرًا",
      Reason: "التهاب عصعصي",
      patiantName: "محمد ايمن عبدالله",
      Gender: "ذكر",
    },
    {
      date: "10 مارس 2023",
      time: "09:15 صباحًا",
      Reason: "التهاب عصعصي",
      patiantName: "حماده بوبوس",
      Gender: "ذكر",
    },
    {
      date: "5 أبريل 2023",
      time: "11:45 صباحًا",
      Reason: "التهاب عصعصي",
      patiantName: "بوجي وطمطم",
      Gender: "ذكر",
    },
    {
      date: "18 مايو 2023",
      time: "02:30 مساءً",
      Reason: "التهاب عصعصي",
      patiantName: "طمطم وبوجي",
      Gender: "ذكر",
    },
    {
      date: "25 يونيو 2023",
      time: "04:00 مساءً",
      Reason: "التهاب عصعصي",
      patiantName: "السيد احمد",
      Gender: "ذكر",
    },
  ];

  // filter the appointments
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patiantName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.Reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">سجل الحجوزات</h2>

      {/* hedding card for page details */}
      <div className="w-full flex flex-col justify-start rounded-2xl bg-[#284cff1d] py-7 px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <svg
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <h3 className="font-medium text-xl">سجل الحجوزات</h3>
          </div>

          {/* here you can search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="ابحث باسم المريض أو السبب..."
              className="w-full bg-white dark:bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 absolute left-3 top-2.5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>

        <span className="font-medium text-sm text-gray-400">
          هنا ستجد معلومات عن الحجوزات الحاليه والسابقة
        </span>
      </div>

      {/* جدول الحجوزات */}
      <div className="w-full overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-600 text-white text-right">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border border-gray-600">التاريخ</th>
              <th className="p-3 border border-gray-600">الوقت</th>
              <th className="p-3 border border-gray-600">السبب</th>
              <th className="p-3 border border-gray-600">اسم المريض</th>
              <th className="p-3 border border-gray-600">النوع</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr
                  key={index}
                  className="border border-gray-600 hover:bg-gray-700"
                >
                  <td className="p-3 border border-gray-600">
                    {appointment.date}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {appointment.time}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {appointment.Reason}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {appointment.patiantName}
                  </td>
                  <td className="p-3 border border-gray-600">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appointment.Gender === "أنثي"
                          ? "bg-purple-900 text-purple-300"
                          : "bg-blue-900 text-blue-300"
                      }`}
                    >
                      {appointment.Gender}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  لا توجد نتائج مطابقة للبحث
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default Booking;
