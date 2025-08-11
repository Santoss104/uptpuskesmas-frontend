"use client";
import React from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../utils/auth";

export default function SignUp() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("🔍 Registration form submitted:", {
      email,
      passwordLength: password.length,
      confirmPasswordLength: confirmPassword.length,
      passwordsMatch: password === confirmPassword,
    });

    if (!email || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    // Updated password validation for production requirements
    if (password.length < 8) {
      setError("Password harus minimal 8 karakter");
      return;
    }

    // Check password complexity for production
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+\-_=])[A-Za-z\d@$!%*?&#+\-_=]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password harus mengandung minimal: 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter khusus (@$!%*?&#+\-_=)"
      );
      return;
    }

    try {
      console.log("🚀 Starting registration process...");
      await register({ email, password, confirmPassword });
      console.log("✅ Registration successful, redirecting to login...");
      router.push(
        "/login?message=Registrasi berhasil! Silakan login dengan akun yang baru dibuat."
      );
    } catch (error) {
      console.error("❌ Registration failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registrasi gagal. Silakan coba lagi.";
      setError(errorMessage);
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
          disabled={isLoading}
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Min 8 karakter: huruf besar, kecil, angka, simbol (@$!%*?&#+\-_=)"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <label className={styles.label}>Confirm Password</label>
        <input
          type="password"
          placeholder="Ulangi password yang sama"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "LOADING..." : "DAFTAR"}
        </button>

        <p className={styles.switchText}>
          Punya akun? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
