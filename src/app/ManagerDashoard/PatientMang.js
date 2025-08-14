"use client";
import React, { useEffect, useState } from "react";
import { fetchPatients, deleteUser } from "@/app/ApiRequsets";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleDeletePatient = async (patientId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المريض؟")) {
      try {
        await deleteUser(patientId);
        setPatients(patients.filter((patient) => patient.id !== patientId));
        alert("تم حذف المريض بنجاح");
      } catch (err) {
        console.error("Failed to delete patient:", err);
        alert("فشل في حذف المريض");
      }
    }
  };

  if (loading) {
    return (
      <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-center py-10">جاري تحميل بيانات المرضى...</div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-red-500 text-center py-10">
          حدث خطأ أثناء جلب البيانات: {error}
        </div>
      </article>
    );
  }

  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">إدارة المرضى</h2>

      {/* card for personal heading */}
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
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>

        <h3 className="font-medium text-xl my-2.5">سجل المرضى</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          معلومات كاملة عن المرضى المسجلين في المستشفى
        </span>
      </div>

      {/* table of Patients */}
      <div className="w-full overflow-x-auto my-10">
        {patients.length > 0 ? (
          <table className="w-full border-collapse border border-gray-600 text-white text-right">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-600">الاسم الكامل</th>
                <th className="p-3 border border-gray-600">اسم المستخدم</th>
                <th className="p-3 border border-gray-600">
                  البريد الإلكتروني
                </th>
                <th className="p-3 border border-gray-600">العمر</th>
                <th className="p-3 border border-gray-600">النوع</th>
                <th className="p-3 border border-gray-600">فصيلة الدم</th>
                <th className="p-3 border border-gray-600">رقم الهاتف</th>
                <th className="p-3 border border-gray-600">السجل الطبي</th>
                <th className="p-3 border border-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border border-gray-600 hover:bg-gray-700"
                >
                  <td className="p-3 border border-gray-600">
                    {patient.fullname}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {patient.userName}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {patient.email}
                  </td>
                  <td className="p-3 border border-gray-600">{patient.age}</td>
                  <td className="p-3 border border-gray-600">
                    {patient.gender === "male" ? "ذكر" : "أنثى"}
                  </td>
                  <td className="p-3 border border-gray-600 uppercase">
                    {patient.bloodType || "غير محدد"}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {patient.phoneNumber}
                  </td>
                  <td className="p-3 border border-gray-600 max-w-xs truncate">
                    {patient.medicalHistory || "لا يوجد"}
                  </td>
                  <td className="p-3 border border-gray-600">
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">لا يوجد مرضى مسجلين حالياً</div>
        )}
      </div>
    </article>
  );
};

export default PatientManagement;
