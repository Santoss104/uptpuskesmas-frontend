"use client";
import styles from "../styles/header.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Header() {
  const [showLogout, setShowLogout] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogout(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
      setShowLogout(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogout(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>🏥 Puskesmas Pandau Jaya</div>
      <div className={styles.userInfo}>
        <button
          className={styles.logoutButton}
          onClick={handleLogoutClick}
          title="Logout"
          disabled={isLoggingOut}
          style={{
            cursor: isLoggingOut ? "not-allowed" : "pointer",
            opacity: isLoggingOut ? 0.6 : 1,
          }}
        >
          <FaSignOutAlt />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>

      {/* Modal Konfirmasi Logout */}
      {showLogout && (
        <div className={styles.logoutModal}>
          <div className={styles.logoutContent}>
            <div className={styles.logoutText}>
              Apakah anda yakin ingin keluar?
            </div>
            <div className={styles.logoutButtons}>
              <button
                onClick={handleConfirmLogout}
                className={styles.confirmButton}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Keluar"}
              </button>
              <button
                onClick={handleCancelLogout}
                className={styles.cancelButton}
                disabled={isLoggingOut}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
