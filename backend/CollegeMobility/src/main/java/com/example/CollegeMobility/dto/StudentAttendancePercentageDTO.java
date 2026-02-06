package com.example.CollegeMobility.dto;

public class StudentAttendancePercentageDTO {

    private Long rollNo;
    private String name;
    private String email;

    private long totalSessions;
    private long presentCount;
    private long absentCount;
    private double attendancePercentage;
	public Long getRollNo() {
		return rollNo;
	}
	public void setRollNo(Long rollNo) {
		this.rollNo = rollNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public long getTotalSessions() {
		return totalSessions;
	}
	public void setTotalSessions(long totalSessions) {
		this.totalSessions = totalSessions;
	}
	public long getPresentCount() {
		return presentCount;
	}
	public void setPresentCount(long presentCount) {
		this.presentCount = presentCount;
	}
	public long getAbsentCount() {
		return absentCount;
	}
	public void setAbsentCount(long absentCount) {
		this.absentCount = absentCount;
	}
	public double getAttendancePercentage() {
		return attendancePercentage;
	}
	public void setAttendancePercentage(double attendancePercentage) {
		this.attendancePercentage = attendancePercentage;
	}

    
}