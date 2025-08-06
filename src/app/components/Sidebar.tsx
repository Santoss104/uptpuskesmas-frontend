
import styles from '../styles/sidebar.module.css';
import { FaUsers, FaPowerOff } from 'react-icons/fa';
import { HiViewGrid } from 'react-icons/hi';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function Sidebar() {
  const [showLogout, setShowLogout] = React.useState(false);
  const pathname = usePathname();
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogout(true);
  };
  const handleConfirmLogout = () => {
    window.location.href = '/login';
  };
  const handleCancelLogout = () => {
    setShowLogout(false);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <span>👤</span>
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Sarah Smith</span>
          <span className={styles.role}>ADMIN</span>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
            <Link href="/dashboard" className={styles.navLink}>
              <HiViewGrid className={styles.navIcon} />
              Dashboard
            </Link>
          </li>
          <li className={`${styles.navItem} ${pathname === '/pasien' ? styles.active : ''}`}>
            <Link href="/pasien" className={styles.navLink}>
              <FaUsers className={styles.navIcon} />
              Pasien
            </Link>
          </li>
        </ul>
        <ul className={styles.navList} style={{ marginTop: 40 }}>
          <li className={styles.navItem}>
            <a href="#" onClick={handleLogoutClick} className={styles.navLink}>
              <FaPowerOff className={styles.navIcon} />
              Keluar
            </a>
          </li>
        </ul>
      </nav>
      {showLogout && (
        <div className={styles.logoutModal}>
          <div className={styles.logoutContent}>
            <div className={styles.logoutText}>Apakah anda yakin ingin keluar?</div>
            <div className={styles.logoutButtons}>
              <button onClick={handleConfirmLogout} className={styles.confirmButton}>
                Keluar
              </button>
              <button onClick={handleCancelLogout} className={styles.cancelButton}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}