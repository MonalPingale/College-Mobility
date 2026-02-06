package com.example.CollegeMobility.dto;

import java.util.List;

public class TeacherDashboardSummaryDTO {

    private String teacherName;

    private long totalMentees;
    private long totalSessions;
    private long completedSessions;
    private long runningSessions;
    private long scheduledSessions;

    private double averageAttendancePercentage;

    private List<StudentAttendanceDTO> students;

    // ---------- INNER DTO ----------
    public static class StudentAttendanceDTO {
        public Long rollNo;
        public String name;
        public double attendancePercentage;
    }

    // getters & setters
    public String getTeacherName() { return teacherName; }
    public void setTeacherName(String teacherName) { this.teacherName = teacherName; }

    public long getTotalMentees() { return totalMentees; }
    public void setTotalMentees(long totalMentees) { this.totalMentees = totalMentees; }

    public long getTotalSessions() { return totalSessions; }
    public void setTotalSessions(long totalSessions) { this.totalSessions = totalSessions; }

    public long getCompletedSessions() { return completedSessions; }
    public void setCompletedSessions(long completedSessions) { this.completedSessions = completedSessions; }

    public long getRunningSessions() { return runningSessions; }
    public void setRunningSessions(long runningSessions) { this.runningSessions = runningSessions; }

    public long getScheduledSessions() { return scheduledSessions; }
    public void setScheduledSessions(long scheduledSessions) { this.scheduledSessions = scheduledSessions; }

    public double getAverageAttendancePercentage() { return averageAttendancePercentage; }
    public void setAverageAttendancePercentage(double averageAttendancePercentage) {
        this.averageAttendancePercentage = averageAttendancePercentage;
    }

    public List<StudentAttendanceDTO> getStudents() { return students; }
    public void setStudents(List<StudentAttendanceDTO> students) { this.students = students; }
}
