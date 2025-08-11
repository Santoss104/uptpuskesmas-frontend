"use client";

import React, { useState, useEffect } from "react";
import apiClient, { CalendarDay, CalendarWeek } from "../../utils/apiClient";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
}

export default function Calendar({ onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Get today's date for highlighting
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  useEffect(() => {
    const loadCalendar = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.getCalendar(currentMonth, currentYear);

        if (response.success && response.data) {
          // Flatten the weeks structure to get all days
          const allDays: CalendarDay[] = [];
          if (response.data.weeks) {
            response.data.weeks.forEach((week: CalendarWeek) => {
              if (week.days) {
                allDays.push(...week.days);
              }
            });
          }
          setCalendarData(allDays);
        }
      } catch {
        setError("Gagal memuat kalender");
        showToast("Gagal memuat data kalender", "error");
      } finally {
        setLoading(false);
      }
    };

    loadCalendar();
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: CalendarDay) => {
    if (onDateSelect) {
      const selectedDate = new Date(day.year, day.month - 1, day.date);
      onDateSelect(selectedDate);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="calendar-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-button">
          &#8249;
        </button>
        <h2 className="month-year">
          {monthNames[currentMonth - 1]} {currentYear}
        </h2>
        <button onClick={handleNextMonth} className="nav-button">
          &#8250;
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="calendar-grid">
        <div className="calendar-header-row">
          {dayNames.map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-body">
          {calendarData && calendarData.length > 0 ? (
            calendarData.map((day, index) => {
              const isToday =
                day.date === todayDate &&
                day.month === todayMonth &&
                day.year === todayYear &&
                day.isCurrentMonth;

              return (
                <div
                  key={index}
                  className={`calendar-day ${
                    day.isCurrentMonth ? "current-month" : "other-month"
                  } ${
                    day.patients && day.patients.length > 0
                      ? "has-patients"
                      : ""
                  } ${isToday ? "today" : ""}`}
                  onClick={() => handleDateClick(day)}
                >
                  <span className="date-number">{day.date}</span>
                  {day.patients && day.patients.length > 0 && (
                    <span className="patient-count">
                      {day.patients.length} pasien
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "20px",
              }}
            >
              {loading ? "Memuat kalender..." : "Tidak ada data kalender"}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .calendar-container {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .nav-button {
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 18px;
        }

        .nav-button:hover {
          background: #0056b3;
        }

        .month-year {
          font-size: 20px;
          font-weight: bold;
          margin: 0;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: #e0e0e0;
        }

        .calendar-header-row {
          display: contents;
        }

        .day-header {
          background: #f5f5f5;
          padding: 10px;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
        }

        .calendar-body {
          display: contents;
        }

        .calendar-day {
          background: white;
          min-height: 80px;
          padding: 8px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: background-color 0.2s;
        }

        .calendar-day:hover {
          background: #f8f9fa;
        }

        .calendar-day.other-month {
          background: #f8f9fa;
          color: #999;
        }

        .calendar-day.has-patients {
          background: #e3f2fd;
        }

        .calendar-day.has-patients:hover {
          background: #bbdefb;
        }

        .calendar-day.today {
          background: #1976d2;
          color: white;
          font-weight: bold;
        }

        .calendar-day.today:hover {
          background: #1565c0;
        }

        .calendar-day.today .patient-count {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .date-number {
          font-weight: bold;
          margin-bottom: 4px;
        }

        .patient-count {
          font-size: 12px;
          color: #1976d2;
          background: #e3f2fd;
          padding: 2px 6px;
          border-radius: 12px;
        }

        .error-message {
          color: #d32f2f;
          background: #ffebee;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
