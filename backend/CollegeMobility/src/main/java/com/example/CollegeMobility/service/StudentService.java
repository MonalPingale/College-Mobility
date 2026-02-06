package com.example.CollegeMobility.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CollegeMobility.details.StudentLoginRequest;
import com.example.CollegeMobility.details.StudentUserDetails;
import com.example.CollegeMobility.dto.*;
import com.example.CollegeMobility.entity.*;
import com.example.CollegeMobility.entity.Students;
import com.example.CollegeMobility.interf.Studentinterface;
import com.example.CollegeMobility.repository.AttendanceRepository;
import com.example.CollegeMobility.repository.SessionRepository;
import com.example.CollegeMobility.repository.StudentRepository;
import com.example.CollegeMobility.util.JWTutilsToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class StudentService implements Studentinterface {

    private final StudentRepository studentRepository;
    private final JWTutilsToken jwtUtilsToken;
    
    @Autowired
    private SessionRepository sessionRepository;
    
    @Autowired
    private AttendanceRepository attendanceRepository;

    public StudentService(StudentRepository studentRepository,
                              JWTutilsToken jwtUtilsToken) {
        this.studentRepository = studentRepository;
        this.jwtUtilsToken = jwtUtilsToken;
    }

    @Override
    public String login(StudentLoginRequest request, HttpServletResponse response) {

        Optional<Students> opt =
                studentRepository.findByEmail(request.getEmail());

        if (opt.isEmpty()) {
            return null;
        }

        Students student = opt.get();

        if (!student.getPassword().equals(request.getPassword())) {
            return null;
        }

        // Student → UserDetails
        StudentUserDetails userDetails =
                new StudentUserDetails(student);

        // 🔐 Generate JWT
        String token = jwtUtilsToken.generateToken(userDetails);

        // 🍪 Store in Cookie
        Cookie cookie = new Cookie("STUDENT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);

        // IMPORTANT for cross-origin
        cookie.setSecure(false); // true only if HTTPS
        response.addHeader("Set-Cookie",
                "STUDENT_TOKEN=" + token +
                "; Path=/" +
                "; HttpOnly" +
                "; SameSite=None"
        );

        response.addCookie(cookie);

        return "Login successful";
    }
    
    
    @Override
    public List<Sessions> getSessionsForStudent(String studentEmail) {

        // 1️⃣ Student fetch
        Students student = studentRepository
                .findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // 2️⃣ Mentor fetch
        Teachers mentor = student.getMentor();

        if (mentor == null) {
            throw new RuntimeException("Mentor not assigned yet");
        }

        // 3️⃣ Fetch mentor's sessions
        return sessionRepository.findByTeacher(mentor);
    }
    
    
    
    @Override
    public List<StudentSessionAttendanceDTO>    getMySessionAttendance(String studentEmail) {

        // 1️⃣ Student fetch
        Students student = studentRepository
                .findByEmail(studentEmail)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        // 2️⃣ Mentor check
        Teachers mentor = student.getMentor();
        if (mentor == null) {
            return List.of(); // no mentor → no sessions
        }

        // 3️⃣ Mentor sessions
        List<Sessions> sessions =
                sessionRepository.findByTeacher(mentor);

        // 4️⃣ Build response
        List<StudentSessionAttendanceDTO> result =
                new ArrayList<>();

        for (Sessions session : sessions) {

            StudentSessionAttendanceDTO dto =
                    new StudentSessionAttendanceDTO();

            dto.setSessionId(session.getSessionId());
            dto.setSessionTitle(session.getSessionTitle());
            dto.setSessionDate(session.getSessionDate());
            dto.setStartTime(session.getStartTime());
            dto.setSessionStatus(session.getStatus());

            // 🔎 Attendance check
            attendanceRepository
                .findBySessionAndStudent(session, student)
                .ifPresentOrElse(
                    att -> dto.setAttendanceStatus(att.getStatus()),
                    () -> dto.setAttendanceStatus("not_marked")
                );

            result.add(dto);
        }

        return result;
    }
    
    private Students getStudentByEmail(String email) {
        return studentRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));
    }

    @Override
    public List<StudentSessionAttendanceDTO>
    getActiveSessionsForStudent(String studentEmail) {

        Students student = getStudentByEmail(studentEmail);
        Teachers mentor = student.getMentor();

        if (mentor == null) return List.of();

        List<Sessions> sessions =
                sessionRepository
                .findByTeacherAndStatusIn(
                    mentor,
                    List.of("running", "scheduled")
                );

        List<StudentSessionAttendanceDTO> result =
                new ArrayList<>();

        for (Sessions session : sessions) {

            StudentSessionAttendanceDTO dto =
                    new StudentSessionAttendanceDTO();

            dto.setSessionId(session.getSessionId());
            dto.setSessionTitle(session.getSessionTitle());
            dto.setSessionDate(session.getSessionDate());
            dto.setStartTime(session.getStartTime());
            dto.setSessionStatus(session.getStatus());
            dto.setAttendanceStatus("not_started");

            result.add(dto);
        }

        return result;
    }

    
    @Override
    public List<StudentSessionAttendanceDTO>
    getCompletedSessionsForStudent(String studentEmail) {

        Students student = getStudentByEmail(studentEmail);
        Teachers mentor = student.getMentor();

        if (mentor == null) return List.of();

        List<Sessions> sessions =
                sessionRepository
                .findByTeacherAndStatus(
                    mentor, "completed");

        List<StudentSessionAttendanceDTO> result =
                new ArrayList<>();

        for (Sessions session : sessions) {

            StudentSessionAttendanceDTO dto =
                    new StudentSessionAttendanceDTO();

            dto.setSessionId(session.getSessionId());
            dto.setSessionTitle(session.getSessionTitle());
            dto.setSessionDate(session.getSessionDate());
            dto.setStartTime(session.getStartTime());
            dto.setSessionStatus(session.getStatus());

            // attendance fetch
            attendanceRepository
                .findBySessionAndStudent(session, student)
                .ifPresentOrElse(
                    a -> dto.setAttendanceStatus(a.getStatus()),
                    () -> dto.setAttendanceStatus("absent")
                );

            result.add(dto);
        }

        return result;
    }
    
    
    @Override
    public StudentProfileDTO getMyProfile(String studentEmail) {

        Students student = studentRepository
                .findByEmail(studentEmail)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        StudentProfileDTO dto = new StudentProfileDTO();

        dto.setRollNo(student.getRollNo());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setDepartment(student.getDepartment());

        if (student.getMentor() != null) {
            dto.setMentorId(student.getMentor().getTeacherId());
            dto.setMentorName(student.getMentor().getTeacherName());
            dto.setMentorEmail(student.getMentor().getEmail());
        }

        return dto;
    }
    
    
    @Override
    public StudentAttendanceSummaryDTO getAttendanceSummary(String studentEmail) {

        Students student = studentRepository
                .findByEmail(studentEmail)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        Teachers mentor = student.getMentor();
        if (mentor == null) {
            throw new RuntimeException("Mentor not assigned");
        }

        long totalSessions =
                sessionRepository.countByTeacher_TeacherId(
                        mentor.getTeacherId());

        long attendedSessions =
                attendanceRepository
                        .countByStudent_RollNoAndSession_Teacher_TeacherIdAndStatus(
                                student.getRollNo(),
                                mentor.getTeacherId(),
                                "present");

        double percentage = 0;
        if (totalSessions > 0) {
            percentage = (attendedSessions * 100.0) / totalSessions;
        }

        StudentAttendanceSummaryDTO dto =
                new StudentAttendanceSummaryDTO();

        dto.setStudentName(student.getName());
        dto.setMentorName(mentor.getTeacherName());
        dto.setTotalSessionsByMentor(totalSessions);
        dto.setAttendedSessions(attendedSessions);
        dto.setAttendancePercentage(percentage);

        return dto;
    }




}