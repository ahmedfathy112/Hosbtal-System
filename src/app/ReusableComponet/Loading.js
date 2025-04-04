"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;
  return (
    <div className="w-full flex justify-center items-center h-dvh">
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
}
