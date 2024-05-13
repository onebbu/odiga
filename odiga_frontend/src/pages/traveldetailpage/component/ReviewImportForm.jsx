import axios from "axios";
import React, { useState  , useContext , useEffect} from "react";
import styled from 'styled-components';
import '../TravelDetailPage.css';
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import {LoginInfoContext} from "../../login/LoginInfoProvider";


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

function ReviewImportForm({ onReviewSubmitted }) { 
    const { contentID } = useParams();
    const [reviewComment, setReviewComment] = useState('');
    const [reviewGrade, setReviewGrade] = useState(0);
    const [reviewdate, setReviewdate] = useState();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const navigate = useNavigate();
    const loginInfo = useContext(LoginInfoContext); 
    
    // 리뷰 글자 수 제한 
    const handleInputChange = (e) => {
        const input = e.target.value;
        if (input.length <= 100) {
            setReviewComment(input);
        } else {
            setReviewComment(input.substr(0, 100));
            alert("100byte 이하로 작성해 주세요.");
        }
    };
    
    //로그인 관련 
    const isUserLoggedIn = () => {
        return Boolean(localStorage.getItem('token'));
    };

    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    const handleSubmit = () => {
        if (!isUserLoggedIn()) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate('/login'); 
            return;
        }
        axios.post('/reviewImport',{
            contentid : contentID ,
            reviewcomment : reviewComment ,
            reviewgrade : reviewGrade,
            reviewdate : reviewdate , 
            email : loginInfo.email ,
            nickname : loginInfo.nickname
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
            console.error('에러 :', error); 
            alert("리뷰 제출 중 오류가 발생했습니다.");
        });
    };
    
    
    // 찜 추가 / 삭제 기능~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~백엔드 엔드포인트 확인해보셔야 함

    const handleLikeToggle = async () => {
        if (!localStorage.getItem('token')) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate('/login');
            return;
        }
        try {
            if (liked) { // 이미 찜한 상태라면 찜 취소 요청 보냄
                const response = await axios.post(`/WishDelete`, {
                    contentid: contentID, 
                    email: loginInfo.email,
                    nickname: loginInfo.nickname
                });
                if (response.status === 200) {
                    setLiked(false);
                    setLikes(prev => prev - 1);
                }
            } else { // 찜하지 않은 상태라면 찜 추가 요청 보냄
                const response = await axios.post(`/travelLike`, {
                    contentid: contentID,
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







    //찜 관련 (엔드포인트 임의 지정 travelLike)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버에서 좋아요 상태를 가져오는 요청
                const response = await axios.get(`/WishInfo?contentid=${contentID}&email=${loginInfo.email}`);
                if (response.data === 1) {
                    setLiked(true); // 서버에서 받아온 값이 1이면 liked를 true로 업데이트
                } else {
                    // 서버에서 받아온 값이 0이나 3이면 liked를 false로 업데이트 
                    setLiked(false);
                }
                
            } catch (error) {
                console.error('Failed to fetch like status:', error);
            }
        };
    
        fetchData();
    }, [contentID,loginInfo.email]);
    

    return(
        <div className="reviewImportForm"> 
            <p>별점과 리뷰로 여러분의 소중한 경험을 들려주세요 !</p>
            <div className="contourLine4"></div>
            <section className="starBox">
            <StarRating starCount={5} onChange={setReviewGrade} />
            {/* <div className="contourLine5"></div>
            <button onClick={handleLike} className="LikeButton">
                  <FontAwesomeIcon icon={faHeart} color={liked ? 'red' : 'gray'}/>
              </button> */}
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
              <button className="successButton" onClick={handleSubmit}> <h2>완료 ✔</h2> </button> 
              </div>
          </section>
          <section className="likeinner">
            <div className="likeTitle"> <h4> 다시 보고 싶다면 ? </h4> </div>
            <div>
            <button onClick={handleLikeToggle} className="LikeButton">
                <FontAwesomeIcon icon={faHeart} color={liked ? 'red' : 'gray'} style={{marginLeft : '10px'}}/>
            </button>
            </div>
          </section>
        </div>
    )

}

export default ReviewImportForm;