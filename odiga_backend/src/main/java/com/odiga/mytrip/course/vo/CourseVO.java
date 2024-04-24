package com.odiga.mytrip.course.vo;

import java.sql.Date;

import lombok.*;

@Data
@AllArgsConstructor
public class CourseVO {
    private String courseno;
    private String courseday;
    private int travelnum;
    private int contentid;
    private String nickname;
    private String email;
    private Date startdate;
    private Date enddate;
    private String courseyn;
    private String firstimage;
    private String title;
    private String mapx;
    private String mapy;
      
}
