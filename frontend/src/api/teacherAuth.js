import axios from "axios";

const BASE_URL = "http://localhost:2121";

// TEACHER LOGIN
export const teacherLogin = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/teacher/login`,
    data,
    { withCredentials: true } // JWT cookie
  );
  return response.data;
};
export const fetchMentorMentees = async () => {
  const res = await axios.get(
    `${BASE_URL}/teacher/students/attendance-percentage`,
    { withCredentials: true }
  );
  return res.data;
};

// 🔹 Fetch unassigned students
export const fetchUnassignedStudents = async () => {
  const res = await axios.get(
    `${BASE_URL}/teacher/students/unassigned`,
    { withCredentials: true }
  );
  return res.data;
};

export const fetchTeacherSessions = async () => {
  const res = await fetch(
    "http://localhost:2121/teacher/sessions",
    {
      method: "GET",
      credentials: "include", // 🔴 TEACHER_TOKEN cookie
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch teacher sessions");
  }

  return res.json();
};

// 🔹 GET attendance init data
export const fetchSessionAttendanceInit = async (sessionId) => {
  const res = await fetch(
    `http://localhost:2121/teacher/session/${sessionId}/attendance-init`,
    {
      method: "GET",
      credentials: "include", // TEACHER_TOKEN
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch attendance data");
  }

  return res.json();
};

// 🔹 POST / UPDATE attendance
export const submitSessionAttendance = async (sessionId, attendanceList) => {
  const res = await fetch(
    `http://localhost:2121/teacher/sessions/${sessionId}/attendance`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(attendanceList),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to submit attendance");
  }

  return res.json();
};


// teacherAuth.js
export const createSession = async (payload) => {
  const res = await fetch(
    "http://localhost:2121/teacher/sessions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // JWT cookie
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create session");
  }

  return res.text(); // backend returns string
};



// src/api/teacherAuth.js

export const fetchDashboardSummary = async () => {
  const res = await fetch(
    "http://localhost:2121/teacher/dashboard-summary",
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load dashboard summary");
  }

  return res.json();
};

export const assignStudentsToMentor = async (payload) => {
  const res = await axios.post(
    `${BASE_URL}/teacher/students/assign`,
    payload,
    { withCredentials: true } // JWT cookie
  );
  return res.data;
};
