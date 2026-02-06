package com.example.CollegeMobility.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

import com.example.CollegeMobility.details.TeacherLoginRequest;
import com.example.CollegeMobility.dto.AssignStudentsDTO;
import com.example.CollegeMobility.dto.AttendanceDTO;
import com.example.CollegeMobility.dto.SessionAttendanceInitDTO;
import com.example.CollegeMobility.dto.SessionCreateDTO;
import com.example.CollegeMobility.dto.StudentAttendancePercentageDTO;
import com.example.CollegeMobility.dto.TeacherDashboardSummaryDTO;
import com.example.CollegeMobility.entity.Sessions;
import com.example.CollegeMobility.entity.Students;
import com.example.CollegeMobility.entity.Teachers;
import com.example.CollegeMobility.service.TeacherService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

	@Autowired
    private  TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    // ✅ TEACHER LOGIN API
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody TeacherLoginRequest request,
            HttpServletResponse response) {

        String result = teacherService.login(request, response);

        if (result == null) {
            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(result);
    }
    
    
    
    // 🔐 SECURED PROFILE API
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName(); // extracted from JWT

        Teachers teacher = teacherService.getProfileByEmail(email);

        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }

        // ❗ Password hide
        teacher.setPassword(null);

        return ResponseEntity.ok(teacher);
    }
    
    
    // 🔐 Teacher ला unassigned students दिसतील
    @GetMapping("/students/unassigned")
    public ResponseEntity<List<Students>> getUnassignedStudents() {

        List<Students> students =teacherService.getStudentsWithoutMentor();

        return ResponseEntity.ok(students);
    }
    
    
    // 🔐 Assign selected students to logged-in teacher
    @PostMapping("/students/assign")
    public ResponseEntity<String> assignStudents(
            @RequestBody AssignStudentsDTO dto) {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String teacherEmail = auth.getName(); // from JWT

        teacherService.assignStudentsToTeacher(
                teacherEmail,
                dto.getStudentRollNos()
        );

        return ResponseEntity.ok("Students assigned to mentor successfully");
    }
    
    // 🔐 Create mentoring session
    @PostMapping("/sessions")
    public ResponseEntity<String> createSession(
            @RequestBody SessionCreateDTO dto) {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String teacherEmail = auth.getName(); // from JWT

        teacherService.createSession(teacherEmail, dto);

        return ResponseEntity.ok("Session created successfully");
    }
    
    @GetMapping("/sessions")
    public List<Sessions> getMySessions(Authentication authentication) {

        String teacherEmail = authentication.getName();

        return teacherService.getAllSessionsOfTeacher(teacherEmail);
    }

    
    @GetMapping("/sessions/{sessionId}/mentees")
    public List<Students> getMenteesBySession(
            @PathVariable Long sessionId,
            Authentication authentication) {

        String teacherEmail = authentication.getName();

        return teacherService.getMenteesBySession(teacherEmail, sessionId);
    }
    
    @PostMapping("/sessions/{sessionId}/attendance")
    public ResponseEntity<?> markAttendance(
            @PathVariable Long sessionId,
            @RequestBody List<AttendanceDTO> attendanceList,
            Authentication authentication) {

        String teacherEmail = authentication.getName();

        teacherService.markAttendance(
                teacherEmail,
                sessionId,
                attendanceList
        );

        // ✅ JSON response
        return ResponseEntity.ok(
            Map.of(
                "message", "Attendance marked successfully",
                "sessionId", sessionId
            )
        );
    }


    
    @GetMapping("/students/attendance-percentage")
    public List<StudentAttendancePercentageDTO>
    getStudentsAttendance(Authentication authentication) {

        String teacherEmail = authentication.getName();
        return teacherService
                .getStudentsAttendancePercentage(teacherEmail);
    }

    @GetMapping("/session/{sessionId}/attendance-init")
    public SessionAttendanceInitDTO getSessionAttendanceInit(
            @PathVariable Long sessionId,
            Authentication authentication) {

        String teacherEmail = authentication.getName();

        return teacherService.getSessionAttendanceInit(
                teacherEmail,
                sessionId
        );
    }

    @GetMapping("/dashboard-summary")
    public TeacherDashboardSummaryDTO getDashboard(
            Authentication authentication) {

        String teacherEmail = authentication.getName();

        return teacherService.getDashboardSummary(teacherEmail);
    }
    
    
    @GetMapping("/sessions/active-completed")
    public List<Sessions> getRunningAndCompletedSessions(
            Authentication authentication) {

        String teacherEmail = authentication.getName();

        return teacherService
                .getRunningAndCompletedSessions(teacherEmail);
    }

}