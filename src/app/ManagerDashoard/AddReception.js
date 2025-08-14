"use client";
import axios from "axios";
import React, { useState } from "react";

const ReceptionForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyLevel, setEmergencyLevel] = useState("begin");
  const [status, setStatus] = useState(true);
  const [checkInTime, setCheckInTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // التحقق من الاسم الثلاثي
    if (fullname.trim().split(" ").length < 3) {
      setError("يجب أن يكون الاسم ثلاثي");
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
    if (!passwordRegex.test(password)) {
      setError(
        "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير، حرف صغير، رقم وحرف خاص (@#$!%*?&)"
      );
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://hospital111.runasp.net/api/Auth/register_reception",
        {
          username,
          password,
          email,
          fullname,
          phoneNumber,
          age: parseInt(age),
          gender,
          emergencylevel: emergencyLevel,
          status,
          checkintime: checkInTime || new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        alert("تم إضافة موظف الاستقبال بنجاح!");
        // إعادة تعيين الحقول
        setUsername("");
        setPassword("");
        setEmail("");
        setFullname("");
        setPhoneNumber("");
        setAge("");
        setGender("male");
        setEmergencyLevel("begin");
        setStatus(true);
        setCheckInTime("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "حدث خطأ أثناء الإضافة"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 shadow-md px-8 py-5 max-md:px-3.5 w-full text-white my-4 mx-4 rounded-3xl"
    >
      <h2 className="text-xl font-bold mb-4">إضافة موظف استقبال جديد</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            الاسم الثلاثي
          </label>
          <input
            type="text"
            placeholder="ادخل الاسم الثلاثي"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="input-dark"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            اسم المستخدم
          </label>
          <input
            type="text"
            placeholder="اسم المستخدم مثل magdy_15"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-dark"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="input-dark"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            رقم الهاتف
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="01045655874"
            className="input-dark"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            كلمة المرور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="يجب أن تحتوي على حروف وأرقام ورموز"
            className="input-dark"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            يجب أن تحتوي على حرف كبير، حرف صغير، رقم وحرف خاص (@$!%*?&)
          </p>
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            العمر
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="مثل 28"
            className="input-dark"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            النوع
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input-dark"
            required
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            مستوى الطوارئ
          </label>
          <select
            value={emergencyLevel}
            onChange={(e) => setEmergencyLevel(e.target.value)}
            className="input-dark"
            required
          >
            <option value="begin">مبتدئ</option>
            <option value="intermediate">متوسط</option>
            <option value="expert">خبير</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            الحالة
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            className="input-dark"
            required
          >
            <option value={true}>نشط</option>
            <option value={false}>غير نشط</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            وقت الدخول (اختياري)
          </label>
          <input
            type="datetime-local"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            className="input-dark"
          />
        </div>
      </div>

      <div className="w-full">
        <button
          type="submit"
          disabled={loading}
          className="btn-dark mt-4 py-2 px-3.5 bg-[#284cff] cursor-pointer rounded-2xl mx-auto"
        >
          {loading ? "جاري الإضافة..." : "إضافة موظف استقبال"}
        </button>
      </div>
    </form>
  );
};

export default ReceptionForm;
