import React, { useEffect, useState , useContext } from "react";
import axios from "axios";
import '../TravelDetailPage.css';
import ReviewImportForm from './ReviewImportForm'; 
import { useParams } from 'react-router-dom';
import {LoginInfoContext} from "../../login/LoginInfoProvider";

function ReviewDisplay(props) {
    const { contentID } = useParams();
    const [reviews, setReviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const loginInfo = useContext(LoginInfoContext);
    const { travelInfo } = props;


    useEffect(() => {
        fetchReviews();
        console.log(reviews);
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/reviews/${contentID}`); 
            setReviews(response.data);
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
                <span key={i} style={{ color: i < rating ? '#ffc107' : '#e4e5e9' }}>&#9733;</span>
            );
        }
        return stars;
    };



    //리뷰 수정 / 삭제 기능 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~변수명, 엔드포인트 확인 필요~~~~

    const startEditing = (review) => {
        console.log(review);
        setEditingId(review.reviewno);
        setEditedContent(review.reviewcomment);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditedContent('');
    };

    const submitEdit = async (reviewno) => {
        try {
            await axios.post(`/ReviewUpdate`, 
            {  reviewno : reviewno ,
                reviewcomment: editedContent
            });
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
                axios.post(`/ReviewDelete/${reviewno}`);
                
            } catch (error) {
                console.error("리뷰 삭제 중 오류가 발생했습니다:", error);
            }
        }fetchReviews();
    };

    return (
        <section id="review-display" className="reviewDisplay">
            <ReviewImportForm onReviewSubmitted={handleNewReview} />
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
            <div id="review-display-placeholder">


            {reviews.map((review, index) => (
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
                                        <button onClick={() => startEditing(review)}>수정</button>
                                        <button onClick={() => deleteReview(review.reviewno)}>삭제</button>
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
            {/* <div id="review-display-placeholder">
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
            </div> */}
        </section>
    );
}

export default ReviewDisplay;
