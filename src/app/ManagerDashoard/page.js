"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import SideBar from "./SideBarMang";
import Booking from "./BookingMang";
import DoctorsMang from "./DoctorsMang";
import NursingMang from "./NursingMang";
import DoctorForm from "./AddDoctors";
import NurseForm from "./AddNurse";
import SalaryPage from "./SalarysPage";
import PatientManagement from "./PatientMang";
import ReceptionForm from "./AddReception";
import ReceptionManagement from "./ReceptionList";
import ClinicsManagement from "./ClinicsMang";
import RoomsManagement from "./RoomsMang";
import HRManagement from "./HrMang";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthService";

const PaitentDash = () => {
  const router = useRouter();
  const { isAllowed } = useAuth();
  if (!isAllowed(["HR", "Admin"])) {
    router.push("/");
  }
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "doctors";
  return (
    <main className="w-full flex flex-row">
      <SideBar />
      {tab === "booking" ? <Booking /> : null}
      {tab === "nursing" ? <NursingMang /> : null}
      {tab === "Reception" ? <ReceptionManagement /> : null}
      {tab === "doctors" ? <DoctorsMang /> : null}
      {tab === "add doctor" ? <DoctorForm /> : null}
      {tab === "add nurse" ? <NurseForm /> : null}
      {tab === "add Reception" ? <ReceptionForm /> : null}
      {tab === "add Hr" ? <HRManagement /> : null}
      {tab === "salarys" ? <SalaryPage /> : null}
      {tab === "add salarys" ? <SalaryPage /> : null}
      {tab === "Patients" ? <PatientManagement /> : null}
      {tab === "Clincs" ? <ClinicsManagement /> : null}
      {tab === "Rooms" ? <RoomsManagement /> : null}

      {/* {tab === "personal" && <Personal />} */}
    </main>
  );
};

export default PaitentDash;
