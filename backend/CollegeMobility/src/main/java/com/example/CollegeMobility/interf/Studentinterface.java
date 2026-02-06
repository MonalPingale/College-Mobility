package com.example.CollegeMobility.interf;

import java.util.List;

import com.example.CollegeMobility.details.StudentLoginRequest;
import com.example.CollegeMobility.dto.*;
import com.example.CollegeMobility.entity.Sessions;

import jakarta.servlet.http.HttpServletResponse;

public interface Studentinterface {

	String login(StudentLoginRequest request, HttpServletResponse response);
	 List<Sessions> getSessionsForStudent(String studentEmail);
	 List<StudentSessionAttendanceDTO>	 getMySessionAttendance(String studentEmail);
	// running + scheduled
	    List<StudentSessionAttendanceDTO>
	    getActiveSessionsForStudent(String studentEmail);

	    // completed
	    List<StudentSessionAttendanceDTO>
	    getCompletedSessionsForStudent(String studentEmail);
	    StudentProfileDTO getMyProfile(String studentEmail);
	    StudentAttendanceSummaryDTO getAttendanceSummary(String studentEmail);
	
}
