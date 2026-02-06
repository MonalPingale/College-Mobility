import axios from "axios";

const BASE_URL = "http://localhost:2121";

// STUDENT LOGIN
export const studentLogin = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/student/login`,
    data,
    { withCredentials: true } // JWT cookie
  );
  return response.data;
};



// 🔵 Upcoming = active (running + scheduled)
export const fetchUpcomingSessions = async () => {
  const res = await axios.get(
    `${BASE_URL}/student/sessions/active`,
    { withCredentials: true }
  );
  return res.data;
};

// 🟢 Completed sessions
export const fetchCompletedSessions = async () => {
  const res = await axios.get(
    `${BASE_URL}/student/sessions/completed`,
    { withCredentials: true }
  );
  return res.data;
};

export const fetchStudentProfile = async () => {
  const res = await axios.get(
    `${BASE_URL}/student/profile`,
    { withCredentials: true } // 🔴 MOST IMPORTANT
  );
  return res.data;
};


// 🟣 Attendance summary (dashboard)
export const fetchAttendanceSummary = async () => {
  const res = await axios.get(
    `${BASE_URL}/student/attendance-summary`,
    { withCredentials: true }
  );
  return res.data;
};
