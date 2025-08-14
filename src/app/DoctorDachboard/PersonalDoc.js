"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserId } from "../AuthService";

const Personal = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = useUserId();

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `https://hospital111.runasp.net/api/Appuser/${userId}`
        );
        setDoctorInfo(response.data);
        setError("");
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [userId]);

  if (loading) {
    return (
      <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-center py-10">جاري تحميل بيانات الطبيب...</div>
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

  if (!doctorInfo) {
    return (
      <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-center py-10">لا توجد بيانات متاحة للطبيب</div>
      </article>
    );
  }

  return (
    <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
      <h2 className="font-semibold text-2xl text-left mb-4">معلومات الطبيب</h2>

      {/* card for personal heading */}
      <div className="w-full flex flex-col justify-start rounded-2xl bg-[#284cff1d] py-7 px-5">
        {doctorInfo.doctorImage && (
          <img
            src={`data:image/jpeg;base64,${doctorInfo.doctorImage}`}
            alt="صورة الطبيب"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        )}

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

        <h3 className="font-medium text-xl my-2.5">المعلومات الشخصيه</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          معلومات الطبيب الأساسية
        </span>
      </div>

      {/* section of personal heading */}
      <section className="w-full flex flex-row flex-wrap justify-between rounded-2xl bg-[#284cff1d] py-7 px-5 my-8">
        {/* the Name */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">الأسم</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {doctorInfo.fullname || "غير متوفر"}
            </span>
          </div>
        </div>

        {/* the department */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">التخصص</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {doctorInfo.specialty || "غير متوفر"}
            </span>
          </div>
        </div>

        {/* the Phone */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">رقم الهاتف</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {doctorInfo.phoneNumber || "غير متوفر"}
            </span>
          </div>
        </div>

        {/* the Email */}
        <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 my-auto mr-3 max-md:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>

          <div className="flex flex-col">
            <h4 className="font-medium text-lg my-2">البريد الإلكتروني</h4>
            <span className="font-medium text-sm mt-1 text-gray-400">
              {doctorInfo.email || "غير متوفر"}
            </span>
          </div>
        </div>

        {/* Additional Doctor Info */}
        {doctorInfo.consultationFee && (
          <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 my-auto mr-3 max-md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="flex flex-col">
              <h4 className="font-medium text-lg my-2">رسوم الاستشارة</h4>
              <span className="font-medium text-sm mt-1 text-gray-400">
                {doctorInfo.consultationFee}
              </span>
            </div>
          </div>
        )}

        {doctorInfo.clinicSchedule && (
          <div className="w-1/2 flex flex-row text-left mt-4 max-md:w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 my-auto mr-3 max-md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>

            <div className="flex flex-col">
              <h4 className="font-medium text-lg my-2">مواعيد العيادة</h4>
              <span className="font-medium text-sm mt-1 text-gray-400">
                {doctorInfo.clinicSchedule}
              </span>
            </div>
          </div>
        )}
      </section>
    </article>
  );
};

export default Personal;
