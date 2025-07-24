# Tugas Take-Home Intern – Widya
## Proyek: Dashboard Pelacak Kendaraan (Mock)

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](https://expressjs.com/)

**Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org).**

## 🌐 Demo Langsung
**[Vehicle Tracker Ten](https://vehicle-tracker-ten.vercel.app/)** ← Klik untuk mencoba!

### Demo
- **Akses Admin**: 
  - Email: `admin@example.com`
  - Password: `admin123`
- **Akses User**: Daftar akun baru


---

## Cara Menjalankan

### Persyaratan
- Node.js 18+
- npm atau yarn
- Git

### Pengembangan Lokal

1. **Clone repositori**
```bash
git clone https://github.com/fdhliakbar/vehicle-tracker
cd vehicle-tracker
```

2. **Setup Backend**
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```
