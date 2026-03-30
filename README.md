<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00FF99,100:0066FF&height=200&section=header&text=GitHub%20Live%20Sites%20Hub&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=35" />
</p>

<p align="center">
  <b>A modern developer dashboard to track, manage & preview live projects</b>
</p>

<p align="center">
  <a href="https://build-lab-kappa.vercel.app">🌐 Live Demo</a> •
  <a href="https://github.com/adityasing9">👨‍💻 Author</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-HTML/CSS/JS-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-Vercel-black?style=flat-square&logo=vercel" />
  <img src="https://img.shields.io/badge/Database-MongoDB-green?style=flat-square&logo=mongodb" />
  <img src="https://img.shields.io/badge/Auth-JWT-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Live-success?style=flat-square" />
</p>

---

## 🚀 Overview

GitHub Live Sites Hub is a **full-stack project dashboard** that lets you:

- Automatically fetch your GitHub Pages sites  
- Manage custom deployments  
- Preview live websites instantly  
- Control everything through a secure admin panel  

Built with a **serverless architecture**, it runs entirely on Vercel with MongoDB as the backend.

---

## ✨ Key Features

### 🔍 GitHub Integration
- Fetch repositories dynamically  
- Detect GitHub Pages deployments  
- Auto-generate live links  

### ➕ Custom Site Manager
- Add external projects  
- Store permanently in MongoDB  
- Full CRUD support  

### 🔐 Admin System
- JWT-based authentication  
- Secure edit/delete controls  
- Protected admin actions  

### 🖼 Smart Preview Engine
- Live iframe preview  
- Screenshot fallback (Microlink)  
- Manual image upload support  

### ⚡ Live Mode
- Toggle real-time preview  
- Embedded site player  

### 🎨 UI Experience
- Terminal-inspired design  
- Dark modern theme  
- Fast, responsive interface  

---

## 🛠 Tech Stack

Frontend → HTML • CSS • JavaScript  
Backend → Vercel Serverless Functions  
Database → MongoDB Atlas  
Authentication → JWT  
Preview → Microlink API  

---

## 📂 Project Structure

github-hub/  
├── index.html  
├── api/  
│   ├── _lib.js  
│   ├── auth.js  
│   ├── auth/change-password.js  
│   ├── sites.js  
│   └── sites/[id].js  
├── vercel.json  
├── package.json  
└── .env.example  

---

## ⚙️ Deployment

### MongoDB Setup
- Create a free MongoDB Atlas cluster  
- Add database user  
- Allow access: 0.0.0.0/0  
- Get connection string  

### Vercel Deployment
- Push project to GitHub  
- Import into Vercel  
- Add environment variables:

MONGODB_URI=your_connection_string  
JWT_SECRET=your_secure_secret  
ADMIN_PASSWORD=your_admin_password  

- Deploy  

🌐 Live: https://build-lab-kappa.vercel.app  

---

## 💻 Local Development

npm install  
npm install -g vercel  
cp .env.example .env  
vercel dev  

Runs at: http://localhost:3000  

---

## 🔐 Admin Access

Click **[admin login]** in UI → enter password  

Admin capabilities:
- Add sites  
- Edit sites  
- Delete sites  
- Upload preview images  

---

## 🧪 API

POST /api/auth → login  
GET /api/sites → fetch  
POST /api/sites → create  
PUT /api/sites/:id → update  
DELETE /api/sites/:id → delete  

---

## 🧠 System Flow

GitHub → Fetch repos → Filter pages  
MongoDB → Store custom sites  
Frontend → Merge + render  
Preview → iframe → fallback → image  

---

## ⚠️ Limitations

- GitHub edits are temporary  
- Some sites block iframe previews  
- No analytics yet  

---

## 🔮 Future Improvements

- Password hashing (bcrypt)  
- Persist GitHub edits  
- Analytics dashboard  
- Theme toggle  
- Notifications  

---

## 👨‍💻 Author

Aditya Singh  
https://github.com/adityasing9  

---

<p align="center">
  ⭐ Star this repo if you like it
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00FF99,100:0066FF&height=120&section=footer"/>
</p>