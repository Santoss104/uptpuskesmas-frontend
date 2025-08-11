# 🏥 Puskesmas Frontend Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-teal)](https://tailwindcss.com/)
[![Material-UI](https://img.shields.io/badge/MUI-7.2-blue)](https://mui.com/)

**Aplikasi Web Dashboard Puskesmas** - Modern, responsive frontend untuk sistem manajemen pasien dengan antarmuka yang intuitif dan user-friendly.

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🎨 UI Components](#-ui-components)
- [🔧 Tech Stack](#-technology-stack)
- [⚡ Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

## 🚀 Features

### Core Features
- ✅ **Responsive Design** - Mobile-first approach dengan Tailwind CSS
- ✅ **Modern UI/UX** - Clean, intuitive interface dengan Material-UI components
- ✅ **Authentication** - Secure login/logout dengan JWT token management
- ✅ **Patient Management** - Complete CRUD interface untuk data pasien
- ✅ **Advanced Search** - Real-time search dengan multiple filters
- ✅ **Dashboard Analytics** - Visual charts dan statistics overview
- ✅ **Data Export** - Excel export functionality untuk reporting

### User Experience
- 🎯 **Role-Based Access** - Different interfaces untuk USER dan ADMIN
- ⚡ **Fast Loading** - Optimized dengan Next.js 15 dan React 19
- 📱 **Mobile Responsive** - Perfect di semua device sizes
- 🌙 **Modern Styling** - Professional medical theme
- 🔔 **Toast Notifications** - Real-time feedback untuk user actions
- 📊 **Data Grid** - Advanced table dengan sorting, pagination, filtering

## 🎨 UI Components

### 📱 Pages & Layouts
- **Login Page** - Secure authentication dengan form validation
- **Dashboard** - Overview statistics dan quick actions
- **Patient List** - Data grid dengan advanced search capabilities
- **Patient Registration** - Form pendaftaran pasien baru
- **User Management** - Admin panel untuk user management (ADMIN only)

### 🧩 Reusable Components
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

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 15.4 | React framework dengan App Router |
| **Runtime** | React 19.1 | UI library dengan latest features |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS framework |
| **UI Library** | Material-UI 7.2 | React components library |
| **Data Grid** | MUI X Data Grid | Advanced table components |
| **Icons** | React Icons | Icon library |
| **Routing** | React Router DOM | Client-side routing |
| **State Management** | React Context | Global state management |

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

| Directory | Purpose | Description |
|-----------|---------|-------------|
| `app/components/` | UI Components | Reusable React components |
| `app/styles/` | CSS Modules | Component-specific styles |
| `utils/` | Utilities | API client, auth context, helpers |
| `public/` | Static Assets | Images, icons, static files |

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
    const response = await apiClient.get('/patients');
    setPatients(response.data);
  } catch (error) {
    showToast('Error fetching patients', 'error');
    console.error('API Error:', error);
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
