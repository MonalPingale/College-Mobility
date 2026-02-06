package com.example.CollegeMobility.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class SessionAttendanceInitDTO {

    // ===== TOP LEVEL DATA =====
    private String teacherName;
    private String message;          // 🔔 NEW (attendance recorded or not)
    private SessionDTO session;
    private List<StudentAttendanceDTO> mentees;

    // ================= SESSION DTO =================
    public static class SessionDTO {
        public Long sessionId;
        public String sessionTitle;
        public String topic;
        public LocalDate sessionDate;
        public LocalTime startTime;
        public int durationMinutes;
        public String status;
    }

    // ================= STUDENT + ATTENDANCE DTO =================
    public static class StudentAttendanceDTO {
        public Long rollNo;           // 🔥 long as discussed
        public String name;
        public String email;
        public String department;

        // present / absent / null
        public String attendanceStatus;
    }

    // ================= GETTERS & SETTERS =================

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public SessionDTO getSession() {
        return session;
    }

    public void setSession(SessionDTO session) {
        this.session = session;
    }

    public List<StudentAttendanceDTO> getMentees() {
        return mentees;
    }

    public void setMentees(List<StudentAttendanceDTO> mentees) {
        this.mentees = mentees;
    }
}
