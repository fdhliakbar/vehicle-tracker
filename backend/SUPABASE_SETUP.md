# 🔑 Supabase Database Setup Guide

## Cara Mendapatkan Database Connection String

### Step 1: Login ke Supabase Dashboard
1. Buka https://supabase.com/
2. Login ke akun Anda
3. Pilih project: **efnhjdeajpztmoyumtgq**

### Step 2: Dapatkan Database Password
1. Di dashboard Supabase, klik **Settings** di sidebar kiri
2. Klik **Database** 
3. Scroll ke bawah ke bagian **Connection string**
4. Copy **Connection string** yang terlihat seperti:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.efnhjdeajpztmoyumtgq.supabase.co:5432/postgres
   ```

### Step 3: Update .env File
Ganti `[YOUR-DATABASE-PASSWORD]` di file `.env` dengan password yang Anda dapatkan.

**Contoh:**
```env
DATABASE_URL="postgresql://postgres:your_actual_password_here@db.efnhjdeajpztmoyumtgq.supabase.co:5432/postgres"
```

### Step 4: Test Connection
Setelah update DATABASE_URL, jalankan:
```bash
npx prisma db push
```

Jika berhasil, Anda akan melihat pesan bahwa schema telah di-push ke database.

## 🗃️ Database Tables yang Akan Dibuat

Berdasarkan requirements Widya, kita akan membuat 2 tabel utama:

### 1. 🚗 Table: `vehicles`
```sql
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE')),
  fuel_level FLOAT NOT NULL,
  odometer FLOAT NOT NULL, 
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  speed FLOAT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Sample Data:**
- Fleet Vehicle 001 - Jakarta (ACTIVE, fuel: 85.5%)
- Fleet Vehicle 002 - Bandung (INACTIVE, fuel: 23.1%)
- Fleet Vehicle 003 - Surabaya (ACTIVE, fuel: 92.8%)
- dsb.

### 2. 👥 Table: `users` 
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('USER', 'ADMIN')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Sample Users:**
- **Admin**: admin@widya.com / admin123 (role: ADMIN)
- **User**: user@widya.com / user123 (role: USER)  
- **Demo**: demo@widya.com / demo123 (role: USER)

## 🎯 Authentication Flow

### User Registration:
- User dapat register sebagai role "USER" secara default
- Admin hanya bisa dibuat manual atau via seed data
- Password di-hash menggunakan bcrypt

### User Login:
- Login dengan email/password
- Return JWT token dengan info role
- Token valid selama 24 jam

### Role-based Access:
- **USER**: Dapat melihat vehicles, login/logout
- **ADMIN**: Dapat manage vehicles, manage users, full access

## 🔌 API Endpoints yang Tersedia

### Public Endpoints:
- `GET /` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints:
- `GET /api/auth/profile` - Get user profile (auth required)
- `GET /api/vehicles` - List vehicles (public/auth optional)
- `GET /api/vehicles/:id` - Vehicle detail (public/auth optional)

### Admin Only (future):
- `POST /api/vehicles` - Add new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle
- `GET /api/users` - List users
