"use client";
import Link from "next/link";
import React, { useState } from "react";

const Register = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [CheckBox, setCheckBox] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //   check if all inputs filled
    if (name === "" || phone === "" || email === "") {
      setError("من فضلك املئ البيانات بالكامل");
      return;
    }

    //   check name input
    if (name.trim().split(" ").length < 3) {
      setError("يجب أن يكون الأسم ثلاثي");
      return;
    }

    //check the phone number
    const phoneRegex = /^01\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError("رقم الهاتف يجب أن يتكون من 11 رقمًا ويبدأ بـ '01'");
      return;
    }

    //   start password validations
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password !== ConfirmPassword) {
      setError("كلمة المرور غير متطابقة أعد المحاوله");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "كلمة المرور يجب ان تكون علي الأقل 8 ارقام ويجب ان تحتوي علي حرف مميز وحرف كبير وحرف صغير وارقام"
      );
      return;
    }
    //   end password validations
    //   checkBox validation
    if (!CheckBox) {
      setError("يجب أن توافق علي شروط الأستخدام أولا");
      return;
    }

    setError("");
    alert("تم تسجيل الدخول بنجاح!");
  };

  return (
    <main className="w-1/2 text-center my-10 flex flex-col justify-center mx-auto max-md:w-full max-md:px-4">
      <h3 className="text-3xl font-semibold my-4">إنشاء حساب جديد</h3>
      <p className="text-[17px] font-medium my-5 text-gray-400">
        أدخل بياناتك الشخصية لإنشاء حساب جديد في نظام إدارة المستشفي
      </p>
      <form>
        <div className="flex flex-col justify-center text-left">
          <label form="name">الأسم بالكامل</label>
          <input
            type="text"
            placeholder="أدخل أسمك بالكامل"
            title="أدخل اسمك"
            required
            onChange={(e) => setName(e.target.value)}
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
        <div className="flex flex-col justify-center text-left my-3">
          <label form="tel">رقم الهاتف</label>
          <input
            type="tel"
            placeholder="أدخل رقم الهاتف"
            title="أدخل رقم الهاتف"
            required
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#ada8a86d] text-white outline-0 border-0 rounded-xl px-3 py-1.5 my-2.5"
          />
        </div>
        <div className="flex flex-col justify-center text-left my-3">
          <label form="tel">كلمة المرور</label>
          <input
            type="password"
            placeholder="أدخل كلمه المرور"
            title="أدخل كلمه المرور"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#ada8a86d] text-white outline-0 border-0 rounded-xl px-3 py-1.5 my-2.5"
          />
          <span className="text-[13px] text-gray-400">
            يجب أن تحتوي كلمه المرور علي حرف كبير وحرف صغير وارقام وحرف مميز
          </span>
        </div>
        <div className="flex flex-col justify-center text-left my-3">
          <label form="tel"> تاكيد كلمة المرور</label>
          <input
            type="password"
            placeholder="تاكيد كلمه المرور"
            title="تاكيد كلمه المرور"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#ada8a86d] text-white outline-0 border-0 rounded-xl px-3 py-1.5 my-2.5"
          />
        </div>
        <div className="flex flex-row justify-between w-full my-3">
          <div className="flex flex-col text-left">
            <h3 className="text-lg  my-1.5">الموافقة علي الشروط والأحكام</h3>
            <p className="text-[15px] text-gray-400">
              أوافق علي شروط الأستخدام وسياسه الخصوصيه
            </p>
          </div>
          <input
            type="checkbox"
            onChange={(e) => setCheckBox(e.target.value)}
            className="w-4 h-4 my-auto text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        {error && <p className="text-red-500 my-3">{error}</p>}
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white p-2 cursor-pointer block w-full rounded-2xl mb-4"
        >
          إنشاء الحساب
        </button>
        <Link href="/user/login" className="py-5 text-[#1034e9eb] underline">
          هل لديك حساب بالفعل.. سجل الأن
        </Link>
      </form>
    </main>
  );
};
export default Register;
