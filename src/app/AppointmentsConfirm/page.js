"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  fetchAppointments,
  fetchUserById,
  fetchClinicById,
  updateAppointmentStatus,
  deleteAppointment,
} from "@/app/ApiRequsets";
import dayjs from "dayjs";
import { useAuth } from "../AuthService";
import { useRouter } from "next/navigation";

// Reception page for managing appointments - allows confirming, canceling and deleting appointments
// Displays all appointments with patient, doctor, clinic details and status

export default function Reception() {
  const router = useRouter();
  const { isAllowed } = useAuth();
  if (!isAllowed(["Reception"])) {
    router.push("/");
  }
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});
  const [doctorDetails, setDoctorDetails] = useState({});
  const [clinicDetails, setClinicDetails] = useState({});

  // جلب جميع الحجوزات
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // جلب تفاصيل المرضى والأطباء والعيادات
  useEffect(() => {
    const loadDetails = async () => {
      const uniquePatientIds = [
        ...new Set(appointments.map((a) => a.patientId)),
      ];
      const uniqueDoctorIds = [...new Set(appointments.map((a) => a.doctorId))];
      const uniqueClinicIds = [...new Set(appointments.map((a) => a.clinicId))];

      try {
        // جلب بيانات المرضى
        const patients = await Promise.all(
          uniquePatientIds.map((id) => fetchUserById(id))
        );
        const patientsMap = patients.reduce((acc, patient) => {
          acc[patient.id] = patient;
          return acc;
        }, {});

        // جلب بيانات الأطباء
        const doctors = await Promise.all(
          uniqueDoctorIds.map((id) => fetchUserById(id))
        );
        const doctorsMap = doctors.reduce((acc, doctor) => {
          acc[doctor.id] = doctor;
          return acc;
        }, {});

        // جلب بيانات العيادات
        const clinics = await Promise.all(
          uniqueClinicIds.map((id) => fetchClinicById(id))
        );
        const clinicsMap = clinics.reduce((acc, clinic) => {
          acc[clinic.id] = clinic;
          return acc;
        }, {});

        setPatientDetails(patientsMap);
        setDoctorDetails(doctorsMap);
        setClinicDetails(clinicsMap);
      } catch (err) {
        console.error("Failed to fetch details:", err);
      }
    };

    if (appointments.length > 0) {
      loadDetails();
    }
  }, [appointments]);

  // فلترة المواعيد
  const filteredAppointments = appointments.filter((appointment) => {
    const patient = patientDetails[appointment.patientId] || {};
    const matchesSearch =
      appointment.appointmentId.toString().includes(searchQuery) ||
      patient.fullname?.includes(searchQuery);
    const matchesClinic =
      selectedClinic === "" ||
      clinicDetails[appointment.clinicId]?.name === selectedClinic;
    return matchesSearch && matchesClinic;
  });

  // تأكيد الحجز
  const confirmAppointment = async (id) => {
    try {
      const result = await Swal.fire({
        title: "تأكيد الكشف",
        text: "هل أنت متأكد من تأكيد هذا الكشف؟",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "نعم، تأكيد",
        cancelButtonText: "إلغاء",
        customClass: {
          popup: "bg-gray-800 text-gray-200",
          confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg mr-2",
          cancelButton: "bg-gray-600 text-white px-4 py-2 rounded-lg",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        await updateAppointmentStatus(id, true);

        setAppointments((prev) =>
          prev.map((app) =>
            app.appointmentId === id ? { ...app, status: true } : app
          )
        );

        Swal.fire({
          title: "تم التأكيد",
          text: "تم تأكيد الكشف بنجاح!",
          icon: "success",
          customClass: {
            popup: "bg-gray-800 text-gray-200",
            confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
          },
          buttonsStyling: false,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "خطأ",
        text: "فشل في تأكيد الحجز",
        icon: "error",
        customClass: {
          popup: "bg-gray-800 text-gray-200",
          confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
        },
        buttonsStyling: false,
      });
    }
  };

  // إلغاء تأكيد الحجز
  const cancelConfirmation = async (id) => {
    try {
      const result = await Swal.fire({
        title: "إلغاء التأكيد",
        text: "هل أنت متأكد من إلغاء تأكيد هذا الكشف؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، إلغاء",
        cancelButtonText: "تراجع",
        customClass: {
          popup: "bg-gray-800 text-gray-200",
          confirmButton: "bg-red-600 text-white px-4 py-2 rounded-lg mr-2",
          cancelButton: "bg-gray-600 text-white px-4 py-2 rounded-lg",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        await updateAppointmentStatus(id, false);

        setAppointments((prev) =>
          prev.map((app) =>
            app.appointmentId === id ? { ...app, status: false } : app
          )
        );

        Swal.fire({
          title: "تم الإلغاء",
          text: "تم إلغاء تأكيد الكشف بنجاح!",
          icon: "info",
          customClass: {
            popup: "bg-gray-800 text-gray-200",
            confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
          },
          buttonsStyling: false,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "خطأ",
        text: "فشل في إلغاء تأكيد الحجز",
        icon: "error",
        customClass: {
          popup: "bg-gray-800 text-gray-200",
          confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
        },
        buttonsStyling: false,
      });
    }
  };

  // حذف الحجز
  const handleDeleteAppointment = async (id) => {
    try {
      const result = await Swal.fire({
        title: "حذف الحجز",
        text: "هل أنت متأكد من حذف هذا الحجز؟ لا يمكن التراجع عن هذه العملية",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، احذف",
        cancelButtonText: "تراجع",
        customClass: {
          popup: "bg-gray-800 text-gray-200",
          confirmButton: "bg-red-600 text-white px-4 py-2 rounded-lg mr-2",
          cancelButton: "bg-gray-600 text-white px-4 py-2 rounded-lg",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        await deleteAppointment(id);

        setAppointments((prev) =>
          prev.filter((app) => app.appointmentId !== id)
        );

        Swal.fire({
          title: "تم الحذف",
          text: "تم حذف الحجز بنجاح!",
          icon: "success",
          customClass: {
            popup: "bg-gray-800 text-gray-200",
            confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
          },
          buttonsStyling: false,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "خطأ",
        text: "فشل في حذف الحجز",
        icon: "error",
        customClass: {
          popup: "bg-gray-800 text-gray-200",
          confirmButton: "bg-indigo-600 text-white px-4 py-2 rounded-lg",
        },
        buttonsStyling: false,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center">
        <div className="text-gray-300">جاري تحميل البيانات...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
        إدارة الكشوفات - الاستقبال
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Section */}
        <input
          type="text"
          placeholder="ابحث باستخدام المعرف أو اسم المريض"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
        />

        {/* Filter Section */}
        <select
          value={selectedClinic}
          onChange={(e) => setSelectedClinic(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
        >
          <option value="">جميع العيادات</option>
          {Object.values(clinicDetails).map((clinic) => (
            <option key={clinic.id} value={clinic.name}>
              {clinic.name}
            </option>
          ))}
        </select>
      </div>

      {/* Appointments Details */}
      <div className="overflow-x-auto invotryPage">
        <table className="w-full text-right border-collapse bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-4">معرف الكشف</th>
              <th className="p-4">اسم المريض</th>
              <th className="p-4">العيادة</th>
              <th className="p-4">الطبيب</th>
              <th className="p-4">تاريخ الموعد</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => {
                const patient = patientDetails[appointment.patientId] || {};
                const doctor = doctorDetails[appointment.doctorId] || {};
                const clinic = clinicDetails[appointment.clinicId] || {};

                return (
                  <tr
                    key={appointment.appointmentId}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="p-4">{appointment.appointmentId}</td>
                    <td className="p-4">
                      {patient.fullname || "جاري التحميل..."}
                    </td>
                    <td className="p-4">{clinic.name || "جاري التحميل..."}</td>
                    <td className="p-4">
                      {doctor.fullname || "جاري التحميل..."}
                    </td>
                    <td className="p-4">
                      {dayjs(appointment.appointmentDate).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={
                          appointment.status
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {appointment.status ? "مؤكد" : "غير مؤكد"}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      {!appointment.status ? (
                        <button
                          onClick={() =>
                            confirmAppointment(appointment.appointmentId)
                          }
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                        >
                          تأكيد
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            cancelConfirmation(appointment.appointmentId)
                          }
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200"
                        >
                          إلغاء التأكيد
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleDeleteAppointment(appointment.appointmentId)
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  لا توجد كشوفات مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
