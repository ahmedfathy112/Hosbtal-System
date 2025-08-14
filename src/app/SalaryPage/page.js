"use client";
import { useState, useEffect } from "react";
import {
  FiDownload,
  FiPrinter,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiMeh,
  FiStopCircle,
} from "react-icons/fi";
import { fetchSalaryByUsername } from "@/app/ApiRequsets";
import { fetchUserById } from "@/app/ApiRequsets";

const EmployeeSalaryPage = () => {
  const [salaryData, setSalaryData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  استخراج التوكن من localStorage
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("لم يتم العثور على توكن المصادقة");
        }

        //  فك تشفير التوكن لاستخراج userId
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId;

        if (!userId) {
          throw new Error("لم يتم العثور على معرف المستخدم في التوكن");
        }

        //  جلب بيانات المستخدم باستخدام userId
        const userResponse = await fetchUserById(userId);
        setUserData(userResponse);

        if (!userResponse || !userResponse.userName) {
          throw new Error("بيانات المستخدم غير مكتملة");
        }

        //  جلب بيانات الراتب باستخدام userName
        try {
          const salaryResponse = await fetchSalaryByUsername(
            userResponse.userName
          );
          if (!salaryResponse || salaryResponse.length === 0) {
            setErrorType("not_found");
            throw new Error("لا توجد بيانات راتب لهذا المستخدم");
          }
          setSalaryData(salaryResponse[0]);
        } catch (err) {
          if (err.response?.status === 404) {
            setErrorType("not_found");
            throw new Error("لا توجد بيانات راتب لك بعد");
          } else if (err.response?.status === 403) {
            setErrorType("forbidden");
            throw new Error("غير مصرح لك برؤية بيانات الراتب");
          }
          throw err;
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center items-center">
        <div className="animate-pulse text-gray-500">
          جاري تحميل بيانات الراتب...
        </div>
      </div>
    );
  }

  if (error && errorType === "forbidden") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col justify-center items-center text-center">
        <FiStopCircle className="text-5xl text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
          غير مصرح لك
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          {error}
          <br />
          يرجى التواصل مع قسم الموارد البشرية إذا كنت تعتقد أن هذا خطأ
        </p>
      </div>
    );
  }

  if (error && errorType === "not_found") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        {/* العنوان الرئيسي */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            بيان الراتب الشهري
          </h1>
        </div>

        {/* معلومات الموظف */}
        {userData && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">معلومات الموظف</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  اسم المستخدم:
                </p>
                <p className="font-medium">{userData.userName}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  الاسم الكامل:
                </p>
                <p className="font-medium">{userData.fullname}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  البريد الإلكتروني:
                </p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* رسالة عدم وجود راتب */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-8 text-center mb-8">
          <div className="flex flex-col items-center">
            <FiMeh className="text-4xl text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
              لا يوجد بيانات راتب متاحة حالياً
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error}
              <br />
              سيتم تحديث البيانات هنا بمجرد توفر الراتب
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-gray-800 border border-yellow-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 font-bold mb-3 text-yellow-800 dark:text-yellow-200">
            <FiAlertCircle /> ملاحظات مهمة
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>الراتب يصرف عادةً في اليوم الخامس من كل شهر</li>
            <li>في حال وجود أي استفسار، يرجى التواصل مع قسم الموارد البشرية</li>
          </ul>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col justify-center items-center text-center">
        <FiAlertCircle className="text-5xl text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
          حدث خطأ
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          {error}
          <br />
          يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني
        </p>
      </div>
    );
  }

  if (!salaryData || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center items-center">
        <div className="text-gray-500">لا توجد بيانات متاحة</div>
      </div>
    );
  }

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

      {/* معلومات الموظف */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">معلومات الموظف</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-300">اسم المستخدم:</p>
            <p className="font-medium">{userData.userName}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">الاسم الكامل:</p>
            <p className="font-medium">{userData.fullname}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              البريد الإلكتروني:
            </p>
            <p className="font-medium">{userData.email}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">رقم الهاتف:</p>
            <p className="font-medium">{userData.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300">النوع:</p>
            <p className="font-medium capitalize">
              {userData.type === "Doctor" ? "طبيب" : "موظف"}
            </p>
          </div>
        </div>
      </div>

      {/* بطاقة حالة الراتب */}
      <div
        className={`p-6 rounded-lg mb-8 ${
          salaryData.status === "done"
            ? "bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800"
            : "bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800"
        }`}
      >
        <div className="flex items-center gap-4">
          {salaryData.status === "done" ? (
            <FiCheckCircle className="text-3xl text-green-600 dark:text-green-300" />
          ) : (
            <FiClock className="text-3xl text-yellow-600 dark:text-yellow-300" />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {salaryData.status === "done"
                ? "تم دفع الراتب"
                : "الراتب قيد المعالجة"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {salaryData.status === "done"
                ? `تم دفع الراتب بتاريخ ${new Date(
                    salaryData.paymentDate
                  ).toLocaleDateString("ar-EG")}`
                : "سيتم الإعلان هنا عند توفر الراتب"}
            </p>
          </div>
        </div>
      </div>

      {/* تفاصيل الراتب */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">تفاصيل الراتب</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">
                  المبلغ الأساسي:
                </span>
                <span className="font-medium">
                  {salaryData.amount.toLocaleString("ar-EG")} ج.م
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">
                  طريقة الدفع:
                </span>
                <span className="font-medium capitalize">
                  {salaryData.paymentMethod === "cash" ? "نقدي" : "تحويل بنكي"}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">
                  رقم البيان:
                </span>
                <span className="font-medium">{salaryData.salaryId}</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">صافي الراتب:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {salaryData.amount.toLocaleString("ar-EG")} ج.م
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    تاريخ الصرف:
                  </p>
                  <p>
                    {new Date(salaryData.paymentDate).toLocaleDateString(
                      "ar-EG"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    حالة الراتب:
                  </p>
                  <p
                    className={`font-medium ${
                      salaryData.status === "done"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {salaryData.status === "done" ? "تم الدفع" : "قيد المعالجة"}
                  </p>
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
            في حال وجود أي اختلاف، يرجى التواصل مع قسم الموارد البشرية خلال 48
            ساعة
          </li>
          <li>التحويلات البنكية قد تستغرق حتى 24 ساعة عمل</li>
          <li>يرجى الاحتفاظ بهذا البيان كإثبات للدفع</li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeSalaryPage;
