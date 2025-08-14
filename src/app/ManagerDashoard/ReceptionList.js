"use client";
import React, { useEffect, useState } from "react";
import { fetchReceptionists, deleteUser, addSalary } from "@/app/ApiRequsets";

const ReceptionManagement = () => {
  const [receptionists, setReceptionists] = useState([]);
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
    const loadReceptionists = async () => {
      try {
        const data = await fetchReceptionists();
        setReceptionists(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch receptionists:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReceptionists();
  }, []);

  const handleDeleteReceptionist = async (receptionistId) => {
    if (window.confirm("هل أنت متأكد من حذف موظف الاستقبال هذا؟")) {
      try {
        await deleteUser(receptionistId);
        setReceptionists(receptionists.filter((r) => r.id !== receptionistId));
        alert("تم حذف موظف الاستقبال بنجاح");
      } catch (err) {
        console.error("Failed to delete receptionist:", err);
        alert("فشل في حذف موظف الاستقبال");
      }
    }
  };

  const openSalaryModal = (receptionistId) => {
    setSalaryData({
      ...salaryData,
      appUserId: receptionistId,
      paymentDate: new Date().toISOString().split("T")[0],
    });
    setShowSalaryModal(true);
  };

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
        <div className="text-center py-10">
          جاري تحميل بيانات موظفي الاستقبال...
        </div>
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
      <h2 className="font-semibold text-2xl text-left mb-4">
        معلومات موظفي الاستقبال
      </h2>

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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <h3 className="font-medium text-xl my-2.5">موظفو الاستقبال</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          معلومات عن موظفي الاستقبال في المستشفى
        </span>
      </div>

      <div className="w-full overflow-x-auto my-10">
        {receptionists.length > 0 ? (
          <table className="w-full border-collapse border border-gray-600 text-white text-right">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-600">الاسم الكامل</th>
                <th className="p-3 border border-gray-600">اسم المستخدم</th>
                <th className="p-3 border border-gray-600">
                  البريد الإلكتروني
                </th>
                <th className="p-3 border border-gray-600">مستوى الطوارئ</th>
                <th className="p-3 border border-gray-600">الحالة</th>
                <th className="p-3 border border-gray-600">رقم الهاتف</th>
                <th className="p-3 border border-gray-600">وقت الدخول</th>
                <th className="p-3 border border-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.map((receptionist) => (
                <tr
                  key={receptionist.id}
                  className="border border-gray-600 hover:bg-gray-700"
                >
                  <td className="p-3 border border-gray-600">
                    {receptionist.fullname}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {receptionist.userName}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {receptionist.email}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {receptionist.emergencylevel === "begin" && "مبتدئ"}
                    {receptionist.emergencylevel === "intermediate" && "متوسط"}
                    {receptionist.emergencylevel === "expert" && "خبير"}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {receptionist.status ? (
                      <span className="text-green-500">نشط</span>
                    ) : (
                      <span className="text-red-500">غير نشط</span>
                    )}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {receptionist.phoneNumber}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {new Date(receptionist.checkintime).toLocaleString("ar-EG")}
                  </td>
                  <td className="p-3 border border-gray-600 flex gap-2 justify-center">
                    <button
                      onClick={() => handleDeleteReceptionist(receptionist.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => openSalaryModal(receptionist.id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                    >
                      إضافة راتب
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">
            لا يوجد موظفي استقبال مسجلين حالياً
          </div>
        )}
      </div>

      {/* Salary Modal */}
      {showSalaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              إضافة راتب لموظف الاستقبال
            </h3>

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

export default ReceptionManagement;
