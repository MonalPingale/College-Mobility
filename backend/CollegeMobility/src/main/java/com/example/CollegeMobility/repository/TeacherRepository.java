package com.example.CollegeMobility.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CollegeMobility.entity.Teachers;

public interface TeacherRepository extends JpaRepository<Teachers, Long> {
	
	
	Optional<Teachers> findByEmail(String email);
}