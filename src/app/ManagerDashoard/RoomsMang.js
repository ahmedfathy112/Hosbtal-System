"use client";
import { useState, useEffect } from "react";
import {
  fetchAllRooms,
  deleteRoom,
  addNewRoom,
  fetchRoomById,
} from "@/app/ApiRequsets";

const RoomsManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomType: "",
    roomStatus: true,
    roomPrice: "",
    roomNum: "",
    roomFloor: "",
  });

  // جلب بيانات الغرف
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchAllRooms();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  // حذف غرفة
  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الغرفة؟")) {
      try {
        await deleteRoom(roomId);
        setRooms(rooms.filter((room) => room.roomId !== roomId));
        alert("تم حذف الغرفة بنجاح");
      } catch (err) {
        alert("فشل في حذف الغرفة: " + err.message);
      }
    }
  };

  // إضافة غرفة جديدة
  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const newRoom = await addNewRoom({
        ...formData,
        roomPrice: parseInt(formData.roomPrice),
        roomNum: parseInt(formData.roomNum),
        roomFloor: parseInt(formData.roomFloor),
      });
      setRooms([...rooms, newRoom]);
      setShowAddForm(false);
      setFormData({
        roomType: "",
        roomStatus: true,
        roomPrice: "",
        roomNum: "",
        roomFloor: "",
      });
      alert("تم إضافة الغرفة بنجاح");
    } catch (err) {
      alert("فشل في إضافة الغرفة: " + err.message);
    }
  };

  // عرض تفاصيل الغرفة
  const handleShowDetails = async (roomId) => {
    try {
      const roomDetails = await fetchRoomById(roomId);
      setSelectedRoom(roomDetails);
      setShowDetails(true);
    } catch (err) {
      alert("فشل في جلب تفاصيل الغرفة: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-900 text-gray-200 p-8 flex justify-center items-center">
        جاري تحميل بيانات الغرف...
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
          <h1 className="text-3xl font-bold text-white">إدارة الغرف</h1>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            إضافة غرفة جديدة
          </button>
        </div>

        {/* جدول الغرف */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-right text-gray-300">رقم الغرفة</th>
                  <th className="p-4 text-right text-gray-300">نوع الغرفة</th>
                  <th className="p-4 text-right text-gray-300">الطابق</th>
                  <th className="p-4 text-right text-gray-300">السعر</th>
                  <th className="p-4 text-right text-gray-300">الحالة</th>
                  <th className="p-4 text-right text-gray-300">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <tr
                      key={room.roomId}
                      className="border-t border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <td className="p-4">{room.roomNum}</td>
                      <td className="p-4 font-medium">{room.roomType}</td>
                      <td className="p-4">{room.roomFloor}</td>
                      <td className="p-4">
                        {room.roomPrice.toLocaleString()} ج.م
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            room.roomStatus
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {room.roomStatus ? "متاحة" : "غير متاحة"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => handleShowDetails(room.roomId)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                          >
                            التفاصيل
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room.roomId)}
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
                    <td colSpan="6" className="p-6 text-center text-gray-400">
                      لا توجد غرف مسجلة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* نموذج إضافة غرفة جديدة */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  إضافة غرفة جديدة
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddRoom}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      نوع الغرفة
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.roomType}
                      onChange={(e) =>
                        setFormData({ ...formData, roomType: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      رقم الغرفة
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.roomNum}
                      onChange={(e) =>
                        setFormData({ ...formData, roomNum: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">الطابق</label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.roomFloor}
                      onChange={(e) =>
                        setFormData({ ...formData, roomFloor: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">السعر</label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.roomPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, roomPrice: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        checked={formData.roomStatus}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            roomStatus: e.target.checked,
                          })
                        }
                      />
                      <span className="text-gray-300">
                        الحالة (متاحة/غير متاحة)
                      </span>
                    </label>
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
                    حفظ الغرفة
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* عرض تفاصيل الغرفة */}
        {showDetails && selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  تفاصيل الغرفة رقم {selectedRoom.roomNum}
                </h2>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedRoom(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">نوع الغرفة:</span>
                  <span className="font-medium">{selectedRoom.roomType}</span>
                </div>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">رقم الغرفة:</span>
                  <span className="font-medium">{selectedRoom.roomNum}</span>
                </div>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">الطابق:</span>
                  <span className="font-medium">{selectedRoom.roomFloor}</span>
                </div>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">السعر:</span>
                  <span className="font-medium">
                    {selectedRoom.roomPrice.toLocaleString()} ج.م
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">الحالة:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedRoom.roomStatus
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {selectedRoom.roomStatus ? "متاحة" : "غير متاحة"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedRoom(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
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

export default RoomsManagement;
