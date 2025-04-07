"use client";
import { useState } from "react";
import { FiSearch, FiFilter, FiDownload, FiPrinter } from "react-icons/fi";

const SalaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("كل الأشهر");
  const [selectedRole, setSelectedRole] = useState("الكل");

  // بيانات الرواتب
  const salaryData = [
    {
      id: 1,
      name: "د. أحمد محمد",
      role: "طبيب أخصائي",
      basicSalary: 15000,
      bonuses: 3000,
      deductions: 500,
      netSalary: 17500,
      month: "يناير 2024",
      status: "مسدد",
    },
    {
      id: 2,
      name: "م. سارة عبدالله",
      role: "ممرض رئيسي",
      basicSalary: 8000,
      bonuses: 1000,
      deductions: 200,
      netSalary: 8800,
      month: "يناير 2024",
      status: "مسدد",
    },
    {
      id: 3,
      name: "د. خالد أحمد",
      role: "طبيب استشاري",
      basicSalary: 20000,
      bonuses: 5000,
      deductions: 1000,
      netSalary: 24000,
      month: "فبراير 2024",
      status: "معلق",
    },
  ];

  // فلترة البيانات
  const filteredData = salaryData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMonth =
      selectedMonth === "كل الأشهر" || item.month.includes(selectedMonth);
    const matchesRole =
      selectedRole === "الكل" || item.role.includes(selectedRole);
    return matchesSearch && matchesMonth && matchesRole;
  });

  // الأشهر المتاحة
  const months = ["كل الأشهر", "يناير 2024", "فبراير 2024", "مارس 2024"];
  const roles = ["الكل", "طبيب أخصائي", "طبيب استشاري", "ممرض رئيسي"];

  return (
    <div className="min-h-screen w-5/6 bg-gray-50 dark:bg-gray-900 p-6">
      {/* العنوان وشريط التحكم */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
          كشوف الرواتب
        </h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* شريط البحث */}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم..."
              className="w-full bg-white dark:bg-gray-800 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* تصفية حسب الشهر */}
          <select
            className="bg-white dark:bg-gray-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          {/* تصفية حسب الدور */}
          <select
            className="bg-white dark:bg-gray-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* بطاقة الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">
            إجمالي الرواتب
          </h3>
          <p className="text-2xl font-bold">50,300 ج.م</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">المسدد</h3>
          <p className="text-2xl font-bold">26,300 ج.م</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">المعلق</h3>
          <p className="text-2xl font-bold">24,000 ج.م</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm">
            عدد الموظفين
          </h3>
          <p className="text-2xl font-bold">{salaryData.length}</p>
        </div>
      </div>

      {/* جدول الرواتب */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden invotryPage">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-right">الاسم</th>
                <th className="py-3 px-4 text-right">الوظيفة</th>
                <th className="py-3 px-4 text-right">الراتب الأساسي</th>
                <th className="py-3 px-4 text-right">المكافآت</th>
                <th className="py-3 px-4 text-right">الخصومات</th>
                <th className="py-3 px-4 text-right">الصافي</th>
                <th className="py-3 px-4 text-right">الشهر</th>
                <th className="py-3 px-4 text-right">الحالة</th>
                <th className="py-3 px-4 text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.role}</td>
                    <td className="py-3 px-4">
                      {item.basicSalary.toLocaleString()} ج.م
                    </td>
                    <td className="py-3 px-4 text-green-500">
                      +{item.bonuses.toLocaleString()} ج.م
                    </td>
                    <td className="py-3 px-4 text-red-500">
                      -{item.deductions.toLocaleString()} ج.م
                    </td>
                    <td className="py-3 px-4 font-bold">
                      {item.netSalary.toLocaleString()} ج.م
                    </td>
                    <td className="py-3 px-4">{item.month}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "مسدد"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FiDownload />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <FiPrinter />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-4 text-center text-gray-500">
                    لا توجد بيانات متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* summry of the salarys */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="font-bold mb-3">ملخص الرواتب</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              إجمالي هذا الشهر:
            </p>
            <p className="text-xl font-bold">26,300 ج.م</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            تصدير كشف الرواتب
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
