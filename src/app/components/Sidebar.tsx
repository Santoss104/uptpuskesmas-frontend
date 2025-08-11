import styles from "../styles/sidebar.module.css";
import { FaUsers, FaPowerOff } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../utils/auth";
import LoadingSpinner from "./LoadingSpinner";

export default function Sidebar() {
  const [showLogout, setShowLogout] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

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

  const getUserDisplayName = () => {
    if (!user) return "User";

    const name =
      user.name || user.displayName || user.email?.split("@")[0] || "User";
    return name;
  };

  const getUserRole = () => {
    if (!user) return "USER";
    return user.role?.toUpperCase() || "USER";
  };

  return (
    <aside className={styles.sidebar}>
      {isLoggingOut && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner
            message="Logging out..."
            size="small"
            overlay={false}
          />
        </div>
      )}

      <div className={styles.profile}>
        <div className={styles.avatar}>
          {user?.avatar?.url ? (
            <Image
              src={user.avatar.url}
              alt="User Avatar"
              width={50}
              height={50}
              className={styles.avatarImage}
            />
          ) : (
            <span>👤</span>
          )}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{getUserDisplayName()}</span>
          <span className={styles.role}>{getUserRole()}</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={`${styles.navItem} ${
              pathname === "/dashboard" ? styles.active : ""
            }`}
          >
            <Link href="/dashboard" className={styles.navLink}>
              <HiViewGrid className={styles.navIcon} />
              Dashboard
            </Link>
          </li>
          <li
            className={`${styles.navItem} ${
              pathname === "/pasien" ? styles.active : ""
            }`}
          >
            <Link href="/pasien" className={styles.navLink}>
              <FaUsers className={styles.navIcon} />
              Pasien
            </Link>
          </li>
        </ul>
        <ul className={styles.navList} style={{ marginTop: 40 }}>
          <li className={styles.navItem}>
            <button
              onClick={handleLogoutClick}
              className={styles.navLink}
              disabled={isLoggingOut}
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: isLoggingOut ? "not-allowed" : "pointer",
                opacity: isLoggingOut ? 0.6 : 1,
              }}
            >
              <FaPowerOff className={styles.navIcon} />
              {isLoggingOut ? "Logging out..." : "Keluar"}
            </button>
          </li>
        </ul>
      </nav>

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
    </aside>
  );
}
