"use client";

import styles from "../styles/header.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout API fails, redirect to login
      router.push("/login");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>🏥 Puskesmas Pandau Jaya</div>
      <div className={styles.userInfo}>
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          title="Logout"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
