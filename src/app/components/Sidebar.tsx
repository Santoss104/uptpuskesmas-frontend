import styles from '../styles/sidebar.module.css';
import { FaCalendarAlt, FaUsers, FaCog, FaPowerOff } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <span>👤</span>
        </div>
        <span className={styles.role}>ADMIN</span>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${styles.active}`}>
            <Link href="/"><FaCalendarAlt /> Dashboard</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/pasien"><FaUsers /> Pasien</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/pengaturan"><FaCog /> Pengaturan</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/keluar"><FaPowerOff /> Keluar</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}