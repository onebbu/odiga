import axios from "axios";
import React, { useState } from "react";
import styled from 'styled-components';
import { contentID } from "../TravelDetailPage";

const StarRatingContainer = styled.div`
    display: inline-block;
`;

const Star = styled.span`
    font-size: 24px;
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

    return (
        <div>
            <h2>후기와 별점 매기기</h2>
            <StarRating starCount={5} onChange={setreviewGrade} />
            <br />
            <input 
                type="text" 
                value={reviewComment} 
                onChange={(e) => setreviewComment(e.target.value)} 
                placeholder="리뷰를 작성해주세요" 
            />
            <br />
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
}

export default ReviewImportForm;