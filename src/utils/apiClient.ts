// API Configuration for Frontend
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://puskesmas-backend-api.fly.dev/api/v1";

// Type definitions
interface User {
  _id: string;
  email: string;
  name?: string;
  displayName?: string;
  role: "user" | "admin";
  avatar?: {
    public_id: string;
    url: string;
  };
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface untuk response login yang berbeda dari ApiResponse biasa
interface LoginResponse {
  success: boolean;
  message?: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface Patient {
  _id: string;
  name: string;
  address: string;
  registrationNumber: string;
  birthPlace: string;
  birthDay: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPatients: number;
  patientsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number;
  prevPage?: number;
}

interface PatientSummary {
  totalPatientsInDatabase: number;
  totalSearchResults: number;
  showingResults: number;
  isFiltered: boolean;
}

interface PatientStatistics {
  averageAge: number;
  genderDistribution: Record<string, number>;
  commonAddresses: Array<{ _id: string; count: number }>;
  registrationTrends: Record<string, number>;
  mostCommonAddress: string | null;
}

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  patients?: Patient[];
}

interface CalendarWeek {
  days: CalendarDay[];
}

interface CalendarData {
  month: string;
  year: number;
  monthNumber: number;
  weeks: CalendarWeek[];
}

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    timestamp: string;
    requestId?: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  errors?: string | string[];
}

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
      ...this.headers,
      ...(token && { "access-token": token }),
      ...(refreshToken && { "refresh-token": refreshToken }),
    };
  }

  // Auth headers tanpa Content-Type untuk file upload
  private getAuthHeadersOnly(): Record<string, string> {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
      ...(token && { "access-token": token }),
      ...(refreshToken && { "refresh-token": refreshToken }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      credentials: "include",
      // Add timeout - shorter for better UX
      signal: AbortSignal.timeout(15000), // 15 seconds timeout
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error("API Error:", error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error(
          "Tidak dapat terhubung ke server. Pastikan koneksi internet Anda stabil."
        );
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(
          "Request timeout. Server membutuhkan waktu terlalu lama untuk merespons."
        );
      }

      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const startTime = performance.now();

    console.log("🌐 ApiClient: Sending login request with credentials:", {
      email: credentials.email,
      hasPassword: !!credentials.password,
      apiUrl: this.baseURL,
      timestamp: new Date().toISOString(),
    });

    const url = `${this.baseURL}/auth/login`;
    const config: RequestInit = {
      method: "POST",
      headers: {
        ...this.getAuthHeaders(),
      },
      credentials: "include",
      body: JSON.stringify(credentials),
      // Shorter timeout for login
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      const endTime = performance.now();
      const duration = endTime - startTime;

      if (!response.ok) {
        console.error("❌ Login failed:", {
          duration: `${duration.toFixed(2)}ms`,
          status: response.status,
          message: data.message,
        });
        throw new Error(data.message || "Login failed");
      }

      console.log("📨 ApiClient: Login response received:", {
        success: data.success,
        hasUser: !!data.user,
        hasAccessToken: !!data.accessToken,
        hasRefreshToken: !!data.refreshToken,
        message: data.message,
        duration: `${duration.toFixed(2)}ms`,
        timestamp: new Date().toISOString(),
      });

      return data as LoginResponse;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.error("API Error:", {
        error,
        duration: `${duration.toFixed(2)}ms`,
        url,
      });

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error(
          "Tidak dapat terhubung ke server. Pastikan koneksi internet Anda stabil."
        );
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(
          "Login timeout. Server membutuhkan waktu terlalu lama untuk merespons."
        );
      }

      throw error;
    }
  }

  async register(userData: {
    email: string;
    password: string;
    confirmPassword: string;
    avatar?: string;
  }) {
    return this.makeRequest<{ user: User }>("/auth/registration", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.makeRequest("/auth/logout", {
      method: "GET",
    });
  }

  async refreshToken() {
    return this.makeRequest<{ token: string }>("/auth/refresh", {
      method: "POST",
    });
  }

  // Patient endpoints
  async getPatients(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/patients${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return this.makeRequest<{
      patients: Patient[];
      pagination: Pagination;
      summary: PatientSummary;
    }>(endpoint);
  }

  async getPatientById(id: string) {
    return this.makeRequest<{ patient: Patient }>(`/patients/${id}`);
  }

  async createPatient(patientData: {
    name: string;
    address: string;
    registrationNumber: string;
    birthPlace: string;
    birthDay: string;
  }) {
    return this.makeRequest<{ patient: Patient }>("/patients/create", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  }

  async updatePatient(
    id: string,
    patientData: Partial<{
      name: string;
      address: string;
      registrationNumber: string;
      birthPlace: string;
      birthDay: string;
    }>
  ) {
    return this.makeRequest<{ patient: Patient }>(`/patients/${id}`, {
      method: "PUT",
      body: JSON.stringify(patientData),
    });
  }

  async deletePatient(id: string) {
    return this.makeRequest(`/patients/${id}`, {
      method: "DELETE",
    });
  }

  async searchPatients(params: {
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.makeRequest<{
      patients: Patient[];
      pagination: Pagination;
    }>(`/patients/search?${queryParams.toString()}`);
  }

  async searchPatientsByName(name: string, page = 1, limit = 10) {
    return this.makeRequest<{
      patients: Patient[];
      pagination: Pagination;
    }>(
      `/patients/search/name?name=${encodeURIComponent(
        name
      )}&page=${page}&limit=${limit}`
    );
  }

  async searchPatientsByAddress(address: string, page = 1, limit = 10) {
    return this.makeRequest<{
      patients: Patient[];
      pagination: Pagination;
    }>(
      `/patients/search/address?address=${encodeURIComponent(
        address
      )}&page=${page}&limit=${limit}`
    );
  }

  // Export Excel
  async exportPatientsToExcel() {
    const url = `${this.baseURL}/patients/excel/export`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Gagal export data pasien");
    return await response.arrayBuffer();
  }

  // Import Excel
  async importPatientsFromExcel(formData: FormData) {
    const url = `${this.baseURL}/patients/excel/import`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...this.getAuthHeadersOnly(),
      },
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Gagal import data pasien");
    return data;
  }

  // Download Template
  async downloadExcelTemplate() {
    const url = `${this.baseURL}/patients/excel/template`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Gagal download template");
    return await response.arrayBuffer();
  }

  async getPatientsByAlphabet(letter: string, page = 1, limit = 10) {
    return this.makeRequest<{
      patients: Patient[];
      pagination: Pagination;
    }>(
      `/patients/search/alphabet?letter=${encodeURIComponent(
        letter
      )}&page=${page}&limit=${limit}`
    );
  }

  async getPatientStatistics() {
    return this.makeRequest<{
      totalPatients: number;
      statistics: PatientStatistics;
    }>("/patients/total");
  }

  // User endpoints
  async getUserProfile() {
    return this.makeRequest<{ user: User }>("/users/me");
  }

  async updateUserProfile(userData: { name?: string; email?: string }) {
    return this.makeRequest<{ user: User }>("/users/update-info", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async updatePassword(passwordData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.makeRequest("/users/update-password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    });
  }

  // Admin only endpoints
  async getAllUsers(page = 1, limit = 10) {
    return this.makeRequest<{
      users: User[];
      pagination: Pagination;
    }>(`/users/all-users?page=${page}&limit=${limit}`);
  }

  async deleteUser(id: string) {
    return this.makeRequest(`/users/delete/${id}`, {
      method: "DELETE",
    });
  }

  async updateUserRole(userData: { userId: string; role: "user" | "admin" }) {
    return this.makeRequest("/users/update-role", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  // Calendar endpoints
  async getCurrentCalendar() {
    return this.makeRequest<{
      calendar: CalendarDay[];
      currentMonth: number;
      currentYear: number;
    }>("/calendar/current");
  }

  async getCalendar(month: number, year: number) {
    return this.makeRequest<CalendarData>(
      `/calendar?month=${month}&year=${year}`
    );
  }

  async getMultipleMonths(year: number, startMonth: number, endMonth: number) {
    return this.makeRequest<{
      calendars: CalendarData[];
      year: number;
      startMonth: number;
      endMonth: number;
    }>(
      `/calendar/multiple?year=${year}&startMonth=${startMonth}&endMonth=${endMonth}`
    );
  }
}

// Create singleton instance
const apiClient = new ApiClient();

export default apiClient;
export type {
  ApiResponse,
  User,
  Patient,
  Pagination,
  PatientSummary,
  PatientStatistics,
  LoginResponse,
  CalendarDay,
  CalendarData,
  CalendarWeek,
};
