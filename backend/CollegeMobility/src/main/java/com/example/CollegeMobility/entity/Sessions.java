package com.example.CollegeMobility.entity;


import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "sessions")
public class Sessions {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "session_id")
	    private Long sessionId;   // 🔥 int → Long


    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @JsonIgnore   // 🔥 THIS
    private Teachers teacher;

    private String sessionTitle;
    private String topic;
    private LocalDate sessionDate;
    private LocalTime startTime;
    private int durationMinutes;
    private String status;

    @OneToMany(mappedBy = "session")
    @JsonIgnore   // 🔥 THIS
    private List<Attendence> attendanceList;

	public Long getSessionId() {
		return sessionId;
	}

	public void setSessionId(Long sessionId) {
		this.sessionId = sessionId;
	}

	public Teachers getTeacher() {
		return teacher;
	}

	public void setTeacher(Teachers teacher) {
		this.teacher = teacher;
	}

	public String getSessionTitle() {
		return sessionTitle;
	}

	public void setSessionTitle(String sessionTitle) {
		this.sessionTitle = sessionTitle;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public LocalDate getSessionDate() {
		return sessionDate;
	}

	public void setSessionDate(LocalDate sessionDate) {
		this.sessionDate = sessionDate;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public int getDurationMinutes() {
		return durationMinutes;
	}

	public void setDurationMinutes(int durationMinutes) {
		this.durationMinutes = durationMinutes;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Attendence> getAttendanceList() {
		return attendanceList;
	}

	public void setAttendanceList(List<Attendence> attendanceList) {
		this.attendanceList = attendanceList;
	}

    
}