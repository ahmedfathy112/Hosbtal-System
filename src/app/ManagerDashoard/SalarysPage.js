"use client";
import { useState, useEffect } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import {
  fetchAllSalaries,
  fetchUserById,
  deleteSalaryByUsername,
} from "@/app/ApiRequsets";

const SalaryPage = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات الرواتب والموظفين
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // جلب بيانات الرواتب باستخدام الخدمة
        const salariesData = await fetchAllSalaries();
        setSalaries(salariesData);

        // جلب بيانات الموظفين باستخدام appUserId من الرواتب
        const employeesData = {};
        const uniqueEmployeeIds = [
          ...new Set(salariesData.map((s) => s.appUserId)),
        ];

        for (const id of uniqueEmployeeIds) {
          try {
            const employee = await fetchUserById(id);
            employeesData[id] = {
              id: employee.id,
              type: employee.type,
              fullname: employee.fullname,
              userName: employee.userName,
              specialty: employee.specialty || "غير محدد",
              email: employee.email,
              phoneNumber: employee.phoneNumber,
            };
          } catch (err) {
            console.error(`Failed to fetch employee ${id}:`, err);
            employeesData[id] = {
              id,
              type: "غير محدد",
              fullname: "غير معروف",
              userName: "غير معروف",
              specialty: "غير محدد",
            };
          }
        }

        setEmployees(employeesData);
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء جلب البيانات");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // دمج بيانات الرواتب مع بيانات الموظفين
  const salaryData = salaries.map((salary) => ({
    ...salary,
    employee: employees[salary.appUserId] || {
      type: "غير محدد",
      fullname: "غير معروف",
      userName: "غير معروف",
      specialty: "غير محدد",
    },
  }));

  // إحصائيات الرواتب
  const totalSalaries = salaryData.reduce((sum, item) => sum + item.amount, 0);
  const paidSalaries = salaryData
    .filter((item) => item.status === "done")
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingSalaries = salaryData
    .filter((item) => item.status !== "done")
    .reduce((sum, item) => sum + item.amount, 0);

  // دالة لحذف الراتب
  const handleDeleteSalary = async (username) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الراتب؟")) {
      try {
        await deleteSalaryByUsername(username);
        setSalaries(salaries.filter((s) => s.userName !== username));
        alert("تم حذف الراتب بنجاح");
      } catch (err) {
        console.error("Failed to delete salary:", err);
        alert("فشل في حذف الراتب");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-5/6 bg-gray-50 dark:bg-gray-900 p-6 flex justify-center items-center">
        <div className="text-center py-10">جاري تحميل بيانات الرواتب...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-5/6 bg-gray-50 dark:bg-gray-900 p-6 flex justify-center items-center">
        <div className="text-red-500 text-center py-10">حدث خطأ: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-5/6 bg-gray-50 dark:bg-gray-900 p-6">
      {/* العنوان */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        كشوف الرواتب
      </h1>

      {/* بطاقة الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">
            إجمالي الرواتب
          </h3>
          <p className="text-2xl font-bold">
            {totalSalaries.toLocaleString()} ج.م
          </p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">المسدد</h3>
          <p className="text-2xl font-bold">
            {paidSalaries.toLocaleString()} ج.م
          </p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">المعلق</h3>
          <p className="text-2xl font-bold">
            {pendingSalaries.toLocaleString()} ج.م
          </p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">
            عدد الموظفين
          </h3>
          <p className="text-2xl font-bold">{salaryData.length}</p>
        </div>
      </div>

      {/* جدول الرواتب */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-right">الاسم</th>
                <th className="py-3 px-4 text-right">اسم المستخدم</th>
                <th className="py-3 px-4 text-right">النوع</th>
                <th className="py-3 px-4 text-right">التخصص</th>
                <th className="py-3 px-4 text-right">الراتب الأساسي</th>
                <th className="py-3 px-4 text-right">طريقة الدفع</th>
                <th className="py-3 px-4 text-right">الصافي</th>
                <th className="py-3 px-4 text-right">تاريخ الدفع</th>
                <th className="py-3 px-4 text-right">الحالة</th>
                <th className="py-3 px-4 text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.length > 0 ? (
                salaryData.map((item) => (
                  <tr
                    key={item.salaryId}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-4">{item.employee.fullname}</td>
                    <td className="py-3 px-4">{item.employee.userName}</td>
                    <td className="py-3 px-4">{item.employee.type}</td>
                    <td className="py-3 px-4">{item.employee.specialty}</td>
                    <td className="py-3 px-4">
                      {item.amount.toLocaleString()} ج.م
                    </td>
                    <td className="py-3 px-4">{item.paymentMethod}</td>
                    <td className="py-3 px-4 font-bold">
                      {item.amount.toLocaleString()} ج.م
                    </td>
                    <td className="py-3 px-4">
                      {new Date(item.paymentDate).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "done"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {item.status === "done" ? "مسدد" : "معلق"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            // يمكنك هنا تنزيل كشف الراتب
                          }}
                        >
                          <FiDownload />
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            // يمكنك هنا طباعة كشف الراتب
                          }}
                        >
                          <FiPrinter />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            handleDeleteSalary(item.employee.userName)
                          }
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center text-gray-500">
                    لا توجد بيانات متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
