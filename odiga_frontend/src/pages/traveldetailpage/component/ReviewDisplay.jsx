import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import '../TravelDetailPage.css';
import ReviewImportForm from './ReviewImportForm';
import {useParams} from 'react-router-dom';
import {LoginInfoContext} from "../../login/LoginInfoProvider";

function ReviewDisplay({ travelInfo, onsetLike }) {
    const {contentID} = useParams(); // 얘 있으면 modalcontId 도 locaContId 도 다 필요없어서 지워버림 -규
    const [reviews, setReviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedRating, setEditedRating] = useState(0);  
    const loginInfo = useContext(LoginInfoContext);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            if (contentID != null) {
                const response = await axios.get(`/reviews/${contentID}`);
                setReviews(response.data);
            }
        } catch (error) {
            console.error("리뷰를 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    const handleNewReview = () => {
        fetchReviews();  // 새 리뷰가 추가될 때마다 리뷰 목록 새로고침
    };

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} style={{color: i < rating ? '#ffc107' : '#e4e5e9'}}>&#9733;</span>
            );
        }
        return stars;
    };

    const startEditing = (review) => {
        setEditingId(review.reviewno);
        setEditedContent(review.reviewcomment);
        setEditedRating(review.reviewgrade); 
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditedContent('');
        setEditedRating(0); 
    };

    const submitEdit = async (reviewno) => {
        try {
            await axios.post(`/ReviewUpdate`,
                {
                    reviewno: reviewno,
                    reviewcomment: editedContent,
                    reviewgrade: editedRating //별점 데이터 추가했습니다~~
                });
            console.log('Submitting updated review:', editedRating);
            fetchReviews();
            cancelEditing();    
        } catch (error) {
            console.error("리뷰 수정 중 오류가 발생했습니다:", error);
        }
    };

    const deleteReview = async (reviewno) => {
        console.log(reviewno);
        if (window.confirm("리뷰를 삭제하시겠습니까?")) {
            try {
                await axios.post(`/ReviewDelete/${reviewno}`);
                fetchReviews();
            } catch (error) {
                console.error("리뷰 삭제 중 오류가 발생했습니다:", error);
            }
        }
    };

    const handleRatingChange = (index) => {
        setEditedRating(index + 1);
    };

    return (
        <section id="review-display" className="reviewDisplay">
            <ReviewImportForm onReviewSubmitted={handleNewReview} loginInfo={loginInfo} onsetLike={onsetLike} />
            <div className="averageRatingInner">
                <h4> Comment ! </h4>
                {travelInfo ? ( // travelInfo가 존재하는 경우에만 렌더링
                    <div className="averageRating">
                        <span>평균 별점: {travelInfo.average_GRADE} / 5점</span>
                        <div>{renderStars(travelInfo.average_GRADE)}</div>
                    </div>
                ) : (
                    <div>Loading...</div> // travelInfo가 null이면 로딩 표시
                )}
            </div>
            <div className="contourLine6"></div>
            <div>
                {reviews && reviews.map((review, index) => (
                    <div key={index} className="reviewItem">
                        {loginInfo.email === review.email ? (
                            <>
                                {review.reviewno === editingId ? (
                                    <>
                                        <textarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            className="commentDetail"
                                        />
                                        <div className="editRating">
                                            <span style={{marginRight : '10px'}}>별점 수정 : </span>
                                            {[...Array(5)].map((star, i) => (
                                                <span
                                                    key={i}
                                                    className={`star ${i < editedRating ? 'filled' : ''}`}
                                                    onClick={() => handleRatingChange(i)}
                                                    style={{color: i < editedRating ? '#ffc107' : '#e4e5e9'}}
                                                >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                        <div className="commentInfo">
                                            <button onClick={() => submitEdit(review.reviewno)}>확인</button>
                                            <button onClick={cancelEditing}>취소</button>
                                        </div>
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
                                            <button style={{border: 'none'}} onClick={() => startEditing(review)}>수정</button>
                                            <button className="editingButton" onClick={() => deleteReview(review.reviewno)}>삭제</button>
                                        </div>
                                    </>
                                )}
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
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ReviewDisplay;
