"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // check the valid of the user info
    if (!password || !email) {
      setError("يرجي إدخال الإيميل وكلمه السر لأتمام عمليه التسجيل");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://hospital111.runasp.net/api/Auth/login`,
        {
          email,
          password,
        }
      );

      console.log("Response data:", response.data);

      if (response.data.token) {
        // اضافه التوكن الي localStorage
        localStorage.setItem("authToken", response.data.token);

        // دي عشان يعمل مصادقه تلقائيه فيما بعد
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setLoading(false);
        alert("تم تسجيل دخولك للنظام بنجاح!");
        window.location.href = "/"; //navigate the user to the home page
      } else {
        setError(response.data.message || "بيانات الدخول غير صحيحة");
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء الاتصال بالخادم");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto my-10 p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">تسجيل الدخول</h1>
        <p className="text-gray-500 mt-2">
          مرحبًا بك مجددًا. يرجى تسجيل الدخول للوصول إلى حسابك
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            البريد الإلكتروني *
          </label>
          <input
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            كلمة المرور *
          </label>
          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <div className="text-right">
            <Link
              href="/user/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              جاري تسجيل الدخول...
            </span>
          ) : (
            "تسجيل الدخول"
          )}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">أو</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="#EA4335"
            />
          </svg>
          تسجيل الدخول باستخدام جوجل
        </button> */}

        <div className="text-center text-sm text-gray-500">
          ليس لديك حساب؟{" "}
          <Link
            href="/user/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            أنشئ حساب الآن
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
