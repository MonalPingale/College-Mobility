package com.example.CollegeMobility.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CollegeMobility.details.TeacherLoginRequest;
import com.example.CollegeMobility.details.TeacherUserDetails;
import com.example.CollegeMobility.dto.AttendanceDTO;
import com.example.CollegeMobility.dto.SessionAttendanceInitDTO;
import com.example.CollegeMobility.dto.SessionCreateDTO;
import com.example.CollegeMobility.dto.StudentAttendancePercentageDTO;
import com.example.CollegeMobility.dto.TeacherDashboardSummaryDTO;
import com.example.CollegeMobility.entity.Attendence;
import com.example.CollegeMobility.entity.Sessions;
import com.example.CollegeMobility.entity.Students;
import com.example.CollegeMobility.entity.Teachers;
import com.example.CollegeMobility.interf.TeacherInterfc;
import com.example.CollegeMobility.repository.*;
import com.example.CollegeMobility.util.JWTutilsToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Service
public class TeacherService implements TeacherInterfc{
	
	
	@Autowired
	private TeacherRepository teacherRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	 private  JWTutilsToken jwtUtilsToken;
	
	@Autowired
	private SessionRepository sessionRepository;
	
	
	@Autowired
	private AttendanceRepository attendanceRepository;
	
	@Autowired
	private MailService mailService;


	 @Override
	    public String login(TeacherLoginRequest request,
	                        HttpServletResponse response) {

	        Optional<Teachers> opt =
	                teacherRepository.findByEmail(request.getEmail());

	        if (opt.isEmpty()) {
	            return null;
	        }

	        Teachers teacher = opt.get();

	        if (!teacher.getPassword().equals(request.getPassword())) {
	            return null;
	        }

	        // Teacher → UserDetails
	        TeacherUserDetails userDetails =
	                new TeacherUserDetails(teacher);

	        // 🔐 Generate JWT
	        String token = jwtUtilsToken.generateToken(userDetails);

	        // 🍪 Cookie for teacher
	        Cookie cookie = new Cookie("TEACHER_TOKEN", token);
	        cookie.setHttpOnly(true);
	        cookie.setPath("/");
	        cookie.setMaxAge(7 * 24 * 60 * 60);

	        response.addCookie(cookie);

	        return "Teacher login successful";
	    }

	  @Override
	    public Teachers getProfileByEmail(String email) {

	        return teacherRepository
	                .findByEmail(email)
	                .orElse(null);
	    }
	  
	  @Override
	    public List<Students> getStudentsWithoutMentor() 
	    {
	        return studentRepository.findByMentorIsNull();
	    }
	  
	  
	  @Override
	  @Transactional
	  public void assignStudentsToTeacher(
	          String teacherEmail,
	          List<Long> studentRollNos) {

	      Teachers teacher = teacherRepository
	              .findByEmail(teacherEmail)
	              .orElseThrow(() -> new RuntimeException("Teacher not found"));

	      List<Students> students =
	              studentRepository.findAllById(studentRollNos);

	      // 1️⃣ Assign mentor
	      for (Students student : students) {
	          if (student.getMentor() == null) {
	              student.setMentor(teacher);
	          }
	      }
	      studentRepository.saveAll(students);

	      // 2️⃣ Fetch all sessions of teacher
	      List<Sessions> sessions =
	              sessionRepository.findByTeacher(teacher);

	      // 3️⃣ For each session → mark ABSENT if not exists
	      for (Sessions session : sessions) {

	          for (Students student : students) {

	              boolean exists =
	                      attendanceRepository
	                          .existsBySessionAndStudent(session, student);

	              if (!exists) {
	                  Attendence att = new Attendence();
	                  att.setSession(session);
	                  att.setStudent(student);
	                  att.setStatus("absent");

	                  attendanceRepository.save(att);
	              }
	          }
	      }
	  }

	    
	    
