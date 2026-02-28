# HRMS Lite – Full Stack Application

HRMS Lite is a lightweight Human Resource Management System built using **Node.js, Express, MySQL, and React (Vite)**.

This application allows an admin to:

- Manage employee records
- Track daily attendance
- View dashboard analytics
- Filter attendance by date range
- View detailed employee attendance history

This project demonstrates full-stack development skills including backend API design, database modeling, frontend UI implementation, error handling, and production-ready project structuring.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- Raw SQL Queries
- dotenv

### Frontend
- React (Vite)
- React Router DOM
- Axios
- React Hot Toast

---

## Features Implemented

### Employee Management
- Add employee
- Delete employee
- View employee list

### Attendance Management
- Mark attendance (Present / Absent)
- Prevent duplicate attendance per day
- View employee attendance history
- Filter attendance by date range

### Dashboard
- Total Employees
- Present Today
- Absent Today

### UI & UX
- Circular loading indicators
- Toast notifications for error handling
- 404 Not Found page
- Reset filter functionality
- Clean and structured layout

---


---

# Assumptions

- Single admin user (no authentication required)
- Attendance recorded once per employee per day
- Basic HR functionality only (no payroll, leave management)

---

# Best Practices Followed

- Environment variables used for configuration
- `.env` excluded from Git
- Proper HTTP status codes
- Error handling implemented
- Clean project structure (monorepo setup)
- Single command to run entire app

---

# Assessment Coverage

- RESTful API design
- Database modeling & aggregation
- Date-based filtering
- Dashboard analytics
- Production-ready UI
- Error handling & validations
- Clean deployment structure

---

# Author

**Karamveer Garathi**  
Full Stack Developer  
(Node.js | React | MySQL)

---

# Project Status

✔ Backend Completed  
✔ Frontend Completed  
✔ Filter Feature Implemented  
✔ Dashboard Implemented  
✔ Environment Configured  
✔ Single Command Setup  

---

# HRMS Lite – Complete

## Environment Variables

Create a `.env` file inside the **backend** folder:
DB_TABLE_NAME = db name
DB_USER = db user
DB_PASSWORD = db pass
PORT = db port

Create a `.env` file inside the **frontend** folder:
VITE_API_BASE_URL= your api base url


How to Run the Application Locally

## Clone the Repository

run this "npm install-all" inside root folder "HRMS"
run this "npm run dev" to start both backend and frontend application

