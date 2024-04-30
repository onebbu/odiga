package com.odiga.mytrip.api;

import lombok.*;

@Data
@AllArgsConstructor
public class ApiVO {
    private String title;
    private String contentid;
    private String firstimage;
    private String mapx;
    private String mapy;
    private String addr1;
    private String addr2;
    private String cat1;
    private String cat2;
    private String cat3;
    private String areacode;
    private String sigungucode;
    private String contenttypeid;
}
