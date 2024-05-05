import React, { useEffect, useState } from "react";
import axios from "axios";
import { contentID } from "../TravelDetailPage";
import '../TravelDetailPage.css';

function ReviewDisplay() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/reviews/${contentID}`); 
            setReviews(response.data);
        } catch (error) {
            console.error("리뷰를 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    return (
        <section id="review-display">
            <h2>리뷰</h2>
            <div id="review-display-placeholder">
                {reviews.map((review, index) => (
                    <div key={index}>
                        <h3>닉네임 : {review.nickname}</h3>
                        <p>리뷰내용 : {review.reviewcomment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReviewDisplay;
