"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../../utils/auth";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const isAuthPage = pathname === "/login" || pathname === "/registrasi";

  console.log("🏗️ LayoutWrapper render:", {
    pathname,
    isAuthenticated,
    isLoading,
    isAuthPage,
    hasUser: !!user,
  });

  // Redirect logic
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isAuthPage) {
        console.log("🔒 Redirecting to login - not authenticated");
        router.replace("/login");
      } else if (isAuthenticated && isAuthPage) {
        console.log("✅ Redirecting to dashboard - already authenticated");
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, isAuthPage, router]);

  // Show loading state during auth check
  if (isLoading) {
    return <LoadingSpinner message="Memuat aplikasi..." />;
  }

  if (isAuthPage) {
    console.log("🚪 LayoutWrapper: Showing auth page layout");
    return <main>{children}</main>;
  }

  // If not authenticated and not on auth page, show loading while redirecting
  if (!isAuthenticated) {
    return <LoadingSpinner message="Mengarahkan ke halaman login..." />;
  }

  console.log("🏠 LayoutWrapper: Showing authenticated layout with sidebar");
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
