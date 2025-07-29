import styles from '../styles/header.module.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🏥 Puskesmas Pandau Jaya</div>
      <div className={styles.userIcon}><FaUserCircle size={32} /></div>
    </header>
  );
}