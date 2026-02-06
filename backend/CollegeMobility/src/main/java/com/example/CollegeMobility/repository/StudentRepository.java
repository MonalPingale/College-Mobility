package com.example.CollegeMobility.repository;


import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CollegeMobility.entity.Students;
import com.example.CollegeMobility.entity.Teachers;

public interface StudentRepository extends JpaRepository<Students, Long> {

    Optional<Students> findByEmail(String email);
    List<Students> findByMentor(Teachers mentor);
    

    List<Students> findByMentorIsNull();
    List<Students> findByMentor_TeacherId(Long teacherId);

}