	  @Override
	  @Transactional
	  public void createSession(String teacherEmail,
	                            SessionCreateDTO dto) {

	      // 1️⃣ Fetch teacher from JWT email
	      Teachers teacher = teacherRepository
	              .findByEmail(teacherEmail)
	              .orElseThrow(() ->
	                      new RuntimeException("Teacher not found"));

	      // 2️⃣ Create session entity
	      Sessions session = new Sessions();
	      session.setTeacher(teacher);
	      session.setSessionTitle(dto.getSessionTitle());
	      session.setTopic(dto.getTopic());
	      session.setSessionDate(dto.getSessionDate());
	      session.setStartTime(dto.getStartTime());
	      session.setDurationMinutes(dto.getDurationMinutes());
	      session.setStatus(dto.getStatus());

	      // 3️⃣ Save session to DB
	      sessionRepository.save(session);

	      // ================= MAIL LOGIC =================

	      // 4️⃣ Fetch ONLY students allocated to this teacher
	      List<Students> students =
	              studentRepository.findByMentor(teacher);

	      // 5️⃣ Send professional mail to each student
	      for (Students student : students) {

	          String subject =
	                  "📢 Mentoring Session Scheduled | "
	                  + session.getSessionTitle();

	          String body =
	                  "Dear " + student.getName() + ",\n\n" +

	                  "We are pleased to inform you that a new mentoring session "
	                  + "has been scheduled. Please find the details below:\n\n" +

	                  "========================================\n" +
	                  "           📘 SESSION DETAILS\n" +
	                  "========================================\n" +
	                  "Session Title : " + session.getSessionTitle() + "\n" +
	                  "Topic         : " + session.getTopic() + "\n" +
	                  "Date          : " + session.getSessionDate() + "\n" +
	                  "Start Time    : " + session.getStartTime() + "\n" +
	                  "Duration      : " + session.getDurationMinutes() + " minutes\n\n" +

	                  "========================================\n" +
	                  "           👨‍🏫 MENTOR DETAILS\n" +
	                  "========================================\n" +
	                  "Mentor Name   : " + teacher.getTeacherName() + "\n" +
	                  "Mentor Email  : " + teacher.getEmail() + "\n" +
	                  "Department    : " + teacher.getDepartment() + "\n\n" +

	                  "Kindly ensure that you attend the session on time. "
	                  + "Your active participation is encouraged.\n\n" +

	                  "Best Regards,\n" +
	                  "College Mobility System\n" +
	                  "----------------------------------------\n" +
	                  "This is an automated email. Please do not reply.";

	          mailService.sendMail(
	                  student.getEmail(),
	                  subject,
	                  body
	          );
	      }
	  }

	    @Override
	    public List<Sessions> getAllSessionsOfTeacher(String teacherEmail) {

	        Teachers teacher = teacherRepository
	                .findByEmail(teacherEmail)
	                .orElseThrow(() -> new RuntimeException("Teacher not found"));

	        return sessionRepository.findByTeacher(teacher);
	    }
	    
	    @Override
	    public List<Students> getMenteesBySession(
	            String teacherEmail,
	            Long sessionId) {

	        // 1️⃣ Logged-in teacher
	        Teachers teacher = teacherRepository
	                .findByEmail(teacherEmail)
	                .orElseThrow(() -> new RuntimeException("Teacher not found"));

	        // 2️⃣ Session fetch
	        Sessions session = sessionRepository
	                .findById(sessionId)
	                .orElseThrow(() -> new RuntimeException("Session not found"));

	        // 3️⃣ Safety check: session belongs to this teacher
	        if (!session.getTeacher().getTeacherId()
	                .equals(teacher.getTeacherId())) {
	            throw new RuntimeException("This session does not belong to you");
	        }

	        // 4️⃣ Fetch all mentees of this teacher
	        return studentRepository.findByMentor(teacher);
	    }

	    @Override
	    @Transactional
	    public String markAttendance(
	            String teacherEmail,
	            Long sessionId,
	            List<AttendanceDTO> attendanceList) {

	        Teachers teacher = teacherRepository
	                .findByEmail(teacherEmail)
	                .orElseThrow(() -> new RuntimeException("Teacher not found"));

	        Sessions session = sessionRepository
	                .findById(sessionId)
	                .orElseThrow(() -> new RuntimeException("Session not found"));

	        if (!session.getTeacher().getTeacherId()
	                .equals(teacher.getTeacherId())) {
	            throw new RuntimeException("Session not belongs to this teacher");
	        }

	        boolean updated = false; // 🔥 KEY FLAG

	        for (AttendanceDTO dto : attendanceList) {

	            Students student = studentRepository
	                    .findById(dto.getRollNo())
	                    .orElseThrow(() -> new RuntimeException("Student not found"));

	            Optional<Attendence> existing =
	                    attendanceRepository.findBySessionAndStudent(session, student);

	            if (existing.isPresent()) {
	                // 🔁 UPDATE
	                Attendence attendence = existing.get();
	                attendence.setStatus(dto.getStatus());
	                attendanceRepository.save(attendence);
	                updated = true;
	            } else {
	                // 🆕 INSERT
	                Attendence attendence = new Attendence();
	                attendence.setSession(session);
	                attendence.setStudent(student);
	                attendence.setStatus(dto.getStatus());
	                attendanceRepository.save(attendence);
	            }
	        }

	        // 🔔 SMART RESPONSE
	        return updated
	                ? "Attendance updated successfully"
	                : "Attendance marked successfully";
	    }

	
	    
