"use client";
import { useState, useEffect } from "react";
import {
  fetchAllClinics,
  deleteClinic,
  addNewClinic,
  addAvailableDays,
  getClinicDetails,
  getAvailableDaysForClinic,
} from "@/app/ApiRequsets";

const ClinicsManagement = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDaysForm, setShowDaysForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [clinicDetails, setClinicDetails] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [formData, setFormData] = useState({
    clinicName: "",
    clinicNum: "",
    doctorslist: "",
  });
  const [daysData, setDaysData] = useState({
    dayOfWeek: "0",
    startTime: "08:00",
    endTime: "16:00",
  });

  // جلب بيانات العيادات
  useEffect(() => {
    const loadClinics = async () => {
      try {
        const data = await fetchAllClinics();
        setClinics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadClinics();
  }, []);

  // حذف عيادة
  const handleDeleteClinic = async (clinicId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه العيادة؟")) {
      try {
        await deleteClinic(clinicId);
        setClinics(clinics.filter((clinic) => clinic.clinicId !== clinicId));
        alert("تم حذف العيادة بنجاح");
      } catch (err) {
        alert("فشل في حذف العيادة: " + err.message);
      }
    }
  };

  // إضافة عيادة جديدة
  const handleAddClinic = async (e) => {
    e.preventDefault();
    try {
      const newClinic = await addNewClinic(formData);
      setClinics([...clinics, newClinic]);
      setShowAddForm(false);
      setFormData({ clinicName: "", clinicNum: "", doctorslist: "" });
      alert("تم إضافة العيادة بنجاح");
    } catch (err) {
      alert("فشل في إضافة العيادة: " + err.message);
    }
  };
  // اضافه ايام للعياده
  const handleAddDays = async (e) => {
    e.preventDefault();
    try {
      const dayData = {
        clinicId: selectedClinic.clinicId,
        dayOfWeek: parseInt(daysData.dayOfWeek),
        startTime: daysData.startTime + ":00",
        endTime: daysData.endTime + ":00",
      };

      await addAvailableDays(dayData);
      alert("تمت إضافة اليوم بنجاح");
      setShowDaysForm(false);
      setDaysData({
        dayOfWeek: "0",
        startTime: "08:00",
        endTime: "16:00",
      });
    } catch (err) {
      alert("فشل في إضافة اليوم: " + err.message);
    }
  };

  // جلب تفاصيل العيادة والأيام المتاحة
  const fetchClinicDetails = async (clinicId) => {
    try {
      setLoading(true);
      const details = await getClinicDetails(clinicId);
      const days = await getAvailableDaysForClinic(clinicId);
      setClinicDetails(details);
      setAvailableDays(days);
      setShowDetailsModal(true);
    } catch (err) {
      alert("فشل في جلب التفاصيل: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // دالة مساعدة لتحويل رقم اليوم إلى اسمه
  const getDayName = (dayOfWeek) => {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    return days[dayOfWeek] || dayOfWeek;
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-900 text-gray-200 p-8 flex justify-center items-center">
        جاري تحميل بيانات العيادات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-900 text-red-500 p-8 flex justify-center items-center">
        حدث خطأ: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* العنوان وشريط التحكم */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">إدارة العيادات</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            إضافة عيادة جديدة
          </button>
        </div>

        {/* جدول العيادات */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-right text-gray-300">رقم العيادة</th>
                  <th className="p-4 text-right text-gray-300">اسم العيادة</th>
                  <th className="p-4 text-right text-gray-300">الأطباء</th>
                  <th className="p-4 text-right text-gray-300">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {clinics.length > 0 ? (
                  clinics.map((clinic) => (
                    <tr
                      key={clinic.clinicId}
                      className="border-t border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <td className="p-4">{clinic.clinicNum}</td>
                      <td className="p-4 font-medium">{clinic.clinicName}</td>
                      <td className="p-4 text-gray-400">
                        {clinic.doctorslist || "لا يوجد أطباء"}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => fetchClinicDetails(clinic.clinicId)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                          >
                            التفاصيل
                          </button>
                          <button
                            onClick={() => {
                              setSelectedClinic(clinic);
                              setShowDaysForm(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                          >
                            إضافة يوم
                          </button>
                          <button
                            onClick={() => handleDeleteClinic(clinic.clinicId)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-400">
                      لا توجد عيادات مسجلة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* نموذج إضافة عيادة جديدة */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  إضافة عيادة جديدة
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddClinic}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      اسم العيادة
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.clinicName}
                      onChange={(e) =>
                        setFormData({ ...formData, clinicName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      رقم العيادة
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.clinicNum}
                      onChange={(e) =>
                        setFormData({ ...formData, clinicNum: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">
                      قائمة الأطباء (اختياري)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.doctorslist}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          doctorslist: e.target.value,
                        })
                      }
                      placeholder="افصل بين أسماء الأطباء بفاصلة"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 text-gray-300 hover:text-white"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    حفظ العيادة
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* نموذج إضافة أيام متاحة */}
        {showDaysForm && selectedClinic && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  إضافة يوم متاح لـ {selectedClinic.clinicName}
                </h2>
                <button
                  onClick={() => {
                    setShowDaysForm(false);
                    setSelectedClinic(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddDays}>
                <div className="mb-6">
                  <label className="block text-gray-300 mb-3">اليوم:</label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={daysData.dayOfWeek}
                    onChange={(e) =>
                      setDaysData({ ...daysData, dayOfWeek: e.target.value })
                    }
                    required
                  >
                    <option value="0">الأحد</option>
                    <option value="1">الإثنين</option>
                    <option value="2">الثلاثاء</option>
                    <option value="3">الأربعاء</option>
                    <option value="4">الخميس</option>
                    <option value="5">الجمعة</option>
                    <option value="6">السبت</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-3">
                      وقت البدء:
                    </label>
                    <input
                      type="time"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={daysData.startTime}
                      onChange={(e) =>
                        setDaysData({ ...daysData, startTime: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-3">
                      وقت الانتهاء:
                    </label>
                    <input
                      type="time"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={daysData.endTime}
                      onChange={(e) =>
                        setDaysData({ ...daysData, endTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDaysForm(false);
                      setSelectedClinic(null);
                    }}
                    className="px-6 py-2 text-gray-300 hover:text-white"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    حفظ اليوم
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* نافذة عرض التفاصيل */}
        {showDetailsModal && clinicDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  تفاصيل العيادة: {clinicDetails.clinicName}
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    المعلومات الأساسية
                  </h3>
                  <p>
                    <span className="text-gray-400">رقم العيادة:</span>{" "}
                    {clinicDetails.clinicNum}
                  </p>
                  <p>
                    <span className="text-gray-400">قائمة الأطباء:</span>{" "}
                    {clinicDetails.doctorslist || "لا يوجد"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">الأيام المتاحة</h3>
                  {availableDays.length > 0 ? (
                    <ul className="space-y-2">
                      {availableDays.map((day, index) => (
                        <li key={index} className="bg-gray-700 p-3 rounded-lg">
                          <p>
                            <span className="text-gray-400">اليوم:</span>{" "}
                            {getDayName(day.dayOfWeek)}
                          </p>
                          <p>
                            <span className="text-gray-400">الوقت:</span> من{" "}
                            {day.startTime} إلى {day.endTime}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">لا توجد أيام متاحة</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicsManagement;
