"use client";

import React from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi password match
    if (password !== confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    // Di sini Anda bisa menambahkan logika validasi registrasi
    if (email && password && confirmPassword) {
      console.log("Registrasi berhasil");
      router.push("/login");
    }
  };

  return (
    <div className={styles.bg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logoSection}>
          <Image
            src="/logo.png"
            alt="Logo"
            className={styles.logo}
            width={60}
            height={60}
          />
          <div>
            <h2 className={styles.title}>
              SISTEM INFORMASI
              <br />
              DAFTAR NAMA PASIEN
            </h2>
            <p className={styles.subtitle}>PUSKESMAS PANDAU JAYA</p>
          </div>
        </div>

        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Input email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Input password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className={styles.label}>Confirm Password</label>
        <input
          type="password"
          placeholder="Input password again"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          DAFTAR
        </button>

        <p className={styles.switchText}>
          Punya akun? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}