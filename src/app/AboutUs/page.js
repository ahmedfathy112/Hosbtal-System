"use client";
import React, { useEffect, useState } from "react";
import "./about.css";
import Link from "next/link";
import { fetchDoctors, fetchClinicById } from "../ApiRequsets";

const stats = [
  { label: "عدد المرضى", value: "+20,000" },
  { label: "عدد الأطباء", value: "+60" },
  { label: "سنوات الخبرة", value: "+10" },
  { label: "الأقسام الطبية", value: "12" },
];

const AboutUs = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDoctorsWithClinics = async () => {
      try {
        setLoading(true);
        const doctorsData = await fetchDoctors();

        // تحميل معلومات العيادة لكل طبيب
        const doctorsWithClinics = await Promise.all(
          doctorsData.map(async (doctor) => {
            try {
              const clinicData = await fetchClinicById(doctor.clinicId);
              return {
                ...doctor,
                clinicName: clinicData.clinicName || "غير محدد",
              };
            } catch (err) {
              console.error(
                `Failed to fetch clinic for doctor ${doctor.fullname}:`,
                err
              );
              return {
                ...doctor,
                clinicName: "غير محدد",
              };
            }
          })
        );

        setDoctors(doctorsWithClinics);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorsWithClinics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-red-500">حدث خطأ أثناء جلب البيانات: {error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          مستشفى أهل الخير التخصصي
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          نحن هنا نعمل لراحتك ولتقديم أفضل خدمة لك ورعايتك على مدار الساعة
        </p>
        <Link
          href={"/BookingPage"}
          className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
        >
          أحجز كشفك
        </Link>
        <div className="custom-shape-divider-bottom-1752067932 absolute left-0 right-0 bottom-0 w-full pointer-events-none">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
            رسالتنا
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            تقديم رعاية صحية متكاملة وآمنة بأعلى معايير الجودة والرحمة لكل مريض.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
            رؤيتنا
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            أن نكون رواد الرعاية الصحية في المنطقة ونحقق التميز في كل ما نقدمه.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
            قيمنا
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            الرحمة، الجودة، النزاهة، العمل الجماعي، والابتكار في تقديم الخدمة.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-100 dark:border-gray-700"
          >
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stat.value}
            </span>
            <span className="text-gray-700 dark:text-gray-200 text-lg">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">
          طاقم الأطباء
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {doctors.map((doctor, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-64 flex flex-col items-center border border-gray-100 dark:border-gray-700"
            >
              {doctor.doctorImage ? (
                <img
                  src={`data:image/jpeg;base64,${doctor.doctorImage}`}
                  alt={doctor.fullname}
                  className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-blue-500 dark:border-blue-400"
                />
              ) : (
                <div className="w-24 h-24 rounded-full mb-4 bg-gray-200 flex items-center justify-center border-4 border-blue-500 dark:border-blue-400">
                  <span className="text-gray-500">لا يوجد صورة</span>
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                {doctor.fullname}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">
                {doctor.specialty}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                العيادة: {doctor.clinicName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                رسوم الكشف: {doctor.consultationFee} ج.م
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                مواعيد العمل: {doctor.clinicSchedule}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          جاهزون لخدمتك دائمًا
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          احجز موعدك الآن أو تواصل معنا لأي استفسار
        </p>
        <Link
          href={"/BookingPage"}
          className="py-3 px-8 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-all duration-200"
        >
          أحجز الآن
        </Link>
      </section>
    </main>
  );
};

export default AboutUs;
