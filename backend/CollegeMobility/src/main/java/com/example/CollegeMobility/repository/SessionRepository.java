package com.example.CollegeMobility.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CollegeMobility.entity.*;
public interface SessionRepository extends JpaRepository<Sessions, Long> {

    List<Sessions> findByTeacherTeacherId(int teacherId);
    List<Sessions> findByStatus(String status);
    List<Sessions> findByTeacher(Teachers teacher);
    List<Sessions>
    findByTeacherAndStatus(Teachers teacher, String status);

    List<Sessions>
    findByTeacherAndStatusIn(
        Teachers teacher,
        List<String> statuses
    );

    Long countByTeacherAndStatus(Teachers teacher, String status);

    long countByTeacher_TeacherId(Long teacherId);
    
    

}