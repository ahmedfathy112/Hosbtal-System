"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import SideBar from "./SideBarMang";
import Booking from "./BookingMang";
import DoctorsMang from "./DoctorsMang";
import NursingMang from "./NursingMang";
import DoctorForm from "./AddDoctors";
import NurseForm from "./AddNurse";

const PaitentDash = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "doctors";
  return (
    <main className="w-full flex flex-row">
      <SideBar />
      {tab === "booking" ? <Booking /> : null}
      {tab === "nursing" ? <NursingMang /> : null}
      {tab === "doctors" ? <DoctorsMang /> : null}
      {tab === "add doctor" ? <DoctorForm /> : null}
      {tab === "add nurse" ? <NurseForm /> : null}
      {/* {tab === "personal" && <Personal />} */}
    </main>
  );
};

export default PaitentDash;
