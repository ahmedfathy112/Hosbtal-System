"use client";
import React, { useEffect, useState } from "react";
import { fetchDoctors, deleteUser, addSalary } from "@/app/ApiRequsets";

const DoctorsMang = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salaryData, setSalaryData] = useState({
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "cash",
    status: "done",
    appUserId: "",
  });
  const [showSalaryModal, setShowSalaryModal] = useState(false);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // دالة لتحويل Base64 إلى رابط صورة
  const convertBase64ToImage = (base64String) => {
    if (!base64String) return null;
    if (base64String.startsWith("http")) return base64String;

    try {
      return `data:image/jpeg;base64,${base64String}`;
    } catch (e) {
      console.error("Failed to convert base64:", e);
      return null;
    }
  };

  // دالة حذف الطبيب
  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطبيب؟")) {
      try {
        await deleteUser(doctorId);
        setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
        alert("تم حذف الطبيب بنجاح");
      } catch (err) {
        console.error("Failed to delete doctor:", err);
        alert("فشل في حذف الطبيب");
      }
    }
  };

  // دالة فتح نموذج إضافة الراتب
  const openSalaryModal = (doctorId) => {
    setSalaryData({
      ...salaryData,
      appUserId: doctorId,
      paymentDate: new Date().toISOString().split("T")[0],
    });
    setShowSalaryModal(true);
  };

  // دالة إضافة الراتب
  const handleAddSalary = async () => {
    if (!salaryData.amount || !salaryData.appUserId) {
      alert("الرجاء إدخال جميع البيانات المطلوبة");
      return;
    }

    try {
      await addSalary(salaryData);
      alert("تم إضافة الراتب بنجاح");
      setShowSalaryModal(false);
      setSalaryData({
        amount: "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "cash",
        status: "done",
        appUserId: "",
      });
    } catch (err) {
      console.error("Failed to add salary:", err);
      alert("فشل في إضافة الراتب");
    }
  };

  if (loading) {
    return (
      <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-center py-10">جاري تحميل بيانات الأطباء...</div>
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
      <h2 className="font-semibold text-2xl text-left mb-4">إدارة الأطباء</h2>

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

        <h3 className="font-medium text-xl my-2.5">سجل الأطباء</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          معلومات كاملة عن الأطباء العاملين في المستشفى
        </span>
      </div>

      <div className="w-full overflow-x-auto my-10">
        {doctors.length > 0 ? (
          <table className="w-full border-collapse border border-gray-600 text-white text-right">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-600">الصورة</th>
                <th className="p-3 border border-gray-600">الاسم الكامل</th>
                <th className="p-3 border border-gray-600">التخصص</th>
                <th className="p-3 border border-gray-600">
                  البريد الإلكتروني
                </th>
                <th className="p-3 border border-gray-600">رسوم الاستشارة</th>
                <th className="p-3 border border-gray-600">مواعيد العيادة</th>
                <th className="p-3 border border-gray-600">رقم الهاتف</th>
                <th className="p-3 border border-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => {
                const imageUrl = convertBase64ToImage(doctor.doctorImage);
                return (
                  <tr
                    key={doctor.id}
                    className="border border-gray-600 hover:bg-gray-700"
                  >
                    <td className="p-3 border border-gray-600">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={doctor.fullname}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = "/default-doctor.png";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
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
                        </div>
                      )}
                    </td>
                    <td className="p-3 border border-gray-600">
                      {doctor.fullname}
                    </td>
                    <td className="p-3 border border-gray-600">
                      {doctor.specialty || "غير محدد"}
                    </td>
                    <td className="p-3 border border-gray-600">
                      {doctor.email}
                    </td>
                    <td className="p-3 border border-gray-600">
                      {doctor.consultationFee || "غير محدد"}
                    </td>
                    <td className="p-3 border border-gray-600">
                      {doctor.clinicSchedule || "غير محدد"}
                    </td>
                    <td className="p-3 border border-gray-600">
                      {doctor.phoneNumber}
                    </td>
                    <td className="p-3 border border-gray-600 flex gap-2 justify-center">
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => openSalaryModal(doctor.id)}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                      >
                        إضافة راتب
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">لا يوجد أطباء مسجلين حالياً</div>
        )}
      </div>

      {showSalaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">إضافة راتب للطبيب</h3>

            <div className="mb-4">
              <label className="block mb-2">المبلغ:</label>
              <input
                type="number"
                value={salaryData.amount}
                onChange={(e) =>
                  setSalaryData({ ...salaryData, amount: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded"
                placeholder="أدخل المبلغ"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">تاريخ الدفع:</label>
              <input
                type="date"
                value={salaryData.paymentDate}
                onChange={(e) =>
                  setSalaryData({ ...salaryData, paymentDate: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">طريقة الدفع:</label>
              <select
                value={salaryData.paymentMethod}
                onChange={(e) =>
                  setSalaryData({
                    ...salaryData,
                    paymentMethod: e.target.value,
                  })
                }
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="cash">نقدي</option>
                <option value="visa">فيزا</option>
                <option value="bank">تحويل بنكي</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSalaryModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddSalary}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default DoctorsMang;
