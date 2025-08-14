"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import SideBar from "./SideBar";
import Personal from "./Personal";
import { useAuth } from "../AuthService";

const PaitentDash = () => {
  const router = useRouter();
  const { isAllowed } = useAuth();
  if (!isAllowed(["Reception", "Nurse"])) {
    router.push("/");
  }
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "personal";
  return (
    <main className="w-full flex flex-row">
      <SideBar />
      <Personal />
      {/* {tab === "personal" && <Personal />} */}
    </main>
  );
};

export default PaitentDash;
