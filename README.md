# 🏥 Puskesmas Frontend Dashboard

Modern web dashboard untuk sistem manajemen pasien puskesmas dengan antarmuka yang responsif dan user-friendly.

## 🚀 Fitur Utama

- **Responsive Design** - Mobile-first dengan Tailwind CSS
- **Authentication** - Secure login/logout dengan JWT
- **Patient Management** - Complete CRUD interface untuk data pasien
- **Advanced Search** - Real-time search dengan multiple filters
- **Dashboard Analytics** - Visual charts dan statistics
- **Data Export** - Excel export untuk reporting
- **Role-Based UI** - Different interfaces untuk USER dan ADMIN

## 🛠️ Tech Stack

- **Framework**: Next.js 15 dengan App Router
- **UI Library**: React 19 dengan TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Charts**: Chart.js untuk visualisasi data
- **Forms**: HTML5 forms dengan custom validation
- **State**: React hooks untuk state management
- **HTTP Client**: Fetch API dengan custom error handling

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- Backend API running (lihat ../backend)

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Environment setup**

```bash
cp .env.example .env.local
# Edit .env.local dengan API URL
```

3. **Run development**

```bash
npm run dev
```

4. **Open browser**

```
http://localhost:3000
```

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Optional: Analytics, etc
NEXT_PUBLIC_APP_ENV=development
```

## 📱 Pages & Routes

### Public Routes

- `/login` - Authentication page

### Protected Routes (USER)

- `/dashboard` - Overview statistics dan charts
- `/pasien` - Patient list dengan search dan filter
- `/registrasi` - Form registrasi pasien baru

### Admin Routes (ADMIN only)

- `/users` - User management panel
- `/settings` - System settings

## 🎨 UI Components

### Core Components

- **Header** - Navigation dengan user info
- **Sidebar** - Menu navigation dengan role-based items
- **Dashboard** - Statistics cards dan charts
- **PatientList** - Data table dengan pagination
- **Registrasi** - Patient registration form
- **Login** - Authentication form

### Utility Components

- **LoadingSpinner** - Loading states
- **Toast** - Notification system
- **ConfirmModal** - Confirmation dialogs
- **CustomSelect** - Enhanced select inputs

## 📊 Features Detail

### Patient Management

- Create, read, update, delete patients
- Search by nama, alamat, nomor registrasi
- Filter by alphabet (A-Z)
- Pagination dengan customizable page size
- Excel export functionality

### Dashboard Analytics

- Total patients count
- Today's registrations
- Monthly statistics
- Gender distribution charts
- Age group analysis

### Authentication

- JWT-based login/logout
- Role-based access control
- Automatic token refresh
- Session persistence

## 📁 Project Structure

```
frontend/
├── src/app/
│   ├── components/       # Reusable components
│   ├── dashboard/        # Dashboard page
│   ├── login/           # Login page
│   ├── pasien/          # Patient list page
│   ├── registrasi/      # Registration page
│   └── styles/          # CSS modules
├── public/              # Static assets
└── utils/               # Helper utilities
```

## 🎯 Component Architecture

### Page Components

- **layout.tsx** - Root layout dengan providers
- **page.tsx** - Page components untuk setiap route

### Shared Components

- **Header.tsx** - Top navigation
- **Sidebar.tsx** - Side navigation
- **Dashboard.tsx** - Statistics dashboard
- **PatientList.tsx** - Patient data table
- **Registrasi.tsx** - Patient form

## 🚀 Production Deployment

**Current Deployment**: [Netlify](https://netlify.com)

### Build Commands

```bash
npm run build    # Build untuk production
npm start        # Start production server
npm run lint     # ESLint checking
```

### Automatic Deployment

- Deploy otomatis via Git push ke main branch
- Preview deploys untuk pull requests

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
npm run type-check # TypeScript checking
```

### Development Features

- Hot reload dengan Next.js
- TypeScript checking
- ESLint code quality
- Automatic imports sorting

## 🎨 Styling

### CSS Approach

- **Tailwind CSS** - Utility-first untuk rapid development
- **CSS Modules** - Component-scoped styling
- **Responsive Design** - Mobile-first breakpoints

### Color Scheme

