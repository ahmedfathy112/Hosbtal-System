"use client";
import React, { useState, useEffect } from "react";
import { FiCalendar, FiUser, FiClock, FiSearch } from "react-icons/fi";
import dayjs from "dayjs";
import { fetchAppointments, fetchUserById } from "@/app/ApiRequsets";

const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});

  // جلب doctorId من التوكن
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setDoctorId(payload.userId);
      } catch (err) {
        setError("خطأ في تحليل التوكن");
      }
    }
  }, []);

  // جلب الحجوزات الخاصة بالطبيب فقط
  useEffect(() => {
    if (!doctorId) return;

    const loadAppointments = async () => {
      try {
        const allAppointments = await fetchAppointments();
        // تصفية الحجوزات الخاصة بهذا الطبيب فقط
        const doctorAppointments = allAppointments.filter(
          (app) => app.doctorId === doctorId
        );
        setAppointments(doctorAppointments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadAppointments();
  }, [doctorId]);

  // جلب تفاصيل المرضى
  const loadPatientDetails = async (patientId) => {
    if (!patientDetails[patientId]) {
      try {
        const patient = await fetchUserById(patientId);
        setPatientDetails((prev) => ({
          ...prev,
          [patientId]: patient,
        }));
      } catch (err) {
        console.error("Failed to fetch patient details:", err);
      }
    }
  };

  // فلترة المواعيد حسب البحث
  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = patientDetails[appointment.patientId]?.fullname || "";
    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading)
    return <div className="p-8 text-center">جاري تحميل البيانات...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">سجل حجوزاتي</h2>

      {/* بطاقة العنوان */}
      <div className="w-full flex flex-col justify-start rounded-2xl bg-[#284cff1d] py-7 px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FiUser className="size-6 mr-2 text-blue-600" />
            <h3 className="font-medium text-xl">حجوزاتي</h3>
          </div>

          {/* حقل البحث */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="ابحث باسم المريض أو السبب..."
              className="w-full bg-white dark:bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <span className="font-medium text-sm text-gray-400">
          هنا ستجد جميع الحجوزات الخاصة بك فقط
        </span>
      </div>

      {/* جدول الحجوزات */}
      <div className="w-full overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-300 text-right">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                التاريخ
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                الوقت
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                السبب
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                اسم المريض
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                النوع
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                التفاصيل
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => {
                const patient = patientDetails[appointment.patientId] || {};
                return (
                  <React.Fragment key={appointment.appointmentId}>
                    <tr className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        <div className="flex items-center justify-end gap-2">
                          <FiCalendar className="text-gray-400" />
                          {dayjs(appointment.appointmentDate).format(
                            "DD/MM/YYYY"
                          )}
                        </div>
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        <div className="flex items-center justify-end gap-2">
                          <FiClock className="text-gray-400" />
                          {dayjs(appointment.appointmentDate).format("HH:mm")}
                        </div>
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        {appointment.reason}
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        {patient.fullname || "جاري التحميل..."}
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            patient.gender === "female"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {patient.gender === "female" ? "أنثى" : "ذكر"}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        <button
                          onClick={() =>
                            loadPatientDetails(appointment.patientId)
                          }
                          className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        >
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>

                    {patient.fullname && (
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td colSpan="6" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
                            <div>
                              <h4 className="font-medium border-b pb-2 mb-2">
                                معلومات المريض
                              </h4>
                              <p>
                                <span className="font-medium">العمر:</span>{" "}
                                {patient.age || "غير محدد"}
                              </p>
                              <p>
                                <span className="font-medium">الهاتف:</span>{" "}
                                {patient.phoneNumber || "غير محدد"}
                              </p>
                              <p>
                                <span className="font-medium">البريد:</span>{" "}
                                {patient.email || "غير محدد"}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium border-b pb-2 mb-2">
                                معلومات الحجز
                              </h4>
                              <p>
                                <span className="font-medium">
                                  رقم الاستشارة:
                                </span>{" "}
                                {appointment.consultation_num}
                              </p>
                              <p>
                                <span className="font-medium">حالة الحجز:</span>
                                <span
                                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                    appointment.status
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  }`}
                                >
                                  {appointment.status ? "نشط" : "ملغي"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  {searchTerm
                    ? "لا توجد نتائج مطابقة للبحث"
                    : "لا توجد حجوزات متاحة"}
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
