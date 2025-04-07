"use client";
import { useState, useEffect } from "react";
import {
  FiDownload,
  FiPrinter,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const EmployeeSalaryPage = () => {
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSalaryData({
        month: "يونيو 2024",
        basicSalary: 8500,
        bonuses: 1200,
        deductions: 300,
        netSalary: 9400,
        status: "قيد المعالجة",
        paymentDate: "2024-06-05",
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* العنوان الرئيسي */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          بيان الراتب الشهري
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <FiDownload /> تصدير
          </button>
          <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg">
            <FiPrinter /> طباعة
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">
            جاري تحميل بيانات الراتب...
          </div>
        </div>
      ) : (
        <>
          {/* بطاقة حالة الراتب */}
          <div
            className={`p-6 rounded-lg mb-8 ${
              salaryData.status === "متاح للسحب"
                ? "bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800"
                : "bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800"
            }`}
          >
            <div className="flex items-center gap-4">
              {salaryData.status === "متاح للسحب" ? (
                <FiCheckCircle className="text-3xl text-green-600 dark:text-green-300" />
              ) : (
                <FiClock className="text-3xl text-yellow-600 dark:text-yellow-300" />
              )}
              <div>
                <h2 className="text-xl font-semibold">
                  {salaryData.status === "متاح للسحب"
                    ? "الراتب متاح الآن"
                    : "الراتب قيد المعالجة"}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {salaryData.status === "متاح للسحب"
                    ? `تم تحويل المبلغ إلى حسابك البنكي بتاريخ ${salaryData.paymentDate}`
                    : "سيتم الإعلان هنا عند توفر الراتب"}
                </p>
              </div>
            </div>
          </div>

          {/* تفاصيل الراتب */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">
                تفاصيل الراتب لشهر {salaryData.month}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 invotryPage">
                {/* العمود الأيمن */}
                <div>
                  <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">
                      الراتب الأساسي:
                    </span>
                    <span className="font-medium">
                      {salaryData.basicSalary.toLocaleString()} ج.م
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">
                      المكافآت:
                    </span>
                    <span className="text-green-500 font-medium">
                      +{salaryData.bonuses.toLocaleString()} ج.م
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">
                      الخصومات:
                    </span>
                    <span className="text-red-500 font-medium">
                      -{salaryData.deductions.toLocaleString()} ج.م
                    </span>
                  </div>
                </div>

                {/* العمود الأيسر */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg invotryPage">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">صافي الراتب:</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {salaryData.netSalary.toLocaleString()} ج.م
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        تاريخ الصرف:
                      </p>
                      <p>{salaryData.paymentDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* إشعارات مهمة */}
          <div className="bg-yellow-50 dark:bg-gray-800 border border-yellow-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="flex items-center gap-2 font-bold mb-3 text-yellow-800 dark:text-yellow-200">
              <FiAlertCircle /> ملاحظات مهمة
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>الراتب يصرف عادةً في اليوم الخامس من كل شهر</li>
              <li>
                في حال وجود أي اختلاف، يرجى التواصل مع قسم الموارد البشرية خلال
                48 ساعة
              </li>
              <li>التحويلات البنكية قد تستغرق حتى 24 ساعة عمل</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeSalaryPage;
