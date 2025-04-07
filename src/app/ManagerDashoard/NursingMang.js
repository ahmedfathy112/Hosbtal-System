import React from "react";

const NursingMang = () => {
  const appointments = [
    {
      department: "قسم الأمراض الباطنية",
      nurse: "د. سارة أحمد",
      Phone: "01060755684",
    },
    {
      department: "قسم القلب",
      nurse: "د. محمد خالد",
      Phone: "01060755684",
    },
    {
      department: "قسم الأسنان",
      nurse: "د. فاطمة علي",
      Phone: "01060755684",
    },
    {
      department: "قسم العظام",
      nurse: "د. أحمد حسن",
      Phone: "01060755684",
    },
    {
      department: "قسم الجلدية",
      nurse: "د. نورا سمير",
      Phone: "01060755684",
    },
    {
      department: "قسم العيون",

      Phone: "01060755684",
      nurse: "د. خالد محمود",
    },
  ];
  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">
        معلومات طاقم التمريض
      </h2>
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

        <h3 className="font-medium text-xl my-2.5">طاقم التمريض</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          معلومات عن طاقم التمريض في المستشفي
        </span>
      </div>
      {/* table of Doctors */}
      <div className="w-full overflow-x-auto my-10">
        <table className="w-full border-collapse border border-gray-600 text-white text-right">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border border-gray-600">الممرض/الممرضه</th>
              <th className="p-3 border border-gray-600">القسم</th>
              <th className="p-3 border border-gray-600">رقم الهاتف</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className="border border-gray-600 hover:bg-gray-700"
              >
                <td className="p-3 border border-gray-600">
                  {appointment.nurse}
                </td>
                <td className="p-3 border border-gray-600">
                  {appointment.department}
                </td>
                <td className="p-3 border border-gray-600">
                  {appointment.Phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default NursingMang;
