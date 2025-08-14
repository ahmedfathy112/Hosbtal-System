"use client";
import React, { useState, useEffect } from "react";
import { FiCalendar, FiUser, FiClock, FiSearch } from "react-icons/fi";
import dayjs from "dayjs";
import { fetchAppointments, fetchUserById } from "@/app/ApiRequsets";

const PatientBookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);

  /*
  -- هنا انا كنت عايز اجيب الحجوزات الخاصه بمريض معين 
  i get the userId from the token 
  then i used it to compain between the patientId in the all appointments 
  after all of the i display the appointment of this paitint using his Id 
  */

  //  patientId من التوكن
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setPatientId(payload.userId);
      } catch (err) {
        setError("خطأ في تحليل التوكن");
      }
    }
  }, []);

  // جلب الحجوزات الخاصة بالمريض فقط
  useEffect(() => {
    if (!patientId) return;

    const loadAppointments = async () => {
      try {
        const allAppointments = await fetchAppointments();
        // تصفية الحجوزات الخاصة بهذا المريض فقط
        const patientAppointments = allAppointments.filter(
          (app) => app.patientId === patientId
        );
        setAppointments(patientAppointments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadAppointments();
  }, [patientId]);

  // جلب تفاصيل الأطباء
  const loadDoctorDetails = async (doctorId) => {
    if (!doctorDetails[doctorId]) {
      try {
        const doctor = await fetchUserById(doctorId);
        setDoctorDetails((prev) => ({
          ...prev,
          [doctorId]: doctor,
        }));
      } catch (err) {
        console.error("Failed to fetch doctor details:", err);
      }
    }
  };

  // فلترة المواعيد حسب البحث
  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = doctorDetails[appointment.doctorId]?.fullname || "";
    return (
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading)
    return <div className="p-8 text-center">جاري تحميل البيانات...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">حجوزاتي</h2>

      {/* بطاقة العنوان */}
      <div className="w-full flex flex-col justify-start rounded-2xl bg-[#284cff1d] py-7 px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FiUser className="size-6 mr-2 text-blue-600" />
            <h3 className="font-medium text-xl">حجوزاتي الطبية</h3>
          </div>

          {/* حقل البحث */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="ابحث باسم الطبيب أو السبب..."
              className="w-full bg-white dark:bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <span className="font-medium text-sm text-gray-400">
          هنا ستجد جميع الحجوزات الطبية الخاصة بك
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
                الطبيب
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                الحالة
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                التفاصيل
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => {
                const doctor = doctorDetails[appointment.doctorId] || {};
                return (
                  <React.Fragment key={appointment.appointmentId}>
                    <tr
                      className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        loadDoctorDetails(appointment.doctorId);
                        setExpandedRow(
                          expandedRow === appointment.appointmentId
                            ? null
                            : appointment.appointmentId
                        );
                      }}
                    >
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
                        {doctor.fullname || "جاري التحميل..."}
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-yellow-800 dark:bg-yellow-900 dark:text-red-200"
                          }`}
                        >
                          {appointment.status ? "نشط" : "معلق"}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600">
                        {expandedRow === appointment.appointmentId
                          ? "إخفاء"
                          : "عرض"}
                      </td>
                    </tr>

                    {expandedRow === appointment.appointmentId &&
                      doctor.fullname && (
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td colSpan="6" className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
                              <div>
                                <h4 className="font-medium border-b pb-2 mb-2">
                                  معلومات الطبيب
                                </h4>
                                <p>
                                  <span className="font-medium">التخصص:</span>{" "}
                                  {doctor.specialty || "غير محدد"}
                                </p>
                                <p>
                                  <span className="font-medium">العيادة:</span>{" "}
                                  {appointment.clinicId}
                                </p>
                                <p>
                                  <span className="font-medium">البريد:</span>{" "}
                                  {doctor.email || "غير محدد"}
                                </p>
                                <p>
                                  <span className="font-medium">الهاتف:</span>{" "}
                                  {doctor.phoneNumber || "غير محدد"}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium border-b pb-2 mb-2">
                                  تفاصيل الحجز
                                </h4>
                                <p>
                                  <span className="font-medium">
                                    رقم الاستشارة:
                                  </span>{" "}
                                  {appointment.consultation_num}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    تاريخ الحجز:
                                  </span>{" "}
                                  {dayjs(appointment.appointmentDate).format(
                                    "DD/MM/YYYY HH:mm"
                                  )}
                                </p>
                                <p>
                                  <span className="font-medium">السبب:</span>{" "}
                                  {appointment.reason}
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

export default PatientBookings;
