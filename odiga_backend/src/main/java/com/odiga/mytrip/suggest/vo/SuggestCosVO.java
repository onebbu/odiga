package com.odiga.mytrip.suggest.vo;

import lombok.*;

@Data
@AllArgsConstructor
public class SuggestCosVO {
    private String boardno;
    private String nickname;
    private String boardtitle;
    private String boardcontent;
    private String boardgrade;
    private String boardviewcount;
    private String boardlikecount;
    private String boarddate;
    private String mainimage;
    private String tags;
}
