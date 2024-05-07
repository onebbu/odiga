package com.odiga.mytrip.resultlist.vo;

import lombok.*;

import java.sql.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultVO {

    private String resultId;
    // 사용자 닉네임+코스번호+날짜+여행지 순서번호 합치기(ex odiga_01_01_01)
    private String courseNo;
    // 사용자가 몇번째로 생성한 코스인지
    private int courseDay;
    // 여행 날짜(몇일차인지)
    private int travelNum;
    // 여행지 순서 번호
    private int contentId;
    private String nickname;
    private String email;
    private Date startDate;
    private Date endDate;
    private char courseYN;

    private String courseTitle;
    private String coursePw;

}
