"use client";
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiCalendar,
  FiUser,
  FiClock,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiPrinter,
  FiDownload,
} from "react-icons/fi";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const Booking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // بيانات المواعيد
  const appointments = [
    {
      id: 1,
      date: "15 يناير 2023",
      time: "10:30 صباحًا",
      department: "قسم الأمراض الباطنية",
      doctor: "د. سارة أحمد",
      patient: "احمد محمد عوضين",
      status: "مكتمل",
      patientAge: 35,
      patientPhone: "0512345678",
      notes: "حضور قبل الموعد بـ 15 دقيقة",
      diagnosis: "التهاب معوي",
    },
  ];

  // فلترة المواعيد
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      filter === "all"
        ? appointment.patient
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.department
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : appointment[filter].toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter
      ? dayjs(appointment.date, "DD MMMM YYYY").isSame(dateFilter, "day")
      : true;

    return matchesSearch && matchesDate;
  });

  // تحديد لون الحالة
  const getStatusColor = (status) => {
    const colors = {
      مكتمل:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "قيد الانتظار":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      ملغى: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    );
  };

  // طباعة البيانات
  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 500);
  };

  return (
    <article
      className={`w-5/6 flex flex-col px-8 py-5 max-md:px-3.5 bg-gray-50 dark:bg-gray-900 min-h-screen ${
        isPrintMode ? "print-layout" : ""
      }`}
    >
      {/* شريط التحكم */}
      <div className="mb-8 print:hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="font-semibold text-2xl text-gray-800 dark:text-white mb-1">
              سجل الحجوزات
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة جميع مواعيد المرضى
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            >
              <FiPrinter /> طباعة
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm">
              <FiDownload /> تصدير
            </button>
          </div>
        </div>

        {/* بطاقة العنوان */}
        <div className="w-full flex flex-col rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 py-6 px-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow">
              <FiCalendar className="text-blue-600 dark:text-blue-400 text-lg" />
            </div>
            <h3 className="font-medium text-xl text-gray-800 dark:text-white">
              إدارة المواعيد
            </h3>
          </div>
          <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
            هنا يمكنك متابعة وإدارة جميع الحجوزات اليومية والتاريخية
          </span>
        </div>
      </div>

      {/* أدوات البحث والتصفية */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث هنا..."
              className="w-full bg-gray-50 dark:bg-gray-700 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              <FiFilter className="inline ml-1" /> تصفية حسب:
            </span>
            <select
              className="bg-gray-50 dark:bg-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-600"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">الكل</option>
              <option value="patient">المريض</option>
              <option value="doctor">الطبيب</option>
              <option value="department">القسم</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              <FiCalendar className="inline ml-1" /> تاريخ محدد:
            </span>
            <DatePicker
              className="w-full bg-gray-50 dark:bg-gray-700 rounded-lg py-2 px-3 text-sm border border-gray-200 dark:border-gray-600"
              onChange={setDateFilter}
              allowClear
              format="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      {/* جدول المواعيد */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  التفاصيل
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  التاريخ
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  الوقت
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  القسم
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  الطبيب
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  المريض
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <React.Fragment key={appointment.id}>
                    <tr
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === appointment.id ? null : appointment.id
                        )
                      }
                    >
                      <td className="p-4 text-center">
                        {expandedRow === appointment.id ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-gray-400" />
                          {appointment.date}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiClock className="text-gray-400" />
                          {appointment.time}
                        </div>
                      </td>
                      <td className="p-4">{appointment.department}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-blue-500" />
                          {appointment.doctor}
                        </div>
                      </td>
                      <td className="p-4 font-medium">{appointment.patient}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>

                    {expandedRow === appointment.id && (
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <td colSpan="7" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600">
                            <div>
                              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                                معلومات المريض
                              </h4>
                              <p>العمر: {appointment.patientAge}</p>
                              <p>الهاتف: {appointment.patientPhone}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                                التشخيص
                              </h4>
                              <p>{appointment.diagnosis}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                                الوصفة الطبية
                              </h4>
                              <p>{appointment.prescription}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    لا توجد مواعيد متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 print:hidden">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            إجمالي الحجوزات
          </h4>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {appointments.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            المكتملة
          </h4>
          <p className="text-2xl font-bold text-green-600">
            {appointments.filter((a) => a.status === "مكتمل").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            قيد الانتظار
          </h4>
          <p className="text-2xl font-bold text-yellow-600">
            {appointments.filter((a) => a.status === "قيد الانتظار").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            الملغاة
          </h4>
          <p className="text-2xl font-bold text-red-600">
            {appointments.filter((a) => a.status === "ملغى").length}
          </p>
        </div>
      </div>

      {/* ستايل خاص للطباعة */}
      <style jsx>{`
        @media print {
          .print-layout {
            padding: 0;
            background: white;
          }
          .print-layout * {
            color: black !important;
            background: white !important;
          }
          .print-layout table {
            width: 100%;
            border-collapse: collapse;
          }
          .print-layout th,
          .print-layout td {
            border: 1px solid #ddd;
            padding: 8px;
          }
        }
      `}</style>
    </article>
  );
};

export default Booking;
