import axios from "axios";
import React, { useState } from "react";
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import '../TravelDetailPage.css';
const StarRatingContainer = styled.div`
    display: inline-block;
`;

const Star = styled.span`
    font-size: 40px;
    color: ${props => props.checked ? '#ffc107' : '#e4e5e9'};
    cursor: pointer;
`; 



function StarRating({ starCount, onChange }) {
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        onChange(selectedRating);
    };

    return (
        <StarRatingContainer>
            {[...Array(starCount)].map((_, index) => (
                <Star 
                    key={index} 
                    checked={index < rating} 
                    onClick={() => handleStarClick(index + 1)}
                >
                    &#9733;
                </Star>
            ))}
        </StarRatingContainer>
    );
} 

function ReviewImportForm() { 
    const [reviewComment, setreviewComment] = useState('');
    const [reviewGrade, setreviewGrade] = useState(0);
    const { contentID } = useParams();

    const handleSubmit = () => {
        axios.post('/reviewImport',{
            contentid : contentID ,
            reviewcomment : reviewComment ,
            reviewgrade : reviewGrade
        })
        .then(reponse => {
            console.log(reponse.data);
        })
        .catch(error => {
            console.error('에러 :', error); // 오류 발생 시 에러 메시지 출력
        });
    };

    return(
        <div className="reviewImportForm"> 
          <p>별점과 리뷰로 여러분의 소중한 경험을 들려주세요 !</p>
          <div className="contourLine4"></div>
          <StarRating starCount={5} onChange={setreviewGrade} />
          <br />
            <textarea className="reviewBox"                 
                value={reviewComment} 
                onChange={(e) => setreviewComment(e.target.value)} 
                placeholder="리뷰를 작성해주세요" 
            />
            <br />
            <button className="successButton" onClick={handleSubmit}> <h2>완료 ✔</h2> </button>
        </div>
    )

}

export default ReviewImportForm;