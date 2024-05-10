import React, { useEffect, useState } from "react";
import axios from "axios";
import '../TravelDetailPage.css';
import ReviewImportForm from './ReviewImportForm'; 
import { useParams } from 'react-router-dom';

function ReviewDisplay() {
    const { contentID } = useParams();
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    // 글 수정 삭제 관련~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // const [editingId, setEditingId] = useState(null);
    // const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/reviews/${contentID}`); 
            setReviews(response.data);
            updateAverageRating(response.data);
        } catch (error) {
            console.error("리뷰를 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    const handleNewReview = () => {
        fetchReviews();  // 새 리뷰가 추가될 때마다 리뷰 목록 새로고침
    };
    

    // 평균 별점 기능 
    const updateAverageRating = (reviews) => {
        const total = reviews.reduce((acc, review) => acc + review.reviewgrade, 0);
        const average = reviews.length > 0 ? (total / reviews.length) : 0;
        setAverageRating(average.toFixed(2));
    };
    


    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} style={{ color: i < rating ? '#ffc107' : '#e4e5e9' }}>&#9733;</span>
            );
        }
        return stars;
    };



    // 리뷰 수정 / 삭제 기능 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~변수명, 엔드포인트 확인 필요~~~~

    // const startEditing = (review) => {
    //     setEditingId(review.id);
    //     setEditedContent(review.reviewcomment);
    // };

    // const cancelEditing = () => {
    //     setEditingId(null);
    //     setEditedContent('');
    // };

    // const submitEdit = async (id) => {
    //     try {
    //         await axios.put(`/reviews/${id}`, { reviewcomment: editedContent });
    //         fetchReviews();
    //         cancelEditing();
    //     } catch (error) {
    //         console.error("리뷰 수정 중 오류가 발생했습니다:", error);
    //     }
    // };

    // const deleteReview = async (id) => {
    //     if (window.confirm("리뷰를 삭제하시겠습니까?")) {
    //         try {
    //             await axios.delete(`/reviews/${id}`);
    //             fetchReviews();
    //         } catch (error) {
    //             console.error("리뷰 삭제 중 오류가 발생했습니다:", error);
    //         }
    //     }
    // };

    return (
        <section id="review-display" className="reviewDisplay">
             <ReviewImportForm onReviewSubmitted={handleNewReview} />
             <div className="averageRatingInner">
             <h4> Comment ! </h4>
             <div className="averageRating">
                <span>평균 별점: {averageRating} / 5점</span>
                <div>{renderStars(Math.round(averageRating))}</div>
            </div>
             </div>
             <div className="contourLine6"></div>
             {/* 임의로 만들어 놨는데.... 될까요 ... */}
             {/* <div id="review-display-placeholder">
                {reviews.map((review, index) => (
                    <div key={index} className="reviewItem">
                        {editingId === review.id ? (
                            <>
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="editTextArea"
                                />
                                <button onClick={() => submitEdit(review.id)}>확인</button>
                                <button onClick={cancelEditing}>취소</button>
                            </>
                        ) : (
                            <>
                                <div className="reviewComment">
                                    <p className="commentContent">{review.reviewcomment}</p>
                                </div>
                                <div className="commentInfo">
                                    <div className="commentDetail">{review.nickname} |</div>
                                    <div className="commentDetail">{renderStars(review.reviewgrade)} |</div>
                                    <div className="commentDetail">{review.reviewdate}</div>
                                    <button onClick={() => startEditing(review)}>수정</button>
                                    <button onClick={() => deleteReview(review.id)}>삭제</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div> */} 
            <div id="review-display-placeholder">
                {reviews.map((review, index) => (
                    <div key={index} className="reviewItem">
                        
                        
                        <div className="reviewComment">
                        <p className="commentContent">{review.reviewcomment}</p>
                        </div>
                        <div className="commentInfo">
                            <div className="commentDetail">{review.nickname}  &nbsp;|</div>
                            <div className="commentDetail">{renderStars(review.reviewgrade)}  &nbsp;|</div>
                            <div className="commentDetail">{review.reviewdate}</div>
                        </div> 
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReviewDisplay;
