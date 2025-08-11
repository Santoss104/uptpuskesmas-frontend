"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import apiClient, { CalendarDay, CalendarWeek } from "../../utils/apiClient";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../../utils/auth";

interface Patient {
  _id: string;
  name: string;
  address: string;
  registrationNumber: string;
  birthPlace: string;
  birthDay: string;
  createdAt: string;
}

interface PatientStatistics {
  totalPatients: number;
  statistics: {
    averageAge: number;
    genderDistribution: Record<string, number>;
    commonAddresses: Array<{ _id: string; count: number }>;
    registrationTrends: Record<string, number>;
  };
}

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [statistics, setStatistics] = useState<PatientStatistics | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLoading(false);
      return;
    }

    if (!authLoading && isAuthenticated) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const patientsResponse = await apiClient.getPatients({
            page: 1,
            limit: 5,
            sortBy: "createdAt",
            sortOrder: "desc",
          });

          if (patientsResponse.success && patientsResponse.data) {
            setPatients(patientsResponse.data.patients);
          }

          // Fetch statistics
          const statsResponse = await apiClient.getPatientStatistics();
          if (statsResponse.success && statsResponse.data) {
            setStatistics(statsResponse.data);
          }

          // Fetch calendar data
          const calendarResponse = await apiClient.getCalendar(currentMonth, currentYear);
          if (calendarResponse.success && calendarResponse.data) {
            const allDays: CalendarDay[] = [];
            if (calendarResponse.data.weeks) {
              calendarResponse.data.weeks.forEach((week: CalendarWeek) => {
                if (week.days) {
                  allDays.push(...week.days);
                }
              });
            }
            setCalendarData(allDays);
          }
        } catch (error) {
          console.error("Dashboard data fetch error:", error);
          setError("Gagal memuat data dashboard");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [authLoading, isAuthenticated, currentMonth, currentYear]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <LoadingSpinner message="Memuat data dashboard..." />;
  }

  if (error) {
    return (
      <div className={styles["dashboard-bg"]}>
        <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
          {error}
        </div>
      </div>
    );
  }
  return (
    <div className={styles["dashboard-bg"]}>
      <div className={styles["dashboard-title"]}>Dashboard</div>

      {/* Statistik Card */}
      <div className={styles["stat-card"]}>
        <span className={`material-icons ${styles["stat-icon"]}`}>
          calendar_month
        </span>
        <div>
          <div className={styles["stat-info-title"]}>
            {statistics?.totalPatients || 0}
          </div>
          <div className={styles["stat-info-desc"]}>Total Data Pasien</div>
        </div>
      </div>

      {/* Table & Calendar */}
      <div className={styles["dashboard-main"]}>
        {/* Table */}
        <div className={styles["table-card"]}>
          <div className={styles["table-title"]}>Pasien Terbaru</div>
          <table className={styles["dashboard-table"]}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Pasien</th>
                <th>Alamat</th>
                <th>No. Pendaftaran</th>
                <th>Tanggal Lahir</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((p, index) => (
                  <tr key={p._id}>
                    <td>{index + 1}</td>
                    <td>
                      <a className={styles["link"]}>{p.name}</a>
                    </td>
                    <td>
                      <a className={styles["link"]}>{p.address}</a>
                    </td>
                    <td>{p.registrationNumber}</td>
                    <td>{formatDate(p.birthDay)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    Tidak ada data pasien
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Calendar */}
        <div className={styles["calendar-card"]}>
          <div className={styles["calendar-title"]}>
            {monthNames[currentMonth - 1]} {currentYear}
          </div>
          <table className={styles["calendar-table"]}>
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {calendarData && calendarData.length > 0 ? (
                Array.from({ length: Math.ceil(calendarData.length / 7) }, (_, weekIndex) => (
                  <tr key={weekIndex}>
                    {calendarData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                      const today = new Date();
                      const isToday =
                        day.date === today.getDate() &&
                        currentMonth === today.getMonth() + 1 &&
                        currentYear === today.getFullYear() &&
                        day.isCurrentMonth;

                      return (
                        <td
                          key={weekIndex * 7 + dayIndex}
                          className={isToday ? styles["today"] : ""}
                          style={{
                            opacity: day.isCurrentMonth ? 1 : 0.3,
                          }}
                        >
                          {day.date}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                    Memuat kalender...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
