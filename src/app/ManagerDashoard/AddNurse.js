import React from "react";

const NurseForm = () => {
  return (
    <form className="bg-gray-800 shadow-md px-8 py-5 max-md:px-3.5 w-full text-white my-4 mx-4 rounded-3xl">
      <h2 className="text-xl font-bold mb-4">إضافة ممرض جديد</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            الاسم
          </label>
          <input
            type="text"
            placeholder="ادخل اسم الممرض"
            className="input-dark"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="input-dark"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            رقم الهاتف
          </label>
          <input type="text" placeholder="0123456789" className="input-dark" />
        </div>
        <div className="flex flex-col">
          <label className="mb-3 text-sm font-medium text-gray-300">
            القسم
          </label>
          <input
            type="text"
            placeholder="مثلاً: الطوارئ"
            className="input-dark"
          />
        </div>
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="btn-dark mt-4 py-2 px-3.5 bg-[#284cff] cursor-pointer rounded-2xl mx-auto"
        >
          إضافة الممرض
        </button>
      </div>
    </form>
  );
};

export default NurseForm;
