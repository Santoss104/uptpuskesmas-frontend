import React from "react";
import styles from "../styles/dashboard.module.css";

const patients = [
  {
    id: "001",
    name: "Ahmad Subhan",
    alamat: "Jl. Merdeka No. 15, Jakarta",
    nomor: "REG001",
    lahir: "15 Jan 1985",
    status: "Fever",
  },
  {
    id: "002",
    name: "Siti Aminah",
    alamat: "Jl. Sudirman No. 25, Bandung",
    nomor: "REG002", 
    lahir: "23 Mar 1990",
    status: "Cholera",
  },
  {
    id: "003",
    name: "Budi Santoso",
    alamat: "Jl. Gatot Subroto No. 8, Surabaya",
    nomor: "REG003",
    lahir: "10 Jul 1988",
    status: "Fever",
  },
];

export default function Dashboard() {
  return (
    <div className={styles["dashboard-bg"]}>
      <div className={styles["dashboard-title"]}>Dashboard</div>

      {/* Statistik Card */}
      <div className={styles["stat-card"]}>
        <span className={`material-icons ${styles["stat-icon"]}`}>calendar_month</span>
        <div>
          <div className={styles["stat-info-title"]}>250</div>
          <div className={styles["stat-info-desc"]}>Total Data</div>
        </div>
      </div>

      {/* Table & Calendar */}
      <div className={styles["dashboard-main"]}>
        {/* Table */}
        <div className={styles["table-card"]}>
          <div className={styles["table-title"]}>Nama Pasien</div>
          <table className={styles["dashboard-table"]}>
            <thead>
              <tr>
                <th>No. </th>
                <th>Patient Name</th>
                <th>Alamat</th>
                <th>Nomor Pendaftaran</th>
                <th>Tanggal Lahir</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <a className={styles["link"]}>{p.name}</a>
                  </td>
                  <td>
                    <a className={styles["link"]}>{p.alamat}</a>
                  </td>
                  <td>{p.nomor}</td>
                  <td>{p.lahir}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Calendar */}
        <div className={styles["calendar-card"]}>
          <div className={styles["calendar-title"]}>January</div>
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
              <tr>
                <td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td>
              </tr>
              <tr>
                <td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td>
              </tr>
              <tr>
                <td>13</td><td>14</td>
                <td className={styles["today"]}>15</td>
                <td>16</td><td>17</td><td>18</td><td>19</td>
              </tr>
              <tr>
                <td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td>
              </tr>
              <tr>
                <td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}