	    @Override
	    @Transactional
	    public List<StudentAttendancePercentageDTO>
	    getStudentsAttendancePercentage(String teacherEmail) {

	        // 1️⃣ Teacher fetch
	        Teachers teacher = teacherRepository
	                .findByEmail(teacherEmail)
	                .orElseThrow(() ->
	                        new RuntimeException("Teacher not found"));

	        // 2️⃣ Teacher चे mentees
	        List<Students> students =
	                studentRepository.findByMentor(teacher);

	        // 3️⃣ Teacher चे completed sessions count
	        long totalSessions =
	                sessionRepository.countByTeacherAndStatus(
	                        teacher, "completed");

	        List<StudentAttendancePercentageDTO> result =
	                new ArrayList<>();

	        for (Students student : students) {

	            long present =
	                    attendanceRepository
	                            .countByStudentAndStatus(
	                                    student, "present");

	            long absent =
	                    attendanceRepository
	                            .countByStudentAndStatus(
	                                    student, "absent");

	            double percentage = 0;
	            if (totalSessions > 0) {
	                percentage =
	                    (present * 100.0) / totalSessions;
	            }

	            StudentAttendancePercentageDTO dto =
	                    new StudentAttendancePercentageDTO();

	            dto.setRollNo(student.getRollNo());
	            dto.setName(student.getName());
	            dto.setEmail(student.getEmail());
	            dto.setTotalSessions(totalSessions);
	            dto.setPresentCount(present);
	            dto.setAbsentCount(absent);
	            dto.setAttendancePercentage(
	                    Math.round(percentage * 100.0) / 100.0
	            );

	            result.add(dto);
	        }

	        return result;
	    }

     
	    @Override
	    @Transactional
	    public SessionAttendanceInitDTO getSessionAttendanceInit(
	            String teacherEmail,
	            Long sessionId) {

	        // 1️⃣ Teacher
	        Teachers teacher = teacherRepository
	                .findByEmail(teacherEmail)
	                .orElseThrow(() -> new RuntimeException("Teacher not found"));

	        // 2️⃣ Session
	        Sessions session = sessionRepository
	                .findById(sessionId)
	                .orElseThrow(() -> new RuntimeException("Session not found"));

	        // 3️⃣ Ownership check
	        if (!session.getTeacher().getTeacherId()
	                .equals(teacher.getTeacherId())) {
	            throw new RuntimeException("Unauthorized access to session");
	        }

	        // 4️⃣ Fetch mentees
	        List<Students> students =
	                studentRepository.findByMentor_TeacherId(
	                        teacher.getTeacherId()
	                );

	        // 5️⃣ Fetch attendance for session
	        List<Attendence> attendanceList =
	                attendanceRepository.findBySession_SessionId(sessionId);

	        // map: rollNo → status
	        Map<Long, String> attendanceMap =
	                attendanceList.stream()
	                        .collect(Collectors.toMap(
	                                a -> a.getStudent().getRollNo(),
	                                Attendence::getStatus
	                        ));

	        // 6️⃣ Build DTO
	        SessionAttendanceInitDTO dto =
	                new SessionAttendanceInitDTO();

	        dto.setTeacherName(teacher.getTeacherName());

	        // session DTO
	        SessionAttendanceInitDTO.SessionDTO sDto =
	                new SessionAttendanceInitDTO.SessionDTO();
	        sDto.sessionId = session.getSessionId();
	        sDto.sessionTitle = session.getSessionTitle();
	        sDto.topic = session.getTopic();
	        sDto.sessionDate = session.getSessionDate();
	        sDto.startTime = session.getStartTime();
	        sDto.durationMinutes = session.getDurationMinutes();
	        sDto.status = session.getStatus();

	        dto.setSession(sDto);

	        // 7️⃣ Student attendance DTO list
	        List<SessionAttendanceInitDTO.StudentAttendanceDTO> menteeDTOs =
	                students.stream().map(st -> {
	                    SessionAttendanceInitDTO.StudentAttendanceDTO sd =
	                            new SessionAttendanceInitDTO.StudentAttendanceDTO();
	                    sd.rollNo = st.getRollNo();
	                    sd.name = st.getName();
	                    sd.email = st.getEmail();
	                    sd.department = st.getDepartment();

	                    // 👇 attendance present?
	                    sd.attendanceStatus =
	                            attendanceMap.get(st.getRollNo()); // null if not marked

	                    return sd;
	                }).toList();

	        dto.setMentees(menteeDTOs);

	        // 8️⃣ Message logic
	        if (attendanceList.isEmpty()) {
	            dto.setMessage(
	                "No attendance has been recorded for this session yet"
	            );
	        } else {
	            dto.setMessage(
	                "Attendance already recorded for this session"
	            );
	        }

	        return dto;
	    }

