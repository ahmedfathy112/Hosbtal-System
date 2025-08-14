"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // التحقق من الاسم الثلاثي
    if (fullname.trim().split(" ").length < 3) {
      setError("يجب أن يكون الأسم ثلاثي");
      setLoading(false);
      return;
    }

    // التحقق من رقم الهاتف (8 أرقام على الأقل)
    const phoneRegex = /^\d{8,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل");
      setLoading(false);
      return;
    }

    // التحقق من كلمة المرور
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة أعد المحاوله");
      setLoading(false);
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "كلمة المرور يجب ان تكون 8 أحرف على الأقل وتحتوي على حرف كبير، حرف صغير، رقم وحرف خاص (@#$!%*?&)"
      );
      setLoading(false);
      return;
    }

    // التحقق من الموافقة على الشروط
    if (!checkBox) {
      setError("يجب أن توافق علي شروط الأستخدام أولا");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://hospital111.runasp.net/api/Auth/register_patient`,
        {
          age: parseInt(age),
          password,
          phoneNumber,
          fullname,
          username,
          medicalHistory,
          bloodType,
          gender,
          email,
        }
      );

      if (response.data.token) {
        alert("تم تسجيل الحساب بنجاح!");
        router.push("/user/login");
      } else {
        setError(response.data.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className="max-w-md mx-auto my-10 p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">إنشاء حساب جديد</h1>
        <p className="mt-2">
          أدخل بياناتك الشخصية لإنشاء حساب جديد في نظام إدارة المستشفي
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {/* for the userName */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">اسم المستخدم *</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* enter the pass */}
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium">كلمة المرور *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                style={{ top: "0%", transform: "translateY(10%)" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        {/* for the fullName */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">الأسم بالكامل *</label>
          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*for the email  */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* for the phone num */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">رقم الهاتف *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              pattern="\d{8,}"
              title="يجب أن يتكون من 8 أرقام على الأقل"
            />
          </div>
        </div>
        {/* for the age */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">العمر *</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              min="1"
            />
          </div>
          {/* to choose the gender */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">النوع *</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option className="text-black" value="">
                اختر النوع
              </option>
              <option className="text-black" value="male">
                ذكر
              </option>
              <option className="text-black" value="female">
                أنثى
              </option>
            </select>
          </div>
          {/* لاختيار الفصيله */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">فصيلة الدم</label>
            <select
              name="bloodType"
              value={bloodType}
              onChange={(e) => {
                setBloodType(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option className="text-black" value="k">
                غير محدد
              </option>
              <option className="text-black" value="a+">
                A+
              </option>
              <option className="text-black" value="a-">
                A-
              </option>
              <option className="text-black" value="b+">
                B+
              </option>
              <option className="text-black" value="b-">
                B-
              </option>
              <option className="text-black" value="ab+">
                AB+
              </option>
              <option className="text-black" value="ab-">
                AB-
              </option>
              <option className="text-black" value="o+">
                O+
              </option>
              <option className="text-black" value="o-">
                O-
              </option>
            </select>
          </div>
        </div>
        {/* للتاريخ المرضي */}

        <div className="space-y-2">
          <label className="block text-sm font-medium">التاريخ المرضي</label>
          <textarea
            name="medicalHistory"
            value={medicalHistory}
            onChange={(e) => {
              setMedicalHistory(e.target.value);
            }}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* confirm the pass */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-medium">
            تأكيد كلمة المرور *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              style={{ top: "0%", transform: "translateY(10%)" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            يجب أن تحتوي كلمة المرور على الأقل على:
            <br />
            - 8 أحرف
            <br />
            - حرف كبير واحد على الأقل (A-Z)
            <br />
            - حرف صغير واحد على الأقل (a-z)
            <br />
            - رقم واحد على الأقل (0-9)
            <br />- حرف خاص واحد (@$!%*?&)
          </p>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={checkBox}
              onChange={(e) => setCheckBox(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">
              أوافق على{" "}
              <a href="#" className="text-blue-600 hover:underline">
                شروط الاستخدام
              </a>{" "}
              و{" "}
              <a href="#" className="text-blue-600 hover:underline">
                سياسة الخصوصية
              </a>
            </label>
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
              جاري التسجيل...
            </span>
          ) : (
            "إنشاء الحساب"
          )}
        </button>

        <div className="text-center text-sm text-gray-500">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/user/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            سجل الدخول الآن
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
