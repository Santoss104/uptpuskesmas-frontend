import React from "react";
import styles from "../styles/login.module.css";
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className={styles.bg}>
      <form className={styles.form}>
        <div className={styles.logoSection}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <div>
            <h2 className={styles.title}>
              SISTEM INFORMASI<br />DAFTAR NAMA PASIEN
            </h2>
            <p className={styles.subtitle}>PUSKESMAS PANDAU JAYA</p>
          </div>
        </div>

        <label className={styles.label}>Nama Lengkap</label>
        <input type="text" placeholder="Masukkan nama lengkap" className={styles.input} />

        <label className={styles.label}>Email</label>
        <input type="email" placeholder="Masukkan email" className={styles.input} />

        <label className={styles.label}>Password</label>
        <input type="password" placeholder="Masukkan password" className={styles.input} />

        <button className={styles.button}>SIGN UP</button>

        <p className={styles.switchText}>
          Sudah punya akun? <Link href="/login"><strong>SIGN IN</strong></Link>
        </p>
      </form>
    </div>
  );
}