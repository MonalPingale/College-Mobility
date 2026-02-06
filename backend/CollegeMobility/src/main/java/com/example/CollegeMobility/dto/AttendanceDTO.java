package com.example.CollegeMobility.dto;

public class AttendanceDTO {

    private Long rollNo;        // Students.rollNo = long
    private String status;      // present / absent

    public Long getRollNo() {
        return rollNo;
    }

    public void setRollNo(Long rollNo) {
        this.rollNo = rollNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}