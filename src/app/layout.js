import { Geist, Geist_Mono } from "next/font/google";
import LoadingComponent from "@/app/ReusableComponet/Loading";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "مستشفي أهل الخير",
  description:
    "منصة متكامله يمكنك من خلالها إداره كل أحوار المستشفي والمريضين والطاقم الطبي وطاقم التمريض والعمال ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
      </body>
    </html>
  );
}
