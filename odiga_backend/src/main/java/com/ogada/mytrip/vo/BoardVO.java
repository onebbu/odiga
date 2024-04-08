package com.ogada.mytrip.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.sql.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class BoardVO {

    private int  level;
    private int articleNO;
    private int parentNO;
    private String title;
    private String content;
    private String imageFileName;
    private String id;
    private Date writeDate;
}
