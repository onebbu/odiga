package com.odiga.mytrip.search.vo;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchVO {
    private String contentid;
    private String title;
    private String addr1;
    private String areacode;
    private String sigungucode;
    private String cat3;
    private String firstImage;
    private double averageRate;
    private int cntRating;
    private String travelviewcount;
    private String cattype;

}
