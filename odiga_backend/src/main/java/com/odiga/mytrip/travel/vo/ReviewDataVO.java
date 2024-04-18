package com.odiga.mytrip.travel.vo;

import lombok.*;

@Data
@AllArgsConstructor
public class ReviewDataVO {
    private int reviewno;
    private String email;
    private String contentid;
    private String nickname;
    private String reviewcomment;
    private int reviewgrade;
    private String reviewdate;
}
