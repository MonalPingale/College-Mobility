package com.example.CollegeMobility.interf;

import java.util.List;

import com.example.CollegeMobility.details.TeacherLoginRequest;
import com.example.CollegeMobility.dto.AttendanceDTO;
import com.example.CollegeMobility.dto.*;
import com.example.CollegeMobility.dto.SessionCreateDTO;
import com.example.CollegeMobility.dto.StudentAttendancePercentageDTO;
import com.example.CollegeMobility.entity.Sessions;
import com.example.CollegeMobility.entity.Students;
import com.example.CollegeMobility.entity.Teachers;

import jakarta.servlet.http.HttpServletResponse;

public interface TeacherInterfc 
{
	
	String login(TeacherLoginRequest request, HttpServletResponse response);
	 Teachers getProfileByEmail(String email);
	 List<Students> getStudentsWithoutMentor();
	 void assignStudentsToTeacher(String teacherEmail, List<Long> studentRollNos);
	 void createSession(String teacherEmail, SessionCreateDTO dto);
	 List<Sessions> getAllSessionsOfTeacher(String teacherEmail);
	 public List<Students> getMenteesBySession(
	            String teacherEmail,
	            Long sessionId);

	 String markAttendance(
	            String teacherEmail,
	            Long sessionId,
	            List<AttendanceDTO> attendanceList);
	 List<StudentAttendancePercentageDTO>
	 getStudentsAttendancePercentage(String teacherEmail);
	 SessionAttendanceInitDTO getSessionAttendanceInit(
	            String teacherEmail,
	            Long sessionId);
	 TeacherDashboardSummaryDTO getDashboardSummary(String teacherEmail);

	    List<Sessions> getRunningAndCompletedSessions(String teacherEmail);
}
