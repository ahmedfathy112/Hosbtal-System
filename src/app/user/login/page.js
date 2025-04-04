"use client";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="w-1/2 text-center my-10 flex flex-col justify-center mx-auto max-md:w-full max-md:px-4">
      <h3 className="text-3xl font-semibold my-4">تسجيل الدخول</h3>
      <p className="text-[17px] font-medium my-5 text-gray-400">
        مرحبا بك مجددا.يرجي تسجيل الدخول للوصول الي حسابك
      </p>
      <form>
        <div className="flex flex-col justify-center text-left">
          <label form="name">كلمة المرور</label>
          <input
            type="password"
            placeholder="أدخل كلمه المرور"
            title="كلمه المرور"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#ada8a86d] text-white outline-0 border-0 rounded-xl px-3 py-1.5 my-2.5"
          />
        </div>
        <div className="flex flex-col justify-center text-left my-3">
          <label form="name">البريد الإلكتروني</label>
          <input
            type="email"
            placeholder="name@gmail.com.."
            title="أدخل البريد الألكتروني"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#ada8a86d] text-white outline-0 border-0 rounded-xl px-3 py-1.5 my-2.5"
          />
        </div>
        {error && <p className="text-red-500 my-3">{error}</p>}
        <button
          // onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white p-2 cursor-pointer block w-full rounded-2xl"
        >
          تسجيل الدخول
        </button>
        <div className="py-7">
          <hr />
          OR
          <hr />
        </div>
        <button
          // onClick={handleSubmit}
          type="submit"
          className="bg-[#284cff38] text-white p-2 cursor-pointer block w-full rounded-2xl mb-4"
        >
          تسجيل الدخول بأستخدام جوجل
        </button>
        <Link href="/user/register" className="py-5 text-[#1034e9eb] underline">
          أليس لديك حساب؟ أنشئ حساب الأن
        </Link>
      </form>
    </main>
  );
};
export default Login;
