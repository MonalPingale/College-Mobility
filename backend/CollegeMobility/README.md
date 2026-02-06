# College Mobility – Mentor–Mentee Management System

College Mobility is a **Spring Boot based Mentor–Mentee Management System** developed as a college project.
The system helps teachers (mentors) and students (mentees) manage mentoring sessions, attendance, and academic interaction in a structured and secure way.

---

## 🚀 Project Overview

This application provides:
- Secure login for **Teachers and Students**
- Mentor–Mentee mapping
- Session creation and management
- Attendance tracking
- Dashboard summary and reports

The backend follows **RESTful API architecture** with **JWT-based authentication** and **role-based access control**.

---

## 🛠️ Tech Stack

- Java
- Spring Boot
- Spring Security (JWT)
- Hibernate / JPA
- MySQL
- Maven

---

## 👥 User Roles

### 👨‍🏫 Teacher (Mentor)
- Login securely
- View profile
- Assign unassigned students
- Create mentoring sessions
- View session-wise mentees
- Mark student attendance
- View attendance percentage
- View dashboard summary

### 👨‍🎓 Student (Mentee)
- Login securely
- View assigned sessions
- Check attendance
- View active and completed sessions
- View profile and attendance summary

---

## 🔐 Authentication & Security

- JWT token-based authentication
- Role-based access control (Teacher / Student)
- Passwords are encrypted
- Sensitive data is never exposed in API responses

---

## 📌 Teacher APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/teacher/login` | Teacher login |
| GET | `/teacher/profile` | Get teacher profile |
| GET | `/teacher/students/unassigned` | Fetch unassigned students |
| POST | `/teacher/students/assign` | Assign students to teacher |
| POST | `/teacher/sessions` | Create mentoring session |
| GET | `/teacher/sessions` | Get teacher sessions |
| GET | `/teacher/sessions/{id}/mentees` | Get session mentees |
| GET | `/teacher/session/{id}/attendance-init` | Initialize attendance |
| POST | `/teacher/sessions/{id}/attendance` | Mark attendance |
| GET | `/teacher/students/attendance-percentage` | Attendance report |
| GET | `/teacher/dashboard-summary` | Dashboard data |
| GET | `/teacher/sessions/active-completed` | Active & completed sessions |

---

## 📌 Student APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/student/login` | Student login |
| GET | `/student/profile` | View profile |
| GET | `/student/sessions` | View assigned sessions |
| GET | `/student/sessions/active` | Active sessions |
| GET | `/student/sessions/completed` | Completed sessions |
| GET | `/student/my-attendance` | View attendance |
| GET | `/student/attendance-summary` | Attendance summary |

---

## 📂 Project Structure
