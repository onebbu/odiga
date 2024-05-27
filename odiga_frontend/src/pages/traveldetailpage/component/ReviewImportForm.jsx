import axios from "axios";
import React, {useState, useContext, useEffect} from "react";
import styled from 'styled-components';
import '../TravelDetailPage.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {LoginInfoContext} from "../../login/LoginInfoProvider";

const StarRatingContainer = styled.div`
  display: inline-block;
`;

const Star = styled.span`
  font-size: 40px;
  color: ${props => props.checked ? '#ffc107' : '#e4e5e9'};
  cursor: pointer;
`;

function StarRating({starCount, onChange}) {
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

function ReviewImportForm({onReviewSubmitted, modalContentId}) {
    const {contentID} = useParams();
    const [reviewComment, setReviewComment] = useState('');
    const [reviewGrade, setReviewGrade] = useState(0);
    const [reviewdate, setReviewdate] = useState();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const navigate = useNavigate();
    const loginInfo = useContext(LoginInfoContext);

    const [locaContId, setLocaContId] = useState("");

    useEffect(() => {
        if (typeof modalContentId === "undefined" || modalContentId === "" || modalContentId === null) {
            setLocaContId(contentID);
        } else {
            setLocaContId(modalContentId);
        }
    }, [modalContentId, contentID]);

    useEffect(() => {
        if (locaContId && loginInfo.email) {
            const fetchLikeStatus = async () => {
                try {
                    const response = await axios.get(`/WishInfo?contentid=${locaContId}&email=${loginInfo.email}`);
                    if (response.data === 1) {
                        setLiked(true);
                    } else {
                        setLiked(false);
                    }
                } catch (error) {
                    console.error('Failed to fetch like status:', error);
                }
            };

            fetchLikeStatus();
        }
    }, [locaContId, loginInfo.email]);

    const handleInputChange = (e) => {
        const input = e.target.value;
        if (input.length <= 100) {
            setReviewComment(input);
        } else {
            setReviewComment(input.substr(0, 100));
            alert("100byte 이하로 작성해 주세요.");
        }
    };

    const isUserLoggedIn = () => {
        return Boolean(sessionStorage.getItem('token'));
    };

    axios.interceptors.request.use(function (config) {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    const location = useLocation();
    const { pathname: from } = location;

    const handleSubmit = () => {
        if (!isUserLoggedIn()) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login", { state: { from } });
            return;
        }
        if (!locaContId) {
            alert("콘텐츠 ID가 유효하지 않습니다.");
            return;
        }
        if (reviewGrade === 0) {
            alert("별점을 선택해주세요.");
            return;
        }
        axios.post('/reviewImport', {
            contentid: locaContId,
            reviewcomment: reviewComment,
            reviewgrade: reviewGrade,
            reviewdate: reviewdate,
            email: loginInfo.email,
            nickname: loginInfo.nickname
        })
            .then(response => {
                console.log(response.data);
                alert("리뷰가 성공적으로 제출되었습니다!");
                setReviewComment('');
                setReviewGrade(0);
                onReviewSubmitted();
            })
            .catch(error => {
                console.error('에러 :', error);
                alert("리뷰 제출 중 오류가 발생했습니다.");
            });
    };

    const handleLikeToggle = async () => {
        if (!isUserLoggedIn()) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login", { state: { from } });
            return;
        }
        try {
            if (liked) {
                const response = await axios.post(`/WishDelete`, {
                    contentid: locaContId,
                    email: loginInfo.email,
                    nickname: loginInfo.nickname
                });
                if (response.status === 200) {
                    setLiked(false);
                    setLikes(prev => prev - 1);
                }
            } else {
                const response = await axios.post(`/travelLike`, {
                    contentid: locaContId,
                    email: loginInfo.email,
                    nickname: loginInfo.nickname
                });
                if (response.status === 200) {
                    setLiked(true);
                    setLikes(prev => prev + 1);
                }
            }
        } catch (error) {
            console.error('Like toggle request failed:', error);
        }
    };

    return (
        <div className="reviewImportForm">
            <p>별점과 리뷰로 여러분의 소중한 경험을 들려주세요 !</p>
            <div className="contourLine4"></div>
            <section className="starBox">
                <StarRating starCount={5} onChange={setReviewGrade}/>
            </section>
            <section className="reviewsuccessBox">
                <div>
              <textarea className="reviewBox"
                        value={reviewComment}
                        onChange={handleInputChange}
                        placeholder="리뷰를 작성해주세요 (100byte 이하)"
              />
                </div>
                <div className="successButtonBox">
                    <button className="successButton" onClick={handleSubmit}><h2>완료 ✔</h2></button>
                </div>
            </section>
            <section className="likeinner">
                <div className="likeTitle"><h4> 다시 보고 싶다면 ? </h4></div>
                <div>
                    <button onClick={handleLikeToggle} className="LikeButton">
                        <FontAwesomeIcon icon={faHeart} color={liked ? 'red' : 'gray'} style={{marginLeft: '10px'}}/>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ReviewImportForm;
