"use client";
import Loading from "@/app/ReusableComponet/Loading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaClinicMedical,
  FaProcedures,
  FaPhoneAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdEmail, MdOutlineMedicalServices } from "react-icons/md";

const DepartmentDetails = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const departmentsData = {
      cardiology: {
        id: "cardiology",
        name: "قسم القلب",
        description:
          "يهتم قسم القلب بتشخيص وعلاج أمراض القلب والأوعية الدموية. نقدم أحدث التقنيات في مجال قسطرة القلب والفحوصات الدقيقة.",
        image: "/cardio.png",
        services: [
          "قسطرة القلب التشخيصية والعلاجية",
          "فحص الإيكو",
          "اختبار الجهد",
          "زراعة منظم ضربات القلب",
        ],
        stats: {
          operations: "500+",
          successRate: "98%",
        },
      },

      emergency: {
        id: "emergency",
        name: "قسم الطوارئ",
        description:
          "يقدم قسم الطوارئ الرعاية الفورية للحالات الحرجة والإصابات. يعمل على مدار الساعة بفريق متخصص ومجهز بأحدث الأجهزة.",
        image: "/emerngcy.png",
        services: [
          "استقبال الحالات الحرجة",
          "عناية فورية بالحوادث",
          "مراقبة العلامات الحيوية",
          "إسعافات أولية متقدمة",
        ],
        stats: {
          operations: "3000+",
          successRate: "95%",
        },
      },
      surgery: {
        id: "surgery",
        name: "قسم الجراحة",
        description:
          "يضم قسم الجراحة نخبة من الجراحين المتخصصين في العمليات الكبرى والدقيقة، باستخدام أحدث التقنيات الجراحية.",
        image: "/surgery.png",
        services: [
          "العمليات العامة",
          "جراحات المناظير",
          "جراحات الطوارئ",
          "رعاية ما بعد الجراحة",
        ],
        stats: {
          operations: "1200+",
          successRate: "96%",
        },
      },
      pediatrics: {
        id: "pediatrics",
        name: "قسم الأطفال",
        description:
          "يوفر قسم الأطفال رعاية صحية شاملة للأطفال من حديثي الولادة وحتى سن البلوغ، بإشراف أطباء متخصصين.",
        image: "/pediatrics.png",
        services: [
          "رعاية الأطفال حديثي الولادة",
          "متابعة النمو والتطعيمات",
          "علاج أمراض الأطفال الشائعة",
          "استشارات نفسية للأطفال",
        ],
        stats: {
          operations: "800+",
          successRate: "99%",
        },
      },
      ophthalmology: {
        id: "ophthalmology",
        name: "قسم العيون",
        description:
          "يختص قسم العيون بتشخيص وعلاج أمراض العيون وجراحاتها باستخدام تقنيات الليزر والمعدات الدقيقة.",
        image: "/ophthalmology.png",
        services: [
          "فحص نظر شامل",
          "عمليات المياه البيضاء",
          "علاج تصحيح الإبصار",
          "تشخيص أمراض الشبكية",
        ],
        stats: {
          operations: "600+",
          successRate: "97%",
        },
      },
      dentistry: {
        id: "dentistry",
        name: "قسم الأسنان",
        description:
          "يوفر قسم الأسنان خدمات علاجية وتجميلية متكاملة باستخدام تقنيات متقدمة للحفاظ على صحة الفم.",
        image: "/dentistry.png",
        services: [
          "حشوات وعلاج العصب",
          "تنظيف وتجميل الأسنان",
          "تقويم الأسنان",
          "زراعة الأسنان",
        ],
        stats: {
          operations: "1500+",
          successRate: "98%",
        },
      },
      gynecology: {
        id: "gynecology",
        name: "قسم النساء والتوليد",
        description:
          "يهتم قسم النساء والتوليد برعاية المرأة خلال مراحل الحمل والولادة، وعلاج أمراض النساء المختلفة.",
        image: "/gynecology.png",
        services: [
          "متابعة الحمل والولادة",
          "الولادة الطبيعية والقيصرية",
          "علاج تأخر الإنجاب",
          "فحوصات دورية شاملة",
        ],
        stats: {
          operations: "1100+",
          successRate: "97%",
        },
      },
    };

    const doctorsData = {
      cardiology: [
        {
          id: 1,
          name: "د. أحمد محمد",
          specialty: "أمراض القلب",
          image: "/doctors/dr-ahmed.jpg",
          schedule: "الأحد - الخميس (8 ص - 4 م)",
          bio: "استشاري أمراض القلب مع 15 سنة خبرة في مجال قسطرة القلب التداخلية.",
        },
      ],
      emergency: [
        {
          id: 2,
          name: "د. فاطمة عبد الله",
          specialty: "طب الطوارئ",
          image: "/doctors/dr-fatma.jpg",
          schedule: "طوال أيام الأسبوع (24 ساعة)",
          bio: "أخصائية طب الطوارئ بخبرة واسعة في التعامل مع الحالات الحرجة والإصابات.",
        },
      ],
      surgery: [
        {
          id: 3,
          name: "د. خالد حسن",
          specialty: "جراحة عامة",
          image: "/doctors/dr-khaled.jpg",
          schedule: "الأحد - الخميس (10 ص - 5 م)",
          bio: "استشاري جراحة عامة بخبرة أكثر من 20 سنة في العمليات الجراحية الدقيقة.",
        },
      ],
      pediatrics: [
        {
          id: 4,
          name: "د. منى يوسف",
          specialty: "طب الأطفال",
          image: "/doctors/dr-mona.jpg",
          schedule: "السبت - الأربعاء (9 ص - 3 م)",
          bio: "أخصائية أطفال تهتم بصحة ونمو الطفل مع خبرة في أمراض الأطفال المزمنة.",
        },
      ],
      ophthalmology: [
        {
          id: 5,
          name: "د. ياسر عبد العال",
          specialty: "طب وجراحة العيون",
          image: "/doctors/dr-yasser.jpg",
          schedule: "الأحد - الخميس (1 م - 7 م)",
          bio: "استشاري عيون متخصص في جراحات الشبكية وتصحيح الإبصار.",
        },
      ],
      dentistry: [
        {
          id: 6,
          name: "د. شيماء علي",
          specialty: "طب وجراحة الفم والأسنان",
          image: "/doctors/dr-shaimaa.jpg",
          schedule: "السبت - الأربعاء (10 ص - 4 م)",
          bio: "طبيبة أسنان تقدم خدمات علاجية وتجميلية باستخدام أحدث التقنيات.",
        },
      ],
      gynecology: [
        {
          id: 7,
          name: "د. هدى إبراهيم",
          specialty: "النساء والتوليد",
          image: "/doctors/dr-hoda.jpg",
          schedule: "الأحد - الخميس (8 ص - 2 م)",
          bio: "استشارية توليد مع خبرة واسعة في متابعة الحمل والعمليات القيصرية.",
        },
      ],
    };

    setTimeout(() => {
      setDepartment(departmentsData[departmentId]);
      setDoctors(doctorsData[departmentId] || []);
      setLoading(false);
    }, 800);
  }, [departmentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl">
          <Loading />
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">القسم غير موجود</h2>
        <p className="mt-4">لا يوجد قسم بهذا المعرف</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-full  object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white">{department.name}</h1>
            <p className="text-xl text-gray-200 mt-2 max-w-2xl">
              {department.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Section Info */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">
              عن {department.name}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                {department.description} يوفر القسم أحدث التقنيات الطبية ويضم
                فريقًا من أفضل الأخصائيين في مجاله. نحرص على تقديم رعاية شاملة
                ومتابعة دقيقة لكل حالة على حدة.
              </p>

              {/* Department Statistics */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  إحصائيات القسم
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex items-center">
                      <FaProcedures className="text-blue-500 text-2xl mr-3" />
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          عدد العمليات
                        </p>
                        <p className="text-2xl font-bold dark:text-white">
                          {department.stats.operations}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex items-center">
                      <MdOutlineMedicalServices className="text-green-500 text-2xl mr-3" />
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          معدل النجاح
                        </p>
                        <p className="text-2xl font-bold dark:text-white">
                          {department.stats.successRate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                <FaClinicMedical className="mr-2 text-blue-500" />
                خدمات القسم
              </h3>
              <ul className="space-y-3">
                {department.services.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-full mr-3">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="dark:text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                  <FaPhoneAlt className="mr-2 text-blue-500" />
                  تواصل مع القسم
                </h3>
                <div className="space-y-3">
                  <p className="flex items-center dark:text-gray-300">
                    <MdEmail className="mr-2 text-blue-500" />
                    {departmentId}@ahlalkhair-hospital.com
                  </p>
                  <p className="flex items-center dark:text-gray-300">
                    <FaPhoneAlt className="mr-2 text-blue-500" />
                    011 234 5678
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Details Section */}
        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">
            فريق الأطباء
          </h2>

          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold dark:text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-500 dark:text-blue-400">
                      {doctor.specialty}
                    </p>

                    <div className="mt-4 flex items-center text-gray-600 dark:text-gray-300">
                      <FaCalendarAlt className="mr-2" />
                      <span>{doctor.schedule}</span>
                    </div>

                    <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-3">
                      {doctor.bio}
                    </p>

                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                        حجز موعد
                      </button>
                      <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg transition">
                        الملف الشخصي
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                لا يوجد أطباء متاحين حاليًا في هذا القسم
              </p>
            </div>
          )}
        </section> */}

        {/* FAQ Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">
            أسئلة شائعة
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "ما هي ساعات عمل القسم؟",
                answer:
                  "يعمل القسم من الأحد إلى الخميس من الساعة 8 صباحًا حتى 4 مساءً، مع توفر خدمة الطوارئ على مدار 24 ساعة.",
              },
              {
                question: "هل أحتاج إلى تحويل من طبيب للكشف في هذا القسم؟",
                answer:
                  "نعم، في معظم الحالات نحتاج إلى تحويل من طبيب عام أو أخصائي لتحديد أولوية الحالات.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <button className="flex justify-between items-center w-full text-left">
                  <h3 className="text-lg font-medium dark:text-white">
                    {faq.question}
                  </h3>
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DepartmentDetails;
