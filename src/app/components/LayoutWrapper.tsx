"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/registrasi';   
  if (isAuthPage) {
    return <main>{children}</main>; // Tanpa Sidebar & Header
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "32px 0 32px 32px",
          maxWidth: "100vw",
        }}
      >
        <Header />
        {children}
      </main>
    </div>
  );
}
