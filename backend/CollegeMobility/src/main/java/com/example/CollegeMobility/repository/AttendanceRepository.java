package com.example.CollegeMobility.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CollegeMobility.entity.Attendence;
import com.example.CollegeMobility.entity.Sessions;
import com.example.CollegeMobility.entity.Students;
public interface AttendanceRepository extends JpaRepository<Attendence, Long> {

    List<Attendence> findByStudentRollNo(int rollNo);
    boolean existsBySessionAndStudent(Sessions session, Students student);


    List<Attendence> findBySessionSessionId(int sessionId);
    Optional<Attendence>    findBySessionAndStudent(Sessions session, Students student);
    Long countByStudentAndStatus(Students student, String status);
    long countByStudent_RollNoAndSession_Teacher_TeacherIdAndStatus(
            Long rollNo,
            Long teacherId,
            String status
    );
    
    List<Attendence> findBySession_SessionId(Long sessionId);
    

    long countByStudent(Students student);

    

}