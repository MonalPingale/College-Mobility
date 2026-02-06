package com.example.CollegeMobility;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CollegeMobilityApplication {

	public static void main(String[] args) {
		SpringApplication.run(CollegeMobilityApplication.class, args);
	}

}
