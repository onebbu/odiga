package com.odiga.mytrip.courseReview;

import org.springframework.stereotype.Component;

import oracle.sql.DATE;

@Component
public class CourseReviewVO {

    private int boardNo;
    private String email;
    private String nickname;
    private String boardTitle;
    private String boardContent;
    private int boardGrade;
    private int boardViewCount;
    private int boardLikeCount;
    private DATE boardDate;
    private Character boardYN;

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

	public int getBoardGrade() {
		return this.boardGrade;
	}

	public void setBoardGrade(int boardGrade) {
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

	public DATE getBoardDate() {
		return this.boardDate;
	}

	public void setBoardDate(DATE boardDate) {
		this.boardDate = boardDate;
	}

	public Character getBoardYN() {
		return this.boardYN;
	}

	public void setBoardYN(Character boardYN) {
		this.boardYN = boardYN;
	}



    
}
