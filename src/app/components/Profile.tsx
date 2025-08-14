"use client";
import React, { useState } from "react";
import { useAuth } from "../../utils/auth";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import styles from "../styles/profile.module.css";

export default function Profile() {
  const { user, updateAvatar } = useAuth();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size should be less than 5MB", "error");
      return;
    }

    setIsUploadingAvatar(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64String = reader.result as string;
          await updateAvatar({ avatar: base64String });
          showToast("Avatar updated successfully", "success");
        } catch (error) {
          console.error("Error uploading avatar:", error);
          const errorMessage =
            error instanceof Error ? error.message : "Failed to upload avatar";
          showToast(errorMessage, "error");
        } finally {
          setIsUploadingAvatar(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      showToast("Failed to upload avatar", "error");
      setIsUploadingAvatar(false);
    }
  };

  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner message="Loading profile..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
      )}

      <div className={styles.wrapper}>
        {/* Unified Profile Card */}
        <div className={styles.profileCard}>
          {/* Header Section with Avatar and User Info */}
          <div className={styles.profileHeader}>
            {/* Avatar */}
            <div className={styles.avatarContainer}>
              {user.avatar?.url ? (
                <Image
                  src={user.avatar.url}
                  alt="Profile"
                  width={120}
                  height={120}
                  priority
                  className={styles.avatarImage}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>👤</div>
              )}

              {/* Avatar Upload Button */}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className={styles.avatarInput}
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className={styles.avatarUploadButton}
              >
                {isUploadingAvatar ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <FaEdit size={14} />
                )}
              </label>
            </div>

            {/* User Info */}
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>
                {user.name || user.displayName || "User"}
              </h1>
              <p className={styles.userEmail}>{user.email}</p>
              <div className={styles.userRole}>{user.role || "USER"}</div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Settings Section */}
          <div className={styles.settingsSection}>
            <h2 className={styles.settingsTitle}>Account Settings</h2>

            <div className={styles.settingsContainer}>
              {/* Email Setting */}
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>Email Address</div>
                  <div className={styles.settingValue}>{user.email}</div>
                </div>
                <button
                  onClick={() =>
                    showToast("Email update feature coming soon", "error")
                  }
                  className={styles.settingButton}
                >
                  Edit
                </button>
              </div>

              {/* Password Setting */}
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>Password</div>
                  <div className={styles.settingValue}>••••••••••••</div>
                </div>
                <button
                  onClick={() =>
                    showToast("Password change feature coming soon", "error")
                  }
                  className={styles.settingButton}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
