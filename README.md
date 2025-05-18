# 📁 File Versioning & Access Control System

A full-stack MERN application that enables users to create repositories, upload and manage files with version control, and enforce access restrictions. Built with React, Node.js, Express, and MongoDB.

---

## 🚀 Features

- ✅ **User Authentication**
  - Register, login, logout using JWT tokens.
- 📁 **Repository Management**
  - Create, rename, and delete personal repositories.
- 📂 **File Management**
  - Upload files, view list, update files (auto-versioning), and download.
- 🕓 **Version History**
  - View previous versions with timestamps and download any.
- 🔐 **Access Control**
  - Only the repository owner can manage files or access sensitive actions.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Context API for state management
- Tailwind CSS for UI
- Axios for API requests
- React Router v6

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin communication

---


---

## ⚙️ Setup Instructions

### 📦 Clone the Repository

```bash
git clone https://github.com/Deepak-11-03/file-versioning.git

```

---

## Backend Setup

```bash
cd backend
npm install


MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```
---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev

VITE_API_URL= <Backend Base url>
```


## Architecture Overview

### 🖥️ Frontend

- ⚛️ **React** + **Context API** for managing authentication and user state.
- 🔐 Protected routing using a `PrivateRoute` component.
- 🔗 API requests handled using **Axios**.
- 🎨 **Tailwind CSS** for responsive and modern UI styling.

### 🖥️ Backend

- 🧩 **RESTful API** built with **Express.js**.
- 🛢️ **MongoDB** with **Mongoose ODM** for schema-based modeling.
- 🔑 **JWT** used for securing user sessions and protected routes.

### 🗃️ Database Models

- **User**
  - `name`: String  
  - `email`: String  
  - `password`: Hashed string (bcrypt)

- **Repository**
  - `name`: String  
  - `owner`: ObjectId (Reference to `User`)

- **File**
  - `filename`: String  
  - `repository`: ObjectId (Reference to `Repository`)  
  - `versions`: Array of objects  
    - Each version includes:
      - `data`: Base64 string of file content  
      - `timestamp`: ISO date string



