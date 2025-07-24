# Vehicle Tracker Backend - Widya Assignment

Backend API untuk Vehicle Tracker Dashboard yang dibuat untuk assignment intern Widya.

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL (Supabase untuk production)
- **ORM**: Prisma
- **Authentication**: JWT
- **Deployment**: Railway

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- PostgreSQL database (local atau Supabase)

## 🚀 Setup Instructions

### 1. Clone dan Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL di sistem Anda
# Buat database baru bernama 'vehicle_tracker'
```

#### Option B: Supabase (Recommended untuk deployment)
1. Buat akun di [Supabase](https://supabase.com/)
2. Buat project baru
3. Copy connection string dari Settings > Database

### 3. Environment Configuration

Copy file `.env.example` ke `.env` dan isi variabel:

```env
# Database URL - ganti dengan connection string Anda
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT Secret - ganti dengan string random yang kuat
JWT_SECRET="your-super-secret-jwt-key-here"

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### 4. Database Migration & Seeding

```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed data contoh
npm run db:seed
```

### 5. Development

```bash
# Start development server
npm run dev

# Server akan berjalan di http://localhost:5000
```

### 6. Build untuk Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /` - API status check

### Vehicles
- `GET /api/vehicles` - List semua kendaraan
- `GET /api/vehicles/:id` - Detail kendaraan berdasarkan ID
- `PUT /api/vehicles/:id` - Update lokasi kendaraan (optional)

### Authentication (Optional)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## 📊 Data Structure

### Vehicle
```typescript
{
  id: number,
  name: string,
  status: "ACTIVE" | "INACTIVE", 
  fuel_level: number,     // dalam persen (0-100)
  odometer: number,       // dalam kilometer
  latitude: number,       // koordinat GPS
  longitude: number,      // koordinat GPS
  speed: number,          // dalam km/h
  updated_at: string      // ISO timestamp
}
```

### User (untuk authentication)
```typescript
{
  id: number,
  email: string,
  name: string,
  password: string       // hashed
}
```

## 🔐 Authentication

API menggunakan JWT Bearer tokens. Untuk endpoint yang memerlukan auth:

```bash
Authorization: Bearer <your-jwt-token>
```

Demo user untuk testing:
- Email: `demo@widya.com`
- Password: `demo123`

## 🚀 Deployment ke Railway

### 1. Persiapan

1. Push code ke GitHub repository
2. Buat akun di [Railway](https://railway.app/)

### 2. Deploy

1. Connect GitHub repository di Railway
2. Set environment variables di Railway dashboard:
   ```
   DATABASE_URL=<your-supabase-connection-string>
   JWT_SECRET=<your-jwt-secret>
   NODE_ENV=production
   ```
3. Railway akan otomatis build dan deploy

### 3. Domain

Railway akan memberikan domain seperti:
`https://your-app-name.up.railway.app`

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── controllers/        # Route handlers
│   │   ├── vehicleController.ts
│   │   └── authController.ts
│   ├── routes/            # API routes
│   │   ├── vehicleRoutes.ts
│   │   └── authRoutes.ts
│   ├── middleware/        # Custom middleware
│   │   └── auth.ts
│   ├── app.ts            # Express app setup
│   └── seed.ts           # Database seeding
├── prisma/
│   └── schema.prisma     # Database schema
├── dist/                 # Compiled JavaScript (after build)
├── .env                  # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing API

### Using curl:

```bash
# Get all vehicles
curl http://localhost:5000/api/vehicles

# Get specific vehicle
curl http://localhost:5000/api/vehicles/1

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@widya.com","password":"demo123"}'
```

### Sample Response:

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Fleet Vehicle 001 - Jakarta",
      "status": "ACTIVE",
      "fuel_level": 85.5,
      "odometer": 45320.8,
      "latitude": -6.2088,
      "longitude": 106.8456,
      "speed": 45.2,
      "updated_at": "2025-01-24T10:30:00.000Z"
    }
  ]
}
```

## 🔧 Troubleshooting

### Database Connection Issues
1. Pastikan PostgreSQL server berjalan
2. Cek DATABASE_URL di file `.env`
3. Pastikan database exist dan accessible

### Port Already in Use
```bash
# Cek process yang menggunakan port 5000
netstat -ano | findstr :5000
# Kill process jika perlu
```

### Prisma Issues
```bash
# Reset database (hati-hati, akan hapus semua data!)
npx prisma db push --force-reset

# Regenerate client
npx prisma generate
```

## 📞 Contact

Untuk pertanyaan atau bantuan terkait assignment ini, silakan hubungi tim Widya.

---

**Built with ❤️ for Widya Intern Assignment**
