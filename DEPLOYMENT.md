# 🚀 Vehicle Tracker Deployment Guide

## 📋 Overview
This project consists of two parts:
- **Frontend**: React + TypeScript + Vite + TailwindCSS (Deploy to Vercel)
- **Backend**: Node.js + Express + TypeScript + Prisma + PostgreSQL (Deploy to Railway/Render)

## 🔧 Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account
- Railway or Render account

## 📦 Project Structure
```
vehicle-tracker/
├── frontend/          # React frontend
├── backend/          # Express backend
├── package.json      # Root package.json
└── README.md
```

---

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Frontend for Deployment

#### Update API Base URL
Update `frontend/src/services/api.ts`:
```typescript
// Replace localhost with your backend URL
const API_BASE_URL = process.env.VITE_API_URL || 'https://your-backend-url.railway.app/api';
```

#### Create Environment Variables File
Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: vehicle-tracker-frontend
# - Directory: ./
# - Build command: npm run build
# - Output directory: dist
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Set root directory to `frontend`
5. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend-url.railway.app/api`

---

## 🚂 Backend Deployment (Railway)

### 1. Prepare Backend for Deployment

#### Update CORS Settings
Update `backend/src/app.ts`:
```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
}));
```

#### Create Railway Configuration
Create `backend/railway.toml`:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm run build && npm start"

[env]
NODE_ENV = "production"
```

### 2. Deploy to Railway

#### Option A: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up
```

#### Option B: Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Connect GitHub repository
4. Select `backend` directory
5. Add PostgreSQL database service
6. Configure environment variables

### 3. Environment Variables in Railway
```env
DATABASE_URL=postgresql://username:password@hostname:port/database
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
PORT=3000
```

---

## 🐳 Alternative: Backend Deployment (Render)

### 1. Create `render.yaml`
Create `backend/render.yaml`:
```yaml
services:
  - type: web
    name: vehicle-tracker-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: vehicle-tracker-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true

databases:
  - name: vehicle-tracker-db
    databaseName: vehicle_tracker
    user: vehicle_tracker_user
```

### 2. Deploy to Render
1. Go to [render.com](https://render.com)
2. Connect GitHub repository
3. Select `backend` directory
4. Choose "Web Service"
5. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Auto-Deploy: Yes

---

## 🗄️ Database Setup

### For Railway:
1. Add PostgreSQL service to your project
2. Copy the DATABASE_URL from Railway dashboard
3. Run migrations:
```bash
# From your local backend directory
npx prisma migrate deploy
npx prisma db seed
```

### For Render:
1. Database is created automatically with render.yaml
2. Run migrations after deployment

---

## 🌍 Live Demo Explanation

### **"Live Demo" dalam konteks ini berarti:**

1. **🌐 Working Website** - Aplikasi yang bisa diakses langsung di internet
   - Frontend: `https://your-app-name.vercel.app`
   - Backend API: `https://your-backend.railway.app`

2. **✅ Functional Features** - Semua fitur berjalan sempurna:
   - User bisa register/login
   - Admin bisa akses dashboard
   - CRUD operations berfungsi
   - Real-time vehicle tracking
   - Responsive UI di semua device

3. **📱 Interactive Demo** - Reviewer bisa:
   - Mencoba login sebagai admin
   - Test semua fitur CRUD
   - Lihat responsive design
   - Validasi form berfungsi

### **BUKAN video demo!** 
Live demo = website yang hidup dan bisa digunakan langsung.

---

## 📝 Setup Instructions for Reviewers

Create this in your README.md:

### Quick Start
1. **Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app)
2. **Admin Access**: 
   - Email: `admin@example.com`
   - Password: `admin123`

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/vehicle-tracker
cd vehicle-tracker

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### Tech Stack
- ✅ **Frontend**: React + TypeScript + Vite + TailwindCSS
- ✅ **Backend**: Node.js + Express + TypeScript + Prisma
- ✅ **Database**: PostgreSQL
- ✅ **Authentication**: JWT
- ✅ **Deployment**: Vercel (Frontend) + Railway (Backend)

---

## 🎯 Evaluation Checklist

### ✅ Functional API
- All CRUD endpoints working
- Authentication with JWT
- Role-based access control
- Error handling

### ✅ React Structure
- TypeScript throughout
- Proper state management (Zustand)
- Component composition
- Custom hooks

### ✅ Project Structure
- Clean folder organization
- Separation of concerns
- Environment configurations
- Build optimizations

### ✅ Responsive UI
- Mobile-first design
- TailwindCSS utilities
- Consistent theme (#F97C21)
- Loading states & animations

### 🎁 Bonus Features
- ✅ Full TypeScript implementation
- ✅ JWT authentication & authorization
- ✅ TailwindCSS with custom theme
- ✅ Form validation
- ✅ Real-time animations
- ✅ Responsive design

---

## 🚀 Next Steps

1. **Push to GitHub** with proper commit messages
2. **Deploy Backend** to Railway/Render
3. **Deploy Frontend** to Vercel
4. **Test Live Demo** thoroughly
5. **Update README** with live URLs
6. **Submit project** with live demo link

Remember: Live demo = working website, not video! 🌐
