package com.example.CollegeMobility.dto;


import java.util.List;

public class AssignStudentsDTO {

    private List<Long> studentRollNos;

    public List<Long> getStudentRollNos() {
        return studentRollNos;
    }

    public void setStudentRollNos(List<Long> studentRollNos) {
        this.studentRollNos = studentRollNos;
    }
}