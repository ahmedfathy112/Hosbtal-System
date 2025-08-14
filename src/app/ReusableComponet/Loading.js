// components/GlobalLoader.js
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== pathname) {
        NProgress.start();
        setLoading(true);
      }
    };

    const handleComplete = () => {
      NProgress.done();
      setLoading(false);
    };

    // التأكد من أن router.events موجود قبل الاشتراك
    if (router?.events) {
      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);
    }

    return () => {
      if (router?.events) {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      }
    };
  }, [pathname, router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-900/70">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}
