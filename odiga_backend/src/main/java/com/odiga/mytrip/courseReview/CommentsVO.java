package com.odiga.mytrip.courseReview;

import java.sql.Date;

import org.springframework.stereotype.Component;

@Component
public class CommentsVO {

    private int commentId;
    private int boardNo;
    private String commenterName;
    private String commentContent;
    private Date commentDate;
    private String email;
    private int starRating;


	public int getCommentId() {
		return this.commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public int getBoardNo() {
		return this.boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getCommenterName() {
		return this.commenterName;
	}

	public void setCommenterName(String commenterName) {
		this.commenterName = commenterName;
	}

	public String getCommentContent() {
		return this.commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public Date getCommentDate() {
		return this.commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getStarRating() {
		return this.starRating;
	}

	public void setStarRating(int starRating) {
		this.starRating = starRating;
	}

	
}