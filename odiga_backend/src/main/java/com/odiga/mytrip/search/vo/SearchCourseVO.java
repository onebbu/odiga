package com.odiga.mytrip.search.vo;

import lombok.*;

@Data
@AllArgsConstructor
public class SearchCourseVO {
    private String boardno;
    private String boardtitle;
    private String boardgrade;
    private String boardviewcount;
    private String boardlikecount;
    private String boarddate;
    private String tags;
    private String courseno;
}