	    @Override
	    public TeacherDashboardSummaryDTO getDashboardSummary(String teacherEmail) {

	        Teachers teacher = teacherRepository
	                .findByEmail(teacherEmail)
	                .orElseThrow(() -> new RuntimeException("Teacher not found"));

	        List<Students> students =
	                studentRepository.findByMentor_TeacherId(
	                        teacher.getTeacherId()
	                );

	        List<Sessions> sessions =
	                sessionRepository.findByTeacher(teacher);

	        long completed =
	                sessionRepository.countByTeacherAndStatus(teacher, "completed");

	        long running =
	                sessionRepository.countByTeacherAndStatus(teacher, "running");

	        long scheduled =
	                sessionRepository.countByTeacherAndStatus(teacher, "scheduled");

	        TeacherDashboardSummaryDTO dto =
	                new TeacherDashboardSummaryDTO();

	        dto.setTeacherName(teacher.getTeacherName());
	        dto.setTotalMentees(students.size());
	        dto.setTotalSessions(sessions.size());
	        dto.setCompletedSessions(completed);
	        dto.setRunningSessions(running);
	        dto.setScheduledSessions(scheduled);

	        // ===== STUDENT WISE ATTENDANCE =====
	        List<TeacherDashboardSummaryDTO.StudentAttendanceDTO> studentDTOs =
	                new ArrayList<>();

	        double totalPercentageSum = 0;

	        for (Students student : students) {

	            long totalAttendance =
	                    attendanceRepository.countByStudent(student);

	            long presentAttendance =
	                    attendanceRepository.countByStudentAndStatus(
	                            student, "present"
	                    );

	            double percentage = 0;

	            if (totalAttendance > 0) {
	                percentage =
	                        (presentAttendance * 100.0) / totalAttendance;
	            }

	            totalPercentageSum += percentage;

	            TeacherDashboardSummaryDTO.StudentAttendanceDTO sd =
	                    new TeacherDashboardSummaryDTO.StudentAttendanceDTO();

	            sd.rollNo = student.getRollNo();
	            sd.name = student.getName();
	            sd.attendancePercentage = Math.round(percentage * 100.0) / 100.0;

	            studentDTOs.add(sd);
	        }

	        dto.setStudents(studentDTOs);

	        // ===== AVERAGE ATTENDANCE =====
	        if (!students.isEmpty()) {
	            dto.setAverageAttendancePercentage(
	                    Math.round(
	                        (totalPercentageSum / students.size()) * 100.0
	                    ) / 100.0
	            );
	        } else {
	            dto.setAverageAttendancePercentage(0);
	        }

	        return dto;
	    }
	    
	    
	    @Override
	    public List<Sessions> getRunningAndCompletedSessions(String teacherEmail) {

	    	 // 1️⃣ fetch teacher
	        Teachers teacher = teacherRepository
	                .findByEmail(teacherEmail)
	                .orElseThrow(() -> new RuntimeException("Teacher not found"));

	        // 2️⃣ only required statuses
	        List<String> statuses = List.of("running", "scheduled");

	        // 3️⃣ fetch sessions
	        return sessionRepository
	                .findByTeacherAndStatusIn(teacher, statuses);
	    }

}
