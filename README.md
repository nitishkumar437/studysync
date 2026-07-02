# 🎓 StudySync

A modern **Full Stack Student Productivity & Study Management System** built with the **MERN Stack**.

StudySync helps students organize their academic life by managing notes, daily tasks, study schedules, and personal profiles in one place.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing

### 📊 Dashboard
- Study Statistics
- Productivity Overview
- Quick Actions
- Recent Notes
- Task Summary

### 📝 Notes
- Create Notes
- Edit Notes
- Delete Notes
- Search Notes

### ✅ Task Manager
- Add Tasks
- Update Task Status
- Delete Tasks
- Track Progress

### 📅 Study Planner
- Create Study Plans
- Daily Schedule
- Organize Subjects
- Manage Study Sessions

### 👤 User Profile
- Edit Personal Information
- Upload Profile Picture
- Image Cropping
- Cloudinary Image Storage

### 📱 Responsive UI
- Mobile Friendly
- Modern Dashboard
- Clean User Interface

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- Lucide React
- Browser Image Compression

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary

---

# 📁 Project Structure

```text
StudySync
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/nitishkumar437/studysync.git
```

```bash
cd studysync
```

---

## 2️⃣ Backend Setup

```bash
cd backend
```

Install Dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET
```

Run Backend

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd ../frontend
```

Install Dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

---

# 🌐 Local URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 📌 Future Improvements

- Email Verification
- Password Reset
- Dark Mode
- Study Reminder Notifications
- File Attachments
- Calendar Integration
- Pomodoro Timer

---

# 👨‍💻 Author

**Nitish Kumar**

BCA Student • Purnea University

GitHub:
https://github.com/nitishkumar437

---

⭐ If you like this project, don't forget to Star the repository.