"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import SideBar from "./SideBar";
import Booking from "./Booking";
import Personal from "./Personal";

const PaitentDash = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "personal";
  return (
    <main className="w-full flex flex-row">
      <SideBar />
      {tab === "booking" ? <Booking /> : <Personal />}
      {/* {tab === "personal" && <Personal />} */}
    </main>
  );
};

export default PaitentDash;
