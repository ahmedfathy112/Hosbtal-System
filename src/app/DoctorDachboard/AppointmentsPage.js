"use client";
import { useState, useEffect } from "react";

import Pagination from "../Subliments/Pagination";
import AppointmentsTable from "./BookingDoc";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // بيانات وهمية للمواعيد
  useEffect(() => {
    const mockAppointments = [
      {
        id: 1,
        patientName: "أحمد محمد",
        doctor: "د. سارة عبدالله",
        date: "2025-05-10",
        time: "10:00 ص",
        status: "مؤكد",
      },
      {
        id: 2,
        patientName: "نورا علي",
        doctor: "د. خالد أحمد",
        date: "2025-05-11",
        time: "02:30 م",
        status: "قيد الانتظار",
      },
    ];
    setAppointments(mockAppointments);
  }, []);

  // فلترة المواعيد حسب البحث
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ترقيم الصفحات
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <AppointmentsTable
        appointments={paginatedAppointments}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
