"use client";
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

export default function InventoryTable({ items, searchTerm, onSearchChange }) {
  return (
    <>
      {/* here you can searh and find tools */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">الصيدلية</h1>
        {/* search here */}
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن دواء أو أداة..."
            className="w-full bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* the table of the tools */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden invotryPage">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4 text-right">الاسم</th>
                <th className="py-3 px-4 text-right">التاريخ</th>
                <th className="py-3 px-4 text-right">الكمية</th>
                <th className="py-3 px-4 text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-700 hover:bg-gray-750"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1 text-blue-400 hover:text-blue-300 cursor-pointer">
                          <FiEdit />
                        </button>
                        <button className="p-1 text-red-400 hover:text-red-300 cursor-pointer">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-400">
                    لا توجد عناصر متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* button to add tool or medicine */}
      <button className="mt-6 flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer">
        <FiPlus className="ml-2" />
        إضافة عنصر جديد
      </button>
    </>
  );
}
