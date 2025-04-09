"use client";

import { useState } from "react";
import Swal from "sweetalert2";

// Fack Data
const initialAppointments = [
  {
    id: "1",
    patientName: "محمد أحمد",
    clinicName: "عيادة 1",
    doctorName: "د.أحمد",
    date: "2025-04-10",
    status: "غير مؤكد",
  },
  {
    id: "2",
    patientName: "سارة خالد",
    clinicName: "عيادة 2",
    doctorName: "د.مازن",
    date: "2025-04-11",
    status: "غير مؤكد",
  },
  {
    id: "3",
    patientName: "علي حسن",
    clinicName: "عيادة 1",
    doctorName: "د.إبراهيم",
    date: "2025-04-12",
    status: "مؤكد",
  },
];

export default function Reception() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");

  // Filter Method
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.id.includes(searchQuery) ||
      appointment.patientName.includes(searchQuery);
    const matchesClinic =
      selectedClinic === "" || appointment.clinicName === selectedClinic;
    return matchesSearch && matchesClinic;
  });

  // Confirm Method
  const confirmAppointment = (id) => {
    Swal.fire({
      title: "تأكيد الكشف",
      text: "هل أنت متأكد من تأكيد هذا الكشف؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "نعم، تأكيد",
      cancelButtonText: "إلغاء",
      customClass: {
        popup: "bg-gray-800 text-gray-200",
        confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg mr-2",
        cancelButton: "bg-gray-600 text-white px-4 py-2 rounded-lg",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: "مؤكد" }
              : appointment
          )
        );
        Swal.fire({
          title: "تم التأكيد",
          text: "تم تأكيد الكشف بنجاح!",
          icon: "success",
          customClass: {
            popup: "bg-gray-800 text-gray-200",
            confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  // CANCLE The Confirm
  const cancelConfirmation = (id) => {
    Swal.fire({
      title: "إلغاء التأكيد",
      text: "هل أنت متأكد من إلغاء تأكيد هذا الكشف؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، إلغاء",
      cancelButtonText: "تراجع",
      customClass: {
        popup: "bg-gray-800 text-gray-200",
        confirmButton: "bg-red-600 text-white px-4 py-2 rounded-lg mr-2",
        cancelButton: "bg-gray-600 text-white px-4 py-2 rounded-lg",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: "غير مؤكد" }
              : appointment
          )
        );
        Swal.fire({
          title: "تم الإلغاء",
          text: "تم إلغاء تأكيد الكشف بنجاح!",
          icon: "info",
          customClass: {
            popup: "bg-gray-800 text-gray-200",
            confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
        إدارة الكشوفات - الاستقبال
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Section */}
        <input
          type="text"
          placeholder="ابحث باستخدام المعرف أو اسم المريض"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
        />

        {/* Filter Section */}
        <select
          value={selectedClinic}
          onChange={(e) => setSelectedClinic(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
        >
          <option value="">جميع العيادات</option>
          <option value="عيادة 1">عيادة 1</option>
          <option value="عيادة 2">عيادة 2</option>
          <option value="عيادة 3">عيادة 3</option>
        </select>
      </div>

      {/* Appointments Details */}
      <div className="overflow-x-auto invotryPage">
        <table className="w-full text-right border-collapse bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-4">معرف الكشف</th>
              <th className="p-4">اسم المريض</th>
              <th className="p-4">العيادة</th>
              <th className="p-4">الطبيب</th>
              <th className="p-4">تاريخ الموعد</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-4">{appointment.id}</td>
                  <td className="p-4">{appointment.patientName}</td>
                  <td className="p-4">{appointment.clinicName}</td>
                  <td className="p-4">{appointment.doctorName}</td>
                  <td className="p-4">{appointment.date}</td>
                  <td className="p-4">
                    <span
                      className={
                        appointment.status === "مؤكد"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {appointment.status === "غير مؤكد" ? (
                      <button
                        onClick={() => confirmAppointment(appointment.id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                      >
                        تأكيد
                      </button>
                    ) : (
                      <button
                        onClick={() => cancelConfirmation(appointment.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                      >
                        إلغاء التأكيد
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  لا توجد كشوفات مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
