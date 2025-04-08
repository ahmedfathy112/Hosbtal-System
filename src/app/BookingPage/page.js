"use client";
import Head from "next/head";
import { useState } from "react";

export default function AppointmentDate() {
  const [selectedClinic, setSelectedClinic] = useState("");

  const doctorsByClinic = {
    clinic1: [
      { value: "doctor1", label: "د.أحمد (Cardiology)" },
      { value: "doctor2", label: "د.إبراهيم (Pediatrics)" },
    ],
    clinic2: [
      { value: "doctor3", label: "د.مازن (Neurology)" },
      { value: "doctor1", label: "د.أحمد (Cardiology)" },
    ],
    clinic3: [
      { value: "doctor2", label: "د.إبراهيم (Pediatrics)" },
      { value: "doctor3", label: "د.مازن (Neurology)" },
    ],
  };

  const handleClinicChange = (e) => {
    setSelectedClinic(e.target.value);
  };
  return (
    <div>
      <Head>
        <title>حجز العيادات</title>
        <meta name="description" content="Book your clinic appointment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">
            أحجز كشفك الأن
          </h1>
          <form className="space-y-4">
            {/* Patient Name */}
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-gray-300"
              >
                أسم المريض
              </label>
              <input
                type="text"
                id="patientName"
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                placeholder="أدخل أسمك هنا"
                required
              />
            </div>

            {/* Clinic Selection */}
            <div>
              <label
                htmlFor="clinic"
                className="block text-sm font-medium text-gray-300"
              >
                العيادة
              </label>
              <select
                id="clinic"
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                value={selectedClinic}
                onChange={handleClinicChange}
                required
              >
                <option value="" className="text-gray-400">
                  أختر العياده
                </option>
                <option value="clinic1">عيادة 1</option>
                <option value="clinic2">عيادة 2</option>
                <option value="clinic3">عيادة 3</option>
              </select>
            </div>

            {/* Doctor Selection */}
            <div>
              <label
                htmlFor="doctor"
                className="block text-sm font-medium text-gray-300"
              >
                الدكتور
              </label>
              <select
                id="doctor"
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 disabled:opacity-50"
                disabled={!selectedClinic} // تعطيل الحقل إذا لم يتم اختيار عيادة
                required
              >
                <option value="" className="text-gray-400">
                  اختر الدكتور
                </option>
                {selectedClinic &&
                  doctorsByClinic[selectedClinic]?.map((doctor) => (
                    <option key={doctor.value} value={doctor.value}>
                      {doctor.label}
                    </option>
                  ))}
              </select>
            </div>
            {/* Appointment Date */}
            <div>
              <label
                htmlFor="appointmentDate"
                className="block text-sm font-medium text-gray-300"
              >
                موعد الكشف
              </label>
              <input
                type="date"
                id="appointmentDate"
                className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
            >
              أحجز الكشف
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
