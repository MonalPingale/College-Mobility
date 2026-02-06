package com.example.CollegeMobility.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.CollegeMobility.details.StudentLoginRequest;
import com.example.CollegeMobility.dto.*;
import com.example.CollegeMobility.entity.*;
import com.example.CollegeMobility.service.StudentService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/student")
public class StudentController {
	
	
	@Autowired
	private StudentService service;
	
	
	
	@PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody StudentLoginRequest request,
            HttpServletResponse response) {

        String result = service.login(request, response);

        if (result == null) {
            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(result);
    }
	
	
	  @GetMapping("/sessions")
	    public List<Sessions> getMySessions(Authentication authentication) {
	        System.out.println("AUTH NAME = " + authentication.getName());
	        return service.getSessionsForStudent(authentication.getName());
	    }
	  
	  @GetMapping("/my-attendance")
	  public List<StudentSessionAttendanceDTO>
	  getMyAttendance(Authentication authentication) {

	      String studentEmail = authentication.getName();
	      return service.getMySessionAttendance(studentEmail);
	  }

	  @GetMapping("/sessions/active")
	  public List<StudentSessionAttendanceDTO>
	  getActiveSessions(Authentication auth) {

	      return service
	              .getActiveSessionsForStudent(
	                      auth.getName());
	  }
	  
	  @GetMapping("/sessions/completed")
	  public List<StudentSessionAttendanceDTO>
	  getCompletedSessions(Authentication auth) {

	      return service
	              .getCompletedSessionsForStudent(
	                      auth.getName());
	  }

	  @GetMapping("/profile")
	  public StudentProfileDTO getProfile(Authentication authentication) {

	      String studentEmail = authentication.getName();
	      return service.getMyProfile(studentEmail);
	  }
	  
	  
	  @GetMapping("/attendance-summary")
	  public StudentAttendanceSummaryDTO getAttendanceSummary(
	          Authentication authentication) {

	      String studentEmail = authentication.getName();
	      return service.getAttendanceSummary(studentEmail);
	  }



}
