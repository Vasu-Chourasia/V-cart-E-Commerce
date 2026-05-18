# V-Cart — Full Stack E-Commerce Platform

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (email/password + Google OAuth via Firebase)
- Product catalog with category and sub-category filtering, search, and sorting
- Product detail page with 4-image gallery and size selection
- Persistent cart (synced to MongoDB)
- Checkout with Cash on Delivery and Razorpay payment gateway
- Order history with real-time status tracking
- AI voice assistant for hands-free navigation
- Admin panel to manage products and orders

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (httpOnly cookies), Firebase Google OAuth |
| Payments | Razorpay |
| Images | Cloudinary |

## Project Structure

```
V-cart E-Commerce/
├── backend/       # Express API server
├── frontend/      # React user-facing app (port 5173)
└── admin/         # React admin panel (port 5174)
```

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/V-cart-E-Commerce.git
cd V-cart-E-Commerce
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env   # fill in your credentials
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # fill in your Firebase and Razorpay keys
npm run dev
```

### 4. Admin panel setup

```bash
cd admin
npm install
npm run dev
```

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for all required variables.

## Contact

- Email: vdevwork1906@gmail.com
- Phone: +91-9131755102
