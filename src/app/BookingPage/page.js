"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import {
  fetchAllClinics,
  fetchDoctors,
  createAppointment,
  getAvailableDaysForClinic,
} from "@/app/ApiRequsets";

export default function AppointmentDate() {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [loading, setLoading] = useState({
    clinics: true,
    doctors: true,
    days: false,
  });
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    clinicId: "",
    doctorId: "",
    appointmentDate: "",
    reason: "",
    status: false,
  });

  // جلب العيادات عند تحميل المكون
  useEffect(() => {
    const loadClinics = async () => {
      try {
        const clinicsData = await fetchAllClinics();
        setClinics(clinicsData);
      } catch (err) {
        setError("حدث خطأ أثناء جلب قائمة العيادات");
      } finally {
        setLoading((prev) => ({ ...prev, clinics: false }));
      }
    };

    loadClinics();
  }, []);

  // جلب الأطباء عند تحميل المكون
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorsData = await fetchDoctors();
        setDoctors(doctorsData);
      } catch (err) {
        setError("حدث خطأ أثناء جلب قائمة الأطباء");
      } finally {
        setLoading((prev) => ({ ...prev, doctors: false }));
      }
    };

    loadDoctors();
  }, []);

  // عند تغيير العيادة، جلب الأيام المتاحة وتصفية الأطباء
  useEffect(() => {
    if (formData.clinicId) {
      // تصفية الأطباء حسب العيادة المختارة
      if (doctors.length > 0) {
        const filtered = doctors.filter(
          (doctor) => doctor.clinicId === parseInt(formData.clinicId)
        );
        setFilteredDoctors(filtered);
      }

      // جلب الأيام المتاحة للعيادة المختارة
      const loadAvailableDays = async () => {
        try {
          setLoading((prev) => ({ ...prev, days: true }));
          const days = await getAvailableDaysForClinic(formData.clinicId);
          setAvailableDays(days);
        } catch (err) {
          setError("حدث خطأ أثناء جلب الأيام المتاحة");
        } finally {
          setLoading((prev) => ({ ...prev, days: false }));
        }
      };

      loadAvailableDays();
    } else {
      setAvailableDays([]);
      setFilteredDoctors([]);
    }
  }, [formData.clinicId, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // التحقق من الحقول المطلوبة
      if (
        !formData.clinicId ||
        !formData.doctorId ||
        !formData.appointmentDate
      ) {
        throw new Error("الرجاء اختيار العيادة والطبيب وتاريخ الموعد");
      }

      // التحقق من أن التاريخ المختار في يوم متاح
      const selectedDate = new Date(formData.appointmentDate);
      const selectedDay = selectedDate.getDay(); // 0 لأحد، 1 لاثنين، إلخ

      const isDayAvailable = availableDays.some(
        (day) => day.dayOfWeek === selectedDay
      );

      if (!isDayAvailable) {
        throw new Error("الرجاء اختيار موعد في يوم متاح للعيادة");
      }

      // الحصول على patientId من التوكن
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("الرجاء تسجيل الدخول أولاً");
      }
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId;

      // إنشاء رقم استشارة عشوائي
      const consultation_num = Math.floor(Math.random() * 100) + 1;

      // تحضير بيانات الموعد
      const appointmentData = {
        consultation_num,
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
        reason: formData.reason || "غير معرف",
        status: false,
        doctorId: formData.doctorId,
        clinicId: parseInt(formData.clinicId),
        patientId: userId,
      };

      // استدعاء دالة إنشاء الموعد
      console.log(appointmentData);
      const response = await createAppointment(appointmentData);

      if (response) {
        alert("تم حجز الموعد بنجاح!");
        // إعادة تعيين النموذج
        setFormData({
          clinicId: "",
          doctorId: "",
          appointmentDate: "",
          reason: "",
          status: false,
        });
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء حجز الموعد");
      console.error("Error creating appointment:", err);
    }
  };

  // تحويل رقم اليوم إلى اسم اليوم
  const getDayName = (dayNumber) => {
    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    return days[dayNumber];
  };

  return (
    <div>
      <Head>
        <title>حجز العيادات</title>
        <meta name="description" content="Book your clinic appointment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">
            أحجز كشفك الأن
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Clinic Selection */}
            <div>
              <label
                htmlFor="clinicId"
                className="block text-sm font-medium text-gray-300"
              >
                العيادة
              </label>
              <select
                id="clinicId"
                name="clinicId"
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                value={formData.clinicId}
                onChange={handleChange}
                required
                disabled={loading.clinics}
              >
                <option value="" className="text-gray-400">
                  اختر العيادة
                </option>
                {clinics.map((clinic) => (
                  <option key={clinic.clinicId} value={clinic.clinicId}>
                    {clinic.clinicName}
                  </option>
                ))}
              </select>
              {loading.clinics && (
                <p className="text-xs text-gray-400 mt-1">
                  جاري تحميل العيادات...
                </p>
              )}
            </div>

            {/* عرض الأيام المتاحة */}
            {formData.clinicId && (
              <div className="bg-gray-700 p-3 rounded-md">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  الأيام المتاحة لهذه العيادة:
                </h3>
                {loading.days ? (
                  <p className="text-xs text-gray-400">
                    جاري تحميل الأيام المتاحة...
                  </p>
                ) : availableDays.length > 0 ? (
                  <ul className="text-sm text-gray-200 space-y-1">
                    {availableDays.map((day, index) => (
                      <li key={index}>
                        {getDayName(day.dayOfWeek)}: من {day.startTime} إلى{" "}
                        {day.endTime}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-400">
                    لا توجد أيام متاحة حالياً
                  </p>
                )}
              </div>
            )}

            {/* Doctor Selection */}
            <div>
              <label
                htmlFor="doctorId"
                className="block text-sm font-medium text-gray-300"
              >
                الدكتور
              </label>
              <select
                id="doctorId"
                name="doctorId"
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 disabled:opacity-50"
                value={formData.doctorId}
                onChange={handleChange}
                disabled={!formData.clinicId || loading.doctors}
                required
              >
                <option value="" className="text-gray-400">
                  اختر الدكتور
                </option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {`د.${doctor.fullname} (${doctor.specialty})`}
                  </option>
                ))}
              </select>
              {loading.doctors && (
                <p className="text-xs text-gray-400 mt-1">
                  جاري تحميل الأطباء...
                </p>
              )}
            </div>

            {/* Appointment Date */}
            <div>
              <label
                htmlFor="appointmentDate"
                className="block text-sm font-medium text-gray-300"
              >
                موعد الكشف
              </label>
              <input
                type="datetime-local"
                id="appointmentDate"
                name="appointmentDate"
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
              {formData.clinicId && availableDays.length > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  الرجاء اختيار موعد في الأيام المتاحة المذكورة أعلاه
                </p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-300"
              >
                سبب الزيارة (اختياري)
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={3}
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                value={formData.reason}
                onChange={handleChange}
                placeholder="أدخل سبب الزيارة (اختياري)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
              disabled={loading.clinics || loading.doctors || loading.days}
            >
              أحجز الكشف
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
