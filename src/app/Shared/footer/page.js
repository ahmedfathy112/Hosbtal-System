import Link from "next/link";
import React from "react";
import {
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const departments = [
    {
      id: "cardiology",
    },
  ];
  return (
    <footer className="bg-gradient-to-r from-[#0a0a0aa4] to-[#2b2b2b59] text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* الشعار والأقسام الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* معلومات المستشفى */}
          <div className="space-y-4">
            <div className="flex items-center">
              <FaHospital className="text-3xl text-white mr-2" />
              <h3 className="text-2xl font-bold">مستشفى أهل الخير</h3>
            </div>
            <p className="text-gray-300">
              نقدم رعاية طبية متميزة منذ عام 1985، نسعى دائمًا لتحقيق أعلى
              معايير الجودة والسلامة.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300 transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-b pb-2 border-blue-700">
              روابط سريعة
            </h4>
            <ul className="space-y-2">
              {/* home */}
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition"
                >
                  الرئيسية
                </Link>
              </li>
              {/* paitent dashboard */}
              <li>
                <Link
                  href="/PatiantDashboard"
                  className="text-gray-300 hover:text-white transition"
                >
                  لوحة تحكم المريض
                </Link>
              </li>
              {/* Appointment page */}
              <li>
                <Link
                  href="/BookingPage"
                  className="text-gray-300 hover:text-white transition"
                >
                  حجز الكشوفات
                </Link>
              </li>
              {/* الاداري */}
              <li>
                <Link
                  href="/ManagerDashoard"
                  className="text-gray-300 hover:text-white transition"
                >
                  لوحة الاداري
                </Link>
              </li>
              {/* الطبيب */}
              <li>
                <Link
                  href="/DoctorDachboard"
                  className="text-gray-300 hover:text-white transition"
                >
                  لوحة الطبيب
                </Link>
              </li>
              {/* الصيدلية */}
              <li>
                <Link
                  href="/Subliments"
                  className="text-gray-300 hover:text-white transition"
                >
                  الصيدلية
                </Link>
              </li>
              {/* تأكيد الكشوفات */}
              <li>
                <Link
                  href="/AppointmentsConfirm"
                  className="text-gray-300 hover:text-white transition"
                >
                  تأكيد الكشوفات
                </Link>
              </li>
            </ul>
          </div>

          {/* الأقسام الطبية */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-b pb-2 border-blue-700">
              الأقسام الطبية
            </h4>
            <ul className="space-y-2">
              {/* emerngacy */}
              <li>
                <Link
                  href={`/DepartmentPage/emergency`}
                  className="text-gray-300 hover:text-white transition"
                >
                  قسم الطوارئ
                </Link>
              </li>
              {/* cardiology */}
              <li>
                <Link
                  href={`/DepartmentPage/cardiology`}
                  className="text-gray-300 hover:text-white transition"
                >
                  قسم القلب
                </Link>
              </li>
              {/* Dentist */}
              <li>
                <Link
                  href={`/DepartmentPage/dentistry`}
                  className="text-gray-300 hover:text-white transition"
                >
                  قسم الأسنان
                </Link>
              </li>
              {/* surgury */}
              <li>
                <Link
                  href={`/DepartmentPage/surgery`}
                  className="text-gray-300 hover:text-white transition"
                >
                  قسم الجراحة
                </Link>
              </li>
              {/* childrens */}
              <li>
                <Link
                  href={`/DepartmentPage/pediatrics`}
                  className="text-gray-300 hover:text-white transition"
                >
                  قسم الأطفال
                </Link>
              </li>
              {/* Eyes */}
              <li>
                <Link
                  href={`/DepartmentPage/ophthalmology`}
                  className="text-gray-300 hover:text-white transition"
                >
                  قسم العيون
                </Link>
              </li>
              {/* Women */}
              <li>
                <Link
                  href={`/DepartmentPage/gynecology`}
                  className="text-gray-300 hover:text-white transition"
                >
                  قسم النساء والتوليد
                </Link>
              </li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-b pb-2 border-blue-700">
              معلومات الاتصال
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-blue-300" />
                <span>
                  شارع جامعه الدول العربيه - المتفرع من شارع جامعه الدول العربيه
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-300" />
                <span>+201060733679</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2 text-blue-300" />
                <span>info@ahlalkhair-hospital.com</span>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 text-blue-300" />
                <span>24/7 خدمة الطوارئ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} مستشفى أهل الخير. جميع الحقوق
              محفوظة.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              شروط الاستخدام
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              خريطة الموقع
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
