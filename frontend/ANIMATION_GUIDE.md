# 🎨 PANDUAN ANIMASI HERO SECTION

## 📍 **LOKASI ANIMASI DAN CARA MENGUBAHNYA**

### 1. **ANIMASI TEKS SLIDE** 
**📂 Lokasi:** `HeroSection.css` line 15-35
```css
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-100px); }
  to { opacity: 1; transform: translateX(0); }
}
```
**🔧 Cara Ubah:**
- Ganti `-100px` ke `-200px` untuk slide yang lebih jauh
- Ganti `slideInLeft` ke `slideInRight` untuk arah berbeda

### 2. **ANIMASI MOBIL BOUNCING** ⭐ (ANIMASI UTAMA)
**📂 Lokasi:** `HeroSection.css` line 50-60
```css
@keyframes carBounce {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}
```
**🔧 Cara Ubah:**
- **Bounce lebih tinggi:** Ganti `-20px` ke `-40px`
- **Rotasi lebih kuat:** Ganti `2deg` ke `5deg`
- **Kecepatan:** Ganti `6s` di komponen ke `4s` (lebih cepat)

### 3. **ANIMASI PARTIKEL DEBU** 
**📂 Lokasi:** `HeroSection.css` line 65-80
```css
@keyframes dustParticle {
  0% { opacity: 0; transform: translateX(0) scale(0); }
  50% { opacity: 1; transform: translateX(-50px) scale(1); }
  100% { opacity: 0; transform: translateX(-100px) scale(0); }
}
```
**🔧 Cara Ubah:**
- **Lebih banyak partikel:** Edit `[...Array(8)]` ke `[...Array(12)]`
- **Kecepatan berbeda:** Ganti `3s` ke `2s` untuk lebih cepat

### 4. **DELAY ANIMASI**
**📂 Lokasi:** Dalam komponen TSX dengan `style={{ animationDelay: '0.8s' }}`
```tsx
// Subscription Badge: 0.2s
// Headline: 0.4s  
// Description: 0.6s
// Button: 0.8s
// Car: 1s
```

---

## 🚀 **CARA CEPAT MENGUBAH ANIMASI**

### **Mengubah Kecepatan Bounce Mobil:**
```tsx
// Di HeroSection.tsx line ~85
animation: isVisible ? 'carBounce 6s ease-in-out infinite' : 'none'
//                              ↑ Ganti 6s ke 4s (lebih cepat) atau 8s (lebih lambat)
```

### **Mengubah Intensitas Bounce:**
```css
/* Di HeroSection.css */
@keyframes carBounce {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-30px) rotate(3deg); } /* ← Lebih tinggi & rotasi kuat */
}
```

### **Menambah Efek Dramatic:**
Ganti `carBounce` dengan `carBounceHard` di CSS (sudah tersedia)

### **Mengubah Warna Gradient Background:**
```tsx
// Ganti className di line ~15
bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-600
//                    ↑ Ganti warna sesuai keinginan
// Contoh: from-purple-400 via-pink-500 to-red-600
```

---

## 🎭 **VARIASI ANIMASI YANG TERSEDIA**

### **1. Bounce Mobil:**
- `carBounce` - Normal (default)
- `carBounceHard` - Lebih dramatic

### **2. Partikel Debu:**
- `dustParticle` - Normal (default)  
- `dustParticleFast` - Lebih cepat dengan rotasi

### **3. Text Shadow:**
- `text-shadow` - Normal (default)
- `text-shadow-strong` - Lebih tebal

### **4. Glass Effect:**
- `glass-effect` - Normal (default)
- `glass-effect-strong` - Lebih blur

---

## 📱 **RESPONSIFITAS**

### **Desktop (lg):**
- Mobil: `w-[500px] h-80`
- Text: `text-7xl`

### **Mobile:**
- Mobil: `w-96 h-64`  
- Text: `text-5xl`

---

## ⚡ **QUICK CUSTOMIZATION**

### **Untuk Racing Theme:**
```css
/* Ganti warna mobil dari merah ke biru racing */
bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
```

### **Untuk Desert Rally:**
```css
/* Tambah efek sandy */
.sandy-effect {
  filter: sepia(20%) saturate(120%) hue-rotate(15deg);
}
```

### **Untuk Malam Hari:**
```tsx
// Ganti background gradient
bg-gradient-to-br from-gray-800 via-gray-900 to-black
```

---

## 🔍 **DEBUGGING ANIMASI**

### **Jika Animasi Tidak Muncul:**
1. Pastikan import CSS: `import './HeroSection.css';`
2. Cek console browser untuk error
3. Pastikan `isVisible` state berubah ke `true`

### **Jika Animasi Terlalu Cepat/Lambat:**
```tsx
// Ganti duration di transition-all
transition-all duration-1000  // ← 1 detik
//                    ↑ Ganti ke duration-2000 (2 detik)
```

---

**✨ Total ada 6 jenis animasi berbeda yang bisa dikustomisasi sesuai kebutuhan!**
