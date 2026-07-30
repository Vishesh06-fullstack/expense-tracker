# 💰 Expense Tracker

A full-stack expense tracking application built with the MERN stack, featuring OTP-based email verification, JWT authentication, a secure password-reset flow, and a real-time analytics dashboard.

**Live Demo:** [https://expensetrackersfu.netlify.app](https://expensetrackersfu.netlify.app)
**Backend API:** `https://expense-tracker-nk2v.onrender.com/api/v1`

---

## ✨ Features

- **Authentication**
  - Email/password registration with OTP verification (via Nodemailer/Brevo)
  - JWT-based login with protected routes
  - Secure password reset using short-lived, single-use reset tokens (OTP → verify → token → reset, not a direct OTP-to-password change)
  - Resend OTP with a 60-second cooldown to prevent abuse
  - Request validation using **Zod** schemas on all auth endpoints

- **Expense Management**
  - Full CRUD for transactions (create, read, update, delete)
  - Ownership-based authorization — users can only access their own data
  - Category, payment mode, transaction type (income/expense), and notes per entry

- **Dashboard & Analytics**
  - Real-time summary cards: total income, total expense, balance, transaction count
  - Category-wise breakdown via MongoDB aggregation pipelines (pie chart)
  - Monthly income vs. expense trend (bar chart)
  - Editable, responsive transaction table (mobile card view + desktop table view)

- **Responsive UI**
  - Built with React + Tailwind CSS
  - Framer Motion animations on auth pages
  - Recharts for data visualization

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- Framer Motion
- React Toastify

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- Zod (request validation)
- Nodemailer / Brevo API (transactional email)

**Deployment**
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── model/
│   │   ├── User.js
│   │   └── ExpenseModel.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expense.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validate.js
│   ├── validation/
│   │   └── auth.valid.js
│   ├── otp.js
│   ├── db.js
│   ├── app.js
│   └── .env
│
└── frontend/
    ├── public/
    │   └── _redirects
    ├── src/
    │   ├── Signup.jsx
    │   ├── Login.jsx
    │   ├── OtpVerify.jsx
    │   ├── ResetPassword.jsx
    │   ├── Dashboard.jsx
    │   ├── AddTransaction.jsx
    │   ├── Transactions.jsx
    │   ├── ExpenseChart.jsx
    │   ├── ExpenseList.jsx
    │   ├── MonthlyIncomeExpenseChart.jsx
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── App.jsx
    └── .env
```

---

## ⚙️ Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- A Brevo / Nodemailer-compatible email account for sending OTPs

### 1. Clone the repository
```bash
git clone https://github.com/Vishesh06-fullstack/expense-tracker.git
cd expense-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
PORT=5000

# Email (Brevo)
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
```

Run the backend:
```bash
npm run start
```
Or with auto-reload during development:
```bash
npx nodemon app.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_FOOTER_NAME=YourName
```

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔑 Environment Variables Reference

| Variable | Where | Description |
|---|---|---|
| `MONGO_URI` | Backend | MongoDB Atlas connection string |
| `JWT_SECRET_KEY` | Backend | Secret used to sign/verify JWTs |
| `PORT` | Backend | Port the Express server runs on |
| `BREVO_API_KEY` | Backend | API key for sending transactional emails |
| `BREVO_SENDER_EMAIL` | Backend | Verified sender address in Brevo |
| `VITE_API_URL` | Frontend | Base URL of the backend API |
| `VITE_FOOTER_NAME` | Frontend | Name displayed in the footer (per-deployment customization) |

---

## 📡 API Endpoints

### Auth Routes — `/api/v1/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user, sends OTP to email |
| POST | `/verify-otp` | Verify OTP and activate account |
| POST | `/resend-otp` | Resend OTP (60s cooldown) |
| POST | `/login` | Login and receive JWT |
| POST | `/forgot-password` | Send OTP for password reset |
| POST | `/verify-reset-otp` | Verify reset OTP, returns a short-lived reset token |
| POST | `/reset-password` | Reset password using the reset token |

### Expense Routes — `/api/v1/expense` *(all require `Authorization: Bearer <token>`)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Add a new expense/income transaction |
| GET | `/` | Get all transactions for the logged-in user |
| GET | `/summary` | Get aggregated dashboard data (totals, category breakdown, monthly trend) |
| GET | `/:id` | Get a single transaction by ID |
| PUT | `/:id` | Update a transaction |
| DELETE | `/:id` | Delete a transaction |

---

## 🚀 Deployment Notes

- **Backend (Render):** Free-tier instances block outbound SMTP ports — email sending is handled via the **Brevo HTTP API** instead of direct SMTP, since HTTPS-based requests aren't blocked.
- **Frontend (Netlify):** A `_redirects` file (`/* /index.html 200`) is required in `frontend/public/` so client-side routing (React Router) works correctly on page refresh/direct URL access.
- **CORS:** The backend allows requests from both `localhost:5173` (development) and the deployed Netlify domain.

---

## 🧑‍🤝‍🧑 Contributors

- **Vishesh** — Backend, Auth, Deployment
- **Trisha** — Frontend, UI/UX

---

## 📄 License

This project is for educational purposes.
