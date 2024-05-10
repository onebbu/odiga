package com.odiga.mytrip.courseReview;

import org.springframework.stereotype.Component;
import java.sql.Date;

@Component
public class CourseReviewVO {

    private int boardNo;
    private String email;
    private String nickname;
    private String boardTitle;
    private String boardContent;
    private double boardGrade;
    private int boardViewCount;
    private int boardLikeCount;
    private Date boardDate;
    private Character boardYN;
	private String mainImage;

	private String tags;



	public String getMainImage() {
		return this.mainImage;
	}

	public void setMainImage(String mainImage) {
		this.mainImage = mainImage;
	}


	public int getBoardNo() {
		return this.boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNickname() {
		return this.nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getBoardTitle() {
		return this.boardTitle;
	}

	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}

	public String getBoardContent() {
		return this.boardContent;
	}

	public void setBoardContent(String boardContent) {
		this.boardContent = boardContent;
	}

	public double getBoardGrade() {
		return this.boardGrade;
	}

	public void setBoardGrade(double boardGrade) {
		this.boardGrade = boardGrade;
	}

	public int getBoardViewCount() {
		return this.boardViewCount;
	}

	public void setBoardViewCount(int boardViewCount) {
		this.boardViewCount = boardViewCount;
	}

	public int getBoardLikeCount() {
		return this.boardLikeCount;
	}

	public void setBoardLikeCount(int boardLikeCount) {
		this.boardLikeCount = boardLikeCount;
	}

	public Date getBoardDate() {
		return this.boardDate;
	}

	public void setBoardDate(Date boardDate) {
		this.boardDate = boardDate;
	}

	public Character getBoardYN() {
		return this.boardYN;
	}

	public void setBoardYN(Character boardYN) {
		this.boardYN = boardYN;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}



    
}
