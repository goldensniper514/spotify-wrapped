"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {showSidebar && <Sidebar />}
        <main className={showSidebar ? "sm:pl-[120px]" : ""}>{children}</main>
      </body>
    </html>
  );
}
