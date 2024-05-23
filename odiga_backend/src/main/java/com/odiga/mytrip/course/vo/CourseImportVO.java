package com.odiga.mytrip.course.vo;

import lombok.*;

@Data
@AllArgsConstructor
public class CourseImportVO {
    private int boardNo;
    private String boardTitle;
    private String boardContent; 
    private String mainimage; 
    private String tags; 
    private String email; 
    private String nickname;
    private String courseno;
}
