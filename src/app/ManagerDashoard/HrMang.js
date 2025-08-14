"use client";
import React, { useEffect, useState } from "react";
import { fetchHR, deleteUser, addSalary, registerHR } from "@/app/ApiRequsets";

/*
  Here I display the Hr users in the system using {fetchHR} 
  And i allowed the admin or the Hr to Add the Salary for each user or delete the user
  using {deleteUser} and {addSalary} 
  And i allowed the admin or the Hr to add new Hr user using {registerHR} 
*/

const HRManagement = () => {
  const [hrStaff, setHRStaff] = useState([]);
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
  const [showAddHRModal, setShowAddHRModal] = useState(false);
  const [newHRData, setNewHRData] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    phoneNumber: "",
    age: "",
    gender: "male",
    department: "Human Resources",
    position: "HR",
    hireDate: new Date().toISOString(),
  });

  useEffect(() => {
    const loadHRStaff = async () => {
      try {
        const data = await fetchHR();
        setHRStaff(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch HR staff:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHRStaff();
  }, []);

  const handleDeleteHR = async (hrId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
      try {
        await deleteUser(hrId);
        setHRStaff(hrStaff.filter((hr) => hr.id !== hrId));
        alert("تم حذف الموظف بنجاح");
      } catch (err) {
        console.error("Failed to delete HR staff:", err);
        alert("فشل في حذف الموظف");
      }
    }
  };

  const openSalaryModal = (hrId) => {
    setSalaryData({
      ...salaryData,
      appUserId: hrId,
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

  const handleAddHR = async () => {
    try {
      // validation the inputs
      const requiredFields = [
        "username",
        "password",
        "email",
        "fullname",
        "phoneNumber",
        "age",
      ];
      const missingFields = requiredFields.filter((field) => !newHRData[field]);

      if (missingFields.length > 0) {
        throw new Error("الرجاء إدخال جميع البيانات المطلوبة");
      }

      // Set the data
      const hrData = {
        ...newHRData,
        age: parseInt(newHRData.age),
        hireDate: new Date().toISOString(),
        position: "HR",
      };

      // Register for the new HR
      const response = await registerHR(hrData);

      if (response) {
        alert("تم تسجيل الموظف الجديد بنجاح");
        setShowAddHRModal(false);
        setNewHRData({
          username: "",
          password: "",
          email: "",
          fullname: "",
          phoneNumber: "",
          age: "",
          gender: "male",
          department: "Human Resources",
          position: "HR",
          hireDate: new Date().toISOString(),
        });

        const updatedList = await fetchHR();
        setHRStaff(updatedList);
      }
    } catch (err) {
      alert(err.message || "فشل في تسجيل الموظف الجديد");
      console.error("Failed to add HR:", err);
    }
  };

  if (loading) {
    return (
      <article className="w-4/5 flex flex-col px-8 py-5 max-md:px-3.5">
        <div className="text-center py-10">جاري تحميل بيانات الموظفين...</div>
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
        إدارة موظفي الموارد البشرية
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

        <h3 className="font-medium text-xl my-2.5">موظفو الموارد البشرية</h3>
        <span className="font-medium text-sm text-gray-400 my-3">
          معلومات عن موظفي قسم الموارد البشرية
        </span>
      </div>

      <div className="w-full flex justify-end my-5">
        <button
          onClick={() => setShowAddHRModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          إضافة موظف جديد
        </button>
      </div>

      <div className="w-full overflow-x-auto my-10">
        {hrStaff.length > 0 ? (
          <table className="w-full border-collapse border border-gray-600 text-white text-right">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-600">الاسم الكامل</th>
                <th className="p-3 border border-gray-600">اسم المستخدم</th>
                <th className="p-3 border border-gray-600">
                  البريد الإلكتروني
                </th>
                <th className="p-3 border border-gray-600">القسم</th>
                <th className="p-3 border border-gray-600">الوظيفة</th>
                <th className="p-3 border border-gray-600">رقم الهاتف</th>
                <th className="p-3 border border-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {hrStaff.map((hr) => (
                <tr
                  key={hr.id}
                  className="border border-gray-600 hover:bg-gray-700"
                >
                  <td className="p-3 border border-gray-600">{hr.fullname}</td>
                  <td className="p-3 border border-gray-600">{hr.userName}</td>
                  <td className="p-3 border border-gray-600">{hr.email}</td>
                  <td className="p-3 border border-gray-600">
                    {hr.department || "موارد بشرية"}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {hr.position || "HR"}
                  </td>
                  <td className="p-3 border border-gray-600">
                    {hr.phoneNumber}
                  </td>
                  <td className="p-3 border border-gray-600 flex gap-2 justify-center">
                    <button
                      onClick={() => handleDeleteHR(hr.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => openSalaryModal(hr.id)}
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
          <div className="text-center py-10">لا يوجد موظفين مسجلين حالياً</div>
        )}
      </div>

      {/* Salary Modal */}
      {showSalaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">إضافة راتب للموظف</h3>

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

      {/* Add HR Modal */}
      {showAddHRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">تسجيل موظف جديد</h3>
              <button
                onClick={() => setShowAddHRModal(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">اسم المستخدم:</label>
                <input
                  type="text"
                  value={newHRData.username}
                  onChange={(e) =>
                    setNewHRData({ ...newHRData, username: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">كلمة المرور:</label>
                <input
                  type="password"
                  value={newHRData.password}
                  onChange={(e) =>
                    setNewHRData({ ...newHRData, password: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  placeholder="أدخل كلمة المرور"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={newHRData.email}
                  onChange={(e) =>
                    setNewHRData({ ...newHRData, email: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">الاسم الكامل:</label>
                <input
                  type="text"
                  value={newHRData.fullname}
                  onChange={(e) =>
                    setNewHRData({ ...newHRData, fullname: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  placeholder="أدخل الاسم الكامل"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">رقم الهاتف:</label>
                <input
                  type="tel"
                  value={newHRData.phoneNumber}
                  onChange={(e) =>
                    setNewHRData({ ...newHRData, phoneNumber: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  placeholder="أدخل رقم الهاتف"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">العمر:</label>
                  <input
                    type="number"
                    value={newHRData.age}
                    onChange={(e) =>
                      setNewHRData({ ...newHRData, age: e.target.value })
                    }
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                    placeholder="العمر"
                    min="18"
                    max="60"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">النوع:</label>
                  <select
                    value={newHRData.gender}
                    onChange={(e) =>
                      setNewHRData({ ...newHRData, gender: e.target.value })
                    }
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  >
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm">القسم:</label>
                <select
                  value={newHRData.department}
                  onChange={(e) =>
                    setNewHRData({ ...newHRData, department: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                >
                  <option value="Human Resources">موارد بشرية</option>
                  <option value="Recruitment">التوظيف</option>
                  <option value="Training">التدريب</option>
                  <option value="Payroll">الرواتب</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddHRModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddHR}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
              >
                تسجيل
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default HRManagement;