- Primary: Blue (#4a90e2)
- Background: Clean whites dan light grays
- Text: Professional dark grays
- Success/Error: Standard green/red indicators

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Follow coding standards
4. Test pada multiple devices
5. Create Pull Request

- **Header** - Navigation dengan user profile dan logout
- **Sidebar** - Menu navigasi dengan role-based visibility
- **LoadingSpinner** - Consistent loading states
- **Toast** - Success/error notifications
- **ConfirmModal** - Confirmation dialogs untuk critical actions
- **CustomSelect** - Enhanced dropdown components
- **Calendar** - Date picker dan scheduling interface

### 🎯 Component Features

- **LayoutWrapper** - Consistent page layouts
- **Dashboard** - Statistics cards dan charts
- **PatientList** - Advanced data table dengan export
- **Registrasi** - Multi-step patient registration form

## 🔧 Technology Stack

| Category             | Technology       | Purpose                           |
| -------------------- | ---------------- | --------------------------------- |
| **Framework**        | Next.js 15.4     | React framework dengan App Router |
| **Runtime**          | React 19.1       | UI library dengan latest features |
| **Language**         | TypeScript       | Type-safe development             |
| **Styling**          | Tailwind CSS 4.x | Utility-first CSS framework       |
| **UI Library**       | Material-UI 7.2  | React components library          |
| **Data Grid**        | MUI X Data Grid  | Advanced table components         |
| **Icons**            | React Icons      | Icon library                      |
| **Routing**          | React Router DOM | Client-side routing               |
| **State Management** | React Context    | Global state management           |

## ⚡ Quick Start

### Prerequisites

Pastikan Anda telah menginstall:

```bash
✅ Node.js >= 18.x
✅ npm atau yarn atau pnpm
✅ Git
✅ Backend API running di http://localhost:5000
```

### Installation

```bash
# 1️⃣ Clone repository
git clone https://github.com/yourusername/puskesmas-frontend.git
cd puskesmas-frontend

# 2️⃣ Install dependencies
npm install
# atau
yarn install
# atau
pnpm install

# 3️⃣ Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi API backend

# 4️⃣ Run development server
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

### ⚙️ Environment Configuration

Buat file `.env.local` di root directory:

```env
# 🌐 API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=Sistem Informasi Puskesmas

# 🔐 Authentication
NEXT_PUBLIC_JWT_EXPIRES_IN=15m
NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN=7d

# 🎨 UI Configuration
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#1976d2
NEXT_PUBLIC_ITEMS_PER_PAGE=10
```

### 🚀 First Run

```bash
# 1. Make sure backend is running
curl http://localhost:5000/api/v1/patients
# Should return authentication error (normal)

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000
# Should redirect to /login

# 4. Test login
# Use credentials from backend registration
```

### 🔗 API Integration

Frontend terhubung dengan backend melalui:

- **Base URL**: `http://localhost:5000/api/v1`
- **Authentication**: JWT tokens dalam headers
- **Error Handling**: Global error interceptors
- **Loading States**: Consistent loading indicators

## 📁 Project Structure

```
📦 puskesmas-frontend/
├── 📁 public/                  # 🌐 Static assets
│   ├── logo.png               # App logo
│   ├── favicon.ico            # Browser icon
│   └── *.svg                  # Icon assets
├── 📁 src/                    # 💻 Source code
│   ├── 📁 app/                # 🏗️ Next.js App Router
│   │   ├── favicon.ico        # App favicon
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (redirects to login)
│   │   ├── 📁 components/     # 🧩 Reusable components
│   │   │   ├── Calendar.tsx   # Date picker & scheduling
│   │   │   ├── ConfirmModal.tsx # Confirmation dialogs
│   │   │   ├── CustomSelect.tsx # Enhanced dropdowns
│   │   │   ├── Dashboard.tsx  # Dashboard overview
│   │   │   ├── Header.tsx     # Top navigation
│   │   │   ├── LayoutWrapper.tsx # Page wrapper
│   │   │   ├── LoadingSpinner.tsx # Loading states
│   │   │   ├── Login.tsx      # Login form
│   │   │   ├── PatientList.tsx # Patient data grid
│   │   │   ├── Registrasi.tsx # Patient registration
│   │   │   ├── Sidebar.tsx    # Side navigation
│   │   │   └── Toast.tsx      # Notifications
│   │   ├── 📁 dashboard/      # 📊 Dashboard pages
│   │   │   └── page.tsx       # Dashboard route
│   │   ├── 📁 login/          # 🔐 Authentication
│   │   │   ├── layout.tsx     # Login layout
│   │   │   └── page.tsx       # Login page
│   │   ├── 📁 pasien/         # 🏥 Patient management
│   │   │   └── page.tsx       # Patient list page
│   │   ├── 📁 registrasi/     # 📝 Patient registration
│   │   │   ├── layout.tsx     # Registration layout
│   │   │   └── page.tsx       # Registration page
│   │   └── 📁 styles/         # 🎨 Component styles
│   │       ├── customSelect.module.css
│   │       ├── dashboard.module.css
│   │       ├── header.module.css
│   │       ├── loadingSpinner.module.css
│   │       ├── login.module.css
│   │       ├── modal.module.css
│   │       ├── regis.module.css
│   │       ├── sidebar.module.css
│   │       └── toast.module.css
│   ├── 📁 utils/              # 🛠️ Utility functions
│   │   ├── apiClient.ts       # API client configuration
│   │   └── auth.tsx           # Authentication context
│   └── App.tsx                # App component (if needed)
├── 📄 eslint.config.mjs       # ESLint configuration
├── 📄 next.config.ts          # Next.js configuration
├── 📄 next-env.d.ts           # Next.js TypeScript definitions
├── 📄 package.json            # Dependencies & scripts
├── 📄 postcss.config.mjs      # PostCSS configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 tsconfig.tsbuildinfo    # TypeScript build cache
└── 📄 README.md               # Project documentation
```

### 📋 Key Directories Explanation

| Directory         | Purpose       | Description                       |
| ----------------- | ------------- | --------------------------------- |
| `app/components/` | UI Components | Reusable React components         |
| `app/styles/`     | CSS Modules   | Component-specific styles         |
| `utils/`          | Utilities     | API client, auth context, helpers |
| `public/`         | Static Assets | Images, icons, static files       |

## 🔧 Development

### 🚀 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

### 🔄 Development Workflow

1. **Setup Development Environment**

   ```bash
   # Clone and install
   git clone <repository-url>
   cd puskesmas-frontend
   npm install

   # Setup environment
   cp .env.example .env.local
   # Edit .env.local with your API configuration
   ```

2. **Start Development**

   ```bash
   # Make sure backend is running
   cd ../backend && npm run dev

   # In new terminal, start frontend
   npm run dev
   ```

3. **Development Features**
   - 🔥 **Hot Reload** - Instant updates saat code changes
   - 🔍 **TypeScript** - Type checking dan IntelliSense
   - 🎨 **Tailwind** - Real-time CSS updates
   - 📱 **Responsive** - Test di berbagai screen sizes

### 🧪 Testing & Debugging

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run ESLint
npm run lint

# Check bundle size
npm run build && npm run analyze

# Test production build locally
npm run build && npm start
```

### 🎨 Styling Guidelines

- **Tailwind CSS** untuk utility classes
- **CSS Modules** untuk component-specific styles
- **Material-UI** untuk complex components
- **Responsive Design** - mobile-first approach

### 🔗 API Integration Best Practices

```typescript
// Example API call dengan error handling
const fetchPatients = async () => {
  try {
    setLoading(true);
    const response = await apiClient.get("/patients");
    setPatients(response.data);
  } catch (error) {
    showToast("Error fetching patients", "error");
    console.error("API Error:", error);
  } finally {
    setLoading(false);
  }
};
```

## 🚀 Deployment

### 📦 Build untuk Production

```bash
# Build optimized production version
npm run build

# Test production build locally
npm start

# Check build output
ls -la .next/
```

### 🌐 Deployment Options

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

#### Docker Deployment

```dockerfile
# Dockerfile example
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Static Export

```bash
# For static hosting
npm run build
npm run export
```

### ⚙️ Environment Variables untuk Production

```env
# Production environment
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api/v1
NEXT_PUBLIC_APP_NAME=Sistem Informasi Puskesmas
NODE_ENV=production
```

## 🤝 Contributing

### 🔄 Development Process

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. **Make changes dengan best practices**
   - Follow TypeScript conventions
   - Use proper component structure
   - Add appropriate error handling
   - Test responsiveness
4. **Commit changes**
   ```bash
   git commit -m 'Add awesome feature'
   ```
5. **Push to branch**
   ```bash
   git push origin feature/awesome-feature
   ```
6. **Open Pull Request**

### 📝 Code Standards

- **TypeScript** - Strongly typed components
- **ESLint** - Code linting dan formatting
- **Component Structure** - Modular, reusable components
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Proper error boundaries
- **Performance** - Optimized renders dan bundle size

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ikhlas Abdillah**

- GitHub: [@Santoss104](https://github.com/Santoss104)

---

**📞 Support**

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

**🎯 Status: Production Ready** ✅

---

## 🔗 Related Projects

- **Backend API**: [Puskesmas Backend](../backend) - RESTful API dengan Node.js
- **Documentation**: API documentation tersedia di backend README
- **Mobile App**: Coming soon - React Native version
