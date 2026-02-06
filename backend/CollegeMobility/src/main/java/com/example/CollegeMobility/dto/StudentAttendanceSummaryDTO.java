package com.example.CollegeMobility.dto;

public class StudentAttendanceSummaryDTO {

    private String studentName;
    private String mentorName;

    private long totalSessionsByMentor;
    private long attendedSessions;

    private double attendancePercentage;

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getMentorName() {
		return mentorName;
	}

	public void setMentorName(String mentorName) {
		this.mentorName = mentorName;
	}

	public long getTotalSessionsByMentor() {
		return totalSessionsByMentor;
	}

	public void setTotalSessionsByMentor(long totalSessionsByMentor) {
		this.totalSessionsByMentor = totalSessionsByMentor;
	}

	public long getAttendedSessions() {
		return attendedSessions;
	}

	public void setAttendedSessions(long attendedSessions) {
		this.attendedSessions = attendedSessions;
	}

	public double getAttendancePercentage() {
		return attendancePercentage;
	}

	public void setAttendancePercentage(double attendancePercentage) {
		this.attendancePercentage = attendancePercentage;
	}

   
}
