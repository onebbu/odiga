import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Comments() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [allComments, setAllComments] = useState([]);
  const [responseError, setResponseError] = useState("");
  const { boardNo } = useParams();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (comment.length > 100) {
        alert("댓글은 100 byte 이하로 작성해주세요.");
        return; // 글쓰기 중단
      }

    try {
      const response = await axios.post(
        `/coursereview/commentWrite/${boardNo}`,
        {
          boardNo: boardNo,
          commentContent: comment,
          starRating: rating,
        }
      );

      console.log("댓글이 성공적으로 등록되었습니다.");
      fetchComments(); // 댓글 목록을 다시 불러옵니다.
      setComment(""); // 댓글 입력 필드 초기화
      setRating(5); // 별점 초기화
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      setResponseError("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const StarRating = ({ starCount }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
      const selected = index < starCount;
      return (
        <Star key={index} selected={selected}>
          ★
        </Star>
      );
    });

    return <div>{stars}</div>;
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/coursereview/allComments/${boardNo}`);
      setAllComments(response.data);
    } catch (error) {
      console.error("댓글 목록을 불러오는 중 오류 발생:", error);
      setResponseError("댓글 목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div
        style={{
          margin: "0 auto",
          marginBottom: "30px",
          width: "100%",
          border: "1px solid #e5e5e5",
          padding: "14px",
          backgroundColor: "#f7f7f7",
          position: "relative",
        }}
      >
        <textarea
          placeholder="소중한 댓글을 100 byte 이내로 남겨주세요"
          style={{
            margin: "0 auto",
            padding: "15px 20px",
            lineHeight: "20px",
            border: "1px solid #e5e5e5",
            height: "80px",
            fontSize: "16px",
            width: "100%",
            color: "#535455",
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Container>
          <LeftSection>
            <span>별점 &nbsp; </span>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarButton
                key={star}
                onClick={() => handleRatingChange(star)}
                selected={star <= rating}
              >
                ★
              </StarButton>
            ))}
          </LeftSection>
          <Button onClick={handleSubmit}>글쓰기</Button>
        </Container>
      </div>

      {allComments.map((item) => (
        <Reviews key={item.commentId}>
          <div
            style={{
              paddingBottom: "5px",
              paddingRight: "23px",
              fontSize: "16px",
              color: "black",
              textAlign:"left"
            }}
          >
            <CommentContent>{item.commentContent}</CommentContent>
          </div>
          <div
            style={{ textAlign: "right", fontSize: "14px", color: "#B7B5C4" }}
          >
            <div
              style={{
                display: "inline-block",
                lineHeight: "20px",
                fontWeight: "300",
                paddingRight: "10px",
                marginRight: "7px",
              }}
            >
              {item.commenterName} &nbsp; |
            </div>
            <div
              style={{
                display: "inline-block",
                lineHeight: "20px",
                fontWeight: "300",
                paddingRight: "10px",
                marginRight: "7px",
              }}
            >
              {item.commentDate} &nbsp; |
            </div>
            <div
              style={{
                display: "inline-block",
                lineHeight: "20px",
                fontWeight: "300",
                paddingRight: "10px",
                marginRight: "7px",
              }}
            >
              <StarRating starCount={item.starRating} />
            </div>
          </div>
        </Reviews>
      ))}
    </>
  );
}

export default Comments;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  padding: 14px 0 0 0;
  background-color: #f7f7f7;
  position: relative;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  color: #535455;
`;

const Button = styled.button`
  background: #13294b;
  color: #fff;
  font-size: 15px;
  width: 73px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-left: 8px;
  vertical-align: middle;
`;

const Reviews = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 10px;
  border-bottom: 1px solid #e6e6e6;
`;

const StarButton = styled.span`
  cursor: pointer;
  color: ${(props) => (props.selected ? "gold" : "gray")};
  font-size: 20px;
  margin-right: 5px;
`;

const CommentContent = styled.div`
  white-space: pre-line;
  font-family: inherit;
`;

const Star = styled.span`
  color: ${(props) => (props.selected ? "gold" : "gray")};
  font-size: 16px;
  margin-right: 3px;
`;
