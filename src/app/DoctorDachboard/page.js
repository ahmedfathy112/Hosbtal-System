"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import SideBar from "./SideBarDoc";
import Personal from "./PersonalDoc";
import Booking from "./BookingDoc";

const DoctorDachboard = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "personalDoc";
  return (
    <main className="w-full flex flex-row">
      <SideBar />
      {tab === "bookingDoc" ? <Booking /> : <Personal />}
    </main>
  );
};

export default DoctorDachboard;
