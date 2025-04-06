import React from "react";

const Booking = () => {
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
  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">سجل الحجوزات</h2>
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

        <h3 className="font-medium text-xl my-2.5">سجل الحجوزات</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          هنا ستجد معلومات عن الحجوزات الحاليه والسابقة
        </span>
      </div>

      {/* table of booking */}
      <div className="w-full overflow-x-auto my-10">
        <table className="w-full border-collapse border border-gray-600 text-white text-right">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border border-gray-600">التاريخ</th>
              <th className="p-3 border border-gray-600">الوقت</th>
              <th className="p-3 border border-gray-600">السبب</th>
              <th className="p-3 border border-gray-600">اسم المريض</th>
              <th className="p-3 border border-gray-600">النوع</th>
              {/* <th className="p-3 border border-gray-600">عرض</th> */}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
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
                  <span className="px-2 py-1 rounded text-white">
                    {appointment.Gender}
                  </span>
                </td>
                {/* <td className="p-3 border border-gray-600 text-center">
                  <button className="text-blue-400 hover:text-blue-300">
                    👁️
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default Booking;
