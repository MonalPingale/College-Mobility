package com.example.CollegeMobility.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Students {

	    @Id
	    @Column(name = "roll_no")
	    private Long rollNo;   // 🔥 int → Long

    private String name;

    @Column(unique = true)
    private String email;

    private String department;

    private String password;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Teachers mentor;

	public Long getRollNo() {
		return rollNo;
	}

	public void setRollNo(Long rollNo) {
		this.rollNo = rollNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Teachers getMentor() {
		return mentor;
	}

	public void setMentor(Teachers mentor) {
		this.mentor = mentor;
	}

    
}