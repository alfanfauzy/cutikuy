# 🇮🇩 Cuti Kuy - Kalender Hari Libur Nasional Indonesia 2026

Aplikasi kalender interaktif untuk melihat hari libur nasional dan cuti bersama Indonesia tahun 2026 berdasarkan SKB 3 Menteri.

![Cuti Kuy Logo](/cuti-kuy-logo.png)

## ✨ Features

- 📅 **3 View Modes**: Tahun (Year), Bulan (Month), Daftar (List)
- 🌙 **Dark/Light Mode**: Smooth transition between themes
- 🔍 **Filter**: Libur Nasional, Cuti Bersama, atau Semua
- 🎨 **Color Coded**: 
  - 🔴 Merah = Libur Nasional
  - 🟠 Kuning = Cuti Bersama
  - 🔵 Biru = Hari Ini
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 💝 **Trakteer Integration**: Support the developer

## 🚀 Live Demo

[https://cuti-kuy.netlify.app](https://cuti-kuy.netlify.app) *(Coming soon)*

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/cuti-kuy.git
cd cuti-kuy

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🚀 Deployment

### Option 1: Deploy to Netlify (Recommended)

#### Method A: Git-based Deployment (Automatic)

1. **Push to GitHub:**
   ```bash
   # Create new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/cuti-kuy.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize Netlify
   - Select your `cuti-kuy` repository
   - Build settings will be auto-detected from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Done!** Your site will be live at `https://cuti-kuy-xxx.netlify.app`

#### Method B: Drag & Drop (Manual)

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)

3. Drag and drop the `dist` folder to the deploy area

4. Your site is live!

### Option 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 3: Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 📁 Project Structure

```
cuti-kuy/
├── public/
│   ├── cuti-kuy-logo.png    # Logo & favicon
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CalendarMonth.jsx   # Month calendar component
│   │   ├── CalendarView.jsx    # Main calendar view
│   │   ├── Footer.jsx          # Footer component
│   │   └── Header.jsx          # Header with logo & toggle
│   ├── data/
│   │   └── holidays.js         # Indonesia holidays data 2026
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── netlify.toml              # Netlify configuration
├── package.json
├── tailwind.config.js
└── README.md
```

## 📝 Data Source

Hari libur nasional Indonesia 2026 berdasarkan:
- SKB 3 Menteri (Kemenag, Kemenaker, Kemendikbud)
- Tanggal dapat berubah berdasarkan penetapan pemerintah

## 🤝 Support

Dukung pengembangan aplikasi ini:

[![Trakteer](https://img.shields.io/badge/Trakteer-Support-red?style=for-the-badge)](https://trakteer.id/alfan_fauzy/tip)

## 📄 License

MIT License - feel free to use and modify!

---

Made with ❤️ for Indonesia 🇮🇩
