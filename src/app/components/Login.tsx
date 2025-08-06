"use client";

import React from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini Anda bisa menambahkan logika validasi login
    if (email && password) {
      router.push("/dashboard");
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

        <button type="submit" className={styles.button}>
          LOGIN
        </button>

        <p className={styles.switchText}>
          Belum punya akun? <Link href="/registrasi">Daftar</Link>
        </p>
      </form>
    </div>
  );
}