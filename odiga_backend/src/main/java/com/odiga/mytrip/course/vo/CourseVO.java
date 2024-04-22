package com.odiga.mytrip.course.vo;

import java.sql.Date;

import lombok.*;

@Data
@AllArgsConstructor
public class CourseVO {
    private String courseno;
    private int travelnum;
    private int contentid;
    private String email;
    private String nickname;
    private Date startdate;
    private Date enddate;
    private String courseyn;
    private String courseday;  
}
