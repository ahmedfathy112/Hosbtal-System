"use client";
import React, { useState, useEffect } from "react";
import { FiCalendar, FiUser, FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import { fetchAppointments, fetchUserById } from "@/app/ApiRequsets";

const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [patientDetails, setPatientDetails] = useState({});

  // جلب جميع الحجوزات
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // جلب تفاصيل الطبيب والمريض
  const handleExpandRow = async (appointment) => {
    if (expandedRow === appointment.appointmentId) {
      setExpandedRow(null);
      return;
    }

    setExpandedRow(appointment.appointmentId);

    try {
      if (
        !doctorDetails[appointment.doctorId] ||
        !patientDetails[appointment.patientId]
      ) {
        const [doctor, patient] = await Promise.all([
          fetchUserById(appointment.doctorId),
          fetchUserById(appointment.patientId),
        ]);

        setDoctorDetails((prev) => ({
          ...prev,
          [appointment.doctorId]: doctor,
        }));

        setPatientDetails((prev) => ({
          ...prev,
          [appointment.patientId]: patient,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  if (loading)
    return <div className="p-8 text-center">جاري تحميل البيانات...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <article className="w-5/6 flex flex-col px-8 py-5 max-md:px-3.5 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* عنوان الصفحة */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="font-semibold text-2xl text-gray-800 dark:text-white mb-1">
            سجل الحجوزات
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            عرض جميع مواعيد المرضى
          </p>
        </div>

        {/* بطاقة العنوان */}
        <div className="w-full flex flex-col rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 py-6 px-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow">
              <FiCalendar className="text-blue-600 dark:text-blue-400 text-lg" />
            </div>
            <h3 className="font-medium text-xl text-gray-800 dark:text-white">
              عرض المواعيد
            </h3>
          </div>
          <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
            هنا يمكنك مشاهدة جميع الحجوزات المسجلة في النظام
          </span>
        </div>
      </div>

      {/* جدول المواعيد */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  التاريخ
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  الوقت
                </th>
                <th className="p-4 text-right font-medium text-gray-700 dark:text-gray-300">
                  رقم الاستشارة
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
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <React.Fragment key={appointment.appointmentId}>
                    <tr
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => handleExpandRow(appointment)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-gray-400" />
                          {dayjs(appointment.appointmentDate).format(
                            "DD/MM/YYYY"
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiClock className="text-gray-400" />
                          {dayjs(appointment.appointmentDate).format("HH:mm")}
                        </div>
                      </td>
                      <td className="p-4">{appointment.consultation_num}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-blue-500" />
                          {doctorDetails[appointment.doctorId]?.fullname ||
                            "جاري التحميل..."}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-green-500" />
                          {patientDetails[appointment.patientId]?.fullname ||
                            "جاري التحميل..."}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            appointment.status
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-yellow-800 dark:bg-yellow-900 dark:text-red-200"
                          }`}
                        >
                          {appointment.status ? "نشط" : "معلق"}
                        </span>
                      </td>
                    </tr>

                    {expandedRow === appointment.appointmentId && (
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <td colSpan="6" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600">
                            <div>
                              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 border-b pb-2">
                                معلومات المريض
                              </h4>
                              <div className="space-y-2">
                                <p>
                                  <span className="font-medium">الاسم:</span>{" "}
                                  {patientDetails[appointment.patientId]
                                    ?.fullname || "غير متوفر"}
                                </p>
                                <p>
                                  <span className="font-medium">البريد:</span>{" "}
                                  {patientDetails[appointment.patientId]
                                    ?.email || "غير متوفر"}
                                </p>
                                <p>
                                  <span className="font-medium">الهاتف:</span>{" "}
                                  {patientDetails[appointment.patientId]
                                    ?.phoneNumber || "غير متوفر"}
                                </p>
                                {patientDetails[appointment.patientId]?.age && (
                                  <p>
                                    <span className="font-medium">العمر:</span>{" "}
                                    {patientDetails[appointment.patientId].age}
                                  </p>
                                )}
                                {patientDetails[appointment.patientId]
                                  ?.gender && (
                                  <p>
                                    <span className="font-medium">النوع:</span>{" "}
                                    {patientDetails[appointment.patientId]
                                      .gender === "female"
                                      ? "أنثى"
                                      : "ذكر"}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 border-b pb-2">
                                معلومات الطبيب
                              </h4>
                              <div className="space-y-2">
                                <p>
                                  <span className="font-medium">الاسم:</span>{" "}
                                  {doctorDetails[appointment.doctorId]
                                    ?.fullname || "غير متوفر"}
                                </p>
                                <p>
                                  <span className="font-medium">التخصص:</span>{" "}
                                  {doctorDetails[appointment.doctorId]
                                    ?.specialty || "غير محدد"}
                                </p>
                                <p>
                                  <span className="font-medium">البريد:</span>{" "}
                                  {doctorDetails[appointment.doctorId]?.email ||
                                    "غير متوفر"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    لا توجد مواعيد متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
};

export default Booking;
