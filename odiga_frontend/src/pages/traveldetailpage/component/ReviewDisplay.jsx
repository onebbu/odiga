import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewDisplay() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get("/reviews/129534"); // 적절한 엔드포인트로 변경
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
                        <h3>{review.nickname}</h3>
                        <p>{review.reviewcomment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReviewDisplay;
