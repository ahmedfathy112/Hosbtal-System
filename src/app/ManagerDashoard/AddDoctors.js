"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    fullname: "",
    gender: "male",
    age: "",
    PhoneNumber: "",
    Password: "",
    ClinicSchedule: "",
    ConsultationFee: "",
    Specialty: "",
    DoctorImage: null,
    clinicId: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clinics, setClinics] = useState([]);
  const [clinicsLoading, setClinicsLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(
          "https://hospital111.runasp.net/api/Clinic"
        );
        setClinics(response.data);
      } catch (err) {
        setError("حدث خطأ أثناء جلب قائمة العيادات");
      } finally {
        setClinicsLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "clinicId" || name === "age" || name === "ConsultationFee"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        DoctorImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const requiredFields = [
        "Username",
        "Email",
        "fullname",
        "gender",
        "age",
        "PhoneNumber",
        "Password",
        "ClinicSchedule",
        "ConsultationFee",
        "Specialty",
        "clinicId",
      ];
      const missingFields = requiredFields.filter(
        (field) =>
          formData[field] === "" ||
          formData[field] === null ||
          formData[field] === undefined
      );

      if (missingFields.length > 0) {
        throw new Error("جميع الحقول مطلوبة ما عدا الصورة");
      }

      // Debug: عرض البيانات قبل الإرسال
      console.log("Form data before sending:", formData);

      const formDataToSend = new FormData();

      // إضافة جميع الحقول مع التحويل للنوع الصحيح
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          // تحويل الأرقام إلى سلسلة نصية إذا لزم الأمر
          const value =
            typeof formData[key] === "number"
              ? formData[key].toString()
              : formData[key];
          formDataToSend.append(key, value);
        }
      });

      // Debug: عرض محتوى FormData قبل الإرسال
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        "https://hospital111.runasp.net/api/Auth/register_doctor",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.token) {
        alert("تم إضافة الطبيب بنجاح!");
        setFormData({
          Username: "",
          Email: "",
          fullname: "",
          gender: "male",
          age: "",
          PhoneNumber: "",
          Password: "",
          ClinicSchedule: "",
          ConsultationFee: "",
          Specialty: "",
          DoctorImage: null,
          clinicId: "",
        });
        setPreviewImage(null);
      } else {
        throw new Error(response.data.message || "حدث خطأ أثناء الإضافة");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
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
      <h2 className="text-xl font-bold mb-4">إضافة دكتور جديد</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* اسم المستخدم */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            اسم المستخدم *
          </label>
          <input
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            placeholder="مثال: Mousa_10"
            className="input-dark"
            required
          />
        </div>

        {/* البريد الإلكتروني */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            البريد الإلكتروني *
          </label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="input-dark"
            required
          />
        </div>

        {/* الاسم الكامل */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            الاسم الكامل *
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="مثال: محمود موسي النجار"
            className="input-dark"
            required
          />
        </div>

        {/* النوع */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            النوع *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input-dark"
            required
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        {/* العمر */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            العمر *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="مثال: 45"
            className="input-dark"
            min="25"
            max="80"
            required
          />
        </div>

        {/* رقم الهاتف */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            رقم الهاتف *
          </label>
          <input
            type="tel"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="مثال: 01054755874"
            className="input-dark"
            required
          />
        </div>

        {/* كلمة المرور */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            كلمة المرور *
          </label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="يجب أن تحتوي على حروف وأرقام ورموز"
            className="input-dark"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            يجب أن تحتوي على حرف كبير، حرف صغير، رقم وحرف خاص (@#$!%*?&)
          </p>
        </div>

        {/* مواعيد العيادة */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            مواعيد العيادة *
          </label>
          <input
            type="text"
            name="ClinicSchedule"
            value={formData.ClinicSchedule}
            onChange={handleChange}
            placeholder="مثال: السبت والاثنين والأربعاء الساعة 9 مساءاً"
            className="input-dark"
            required
          />
        </div>

        {/* رسوم الاستشارة */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            رسوم الاستشارة *
          </label>
          <input
            type="number"
            name="ConsultationFee"
            value={formData.ConsultationFee}
            onChange={handleChange}
            placeholder="مثال: 250"
            className="input-dark"
            min="0"
            required
          />
        </div>

        {/* التخصص */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            التخصص *
          </label>
          <input
            type="text"
            name="Specialty"
            value={formData.Specialty}
            onChange={handleChange}
            placeholder="مثال: جراحة المخ والأعصاب"
            className="input-dark"
            required
          />
        </div>

        {/* العيادة */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            العيادة *
          </label>
          <select
            name="clinicId"
            value={formData.clinicId}
            onChange={handleChange}
            className="input-dark"
            required
            disabled={clinicsLoading}
          >
            <option value="">اختر العيادة</option>
            {clinics.map((clinic) => (
              <option key={clinic.clinicId} value={clinic.clinicId}>
                {clinic.clinicName}
              </option>
            ))}
          </select>
          {clinicsLoading && (
            <p className="text-xs text-gray-400 mt-1">
              جاري تحميل قائمة العيادات...
            </p>
          )}
        </div>

        {/* صورة الطبيب */}
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            صورة الطبيب
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-dark"
          />
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="معاينة الصورة"
                className="h-24 w-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-6">
        <button
          type="submit"
          disabled={loading || clinicsLoading}
          className="btn-dark mt-4 py-2 px-3.5 bg-[#284cff] cursor-pointer rounded-2xl mx-auto disabled:opacity-50"
        >
          {loading ? "جاري الإضافة..." : "إضافة الدكتور"}
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
