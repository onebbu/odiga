import React, { useState, useEffect, useRef } from 'react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';

import './MainContents.css';

function Maincontents() {
    
    
    const [animate, setAnimate] = useState(true);
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);
    const [cosData , setCosData] = useState([]);


    // 코스 추천 8개
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await axios.get('/CourseSuggest');
          setCosData(result.data);
          console.log(cosData);
        } catch (error) {
          // 에러 처리
          console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
        }
      };
      fetchData();
    }, []);

    const stripHtmlAndEntities = (content) => {
      // HTML 태그 제거
      let strippedContent = content.replace(/<[^>]+>/g, '');
      // HTML 엔티티 제거
      strippedContent = strippedContent.replace(/&[^;]+;/g, '');
      return strippedContent;
    };
   
    //찜 많은 게시글 더미 데이터
    const [places, setPlaces] = useState([
      {
          imageUrl: "https://via.placeholder.com/150",
          name: "장소 1",
          address: "주소 1",
          likes: 10
      },
      {
          imageUrl: "https://via.placeholder.com/150",
          name: "장소 2",
          address: "주소 2",
          likes: 20
      },
      {
          imageUrl: "https://via.placeholder.com/150",
          name: "장소 3",
          address: "주소 3",
          likes: 30
      },
      {
        imageUrl: "https://via.placeholder.com/150",
        name: "장소 4",
        address: "주소 4",
        likes: 20
     },
     {
      imageUrl: "https://via.placeholder.com/150",
      name: "장소 5",
      address: "주소 5",
      likes: 20
     },
     {
      imageUrl: "https://via.placeholder.com/150",
      name: "장소 6",
      address: "주소 6",
      likes: 20
     },
     {
      imageUrl: "https://via.placeholder.com/150",
      name: "장소 7",
      address: "주소 7",
      likes: 20
     },
     {
      imageUrl: "https://via.placeholder.com/150",
      name: "장소 8",
      address: "주소 8",
      likes: 20
     },
     {
      imageUrl: "https://via.placeholder.com/150",
      name: "장소 9",
      address: "주소 9",
      likes: 20
     },
     {
      imageUrl: "https://via.placeholder.com/150",
      name: "장소 10",
      address: "주소 10",
      likes: 20
     },
  ]);


    
    

    return (
        <div className="mainContentsComp">
        <div className="mainContentsInner">
          <div className="popularContent">
              <div className="popularContentTittleInner" >
                <div className="popularContentTittle">
                 <i><FontAwesomeIcon icon={faFire}/></i>
                 <p>현재 가장 HOT한 여행코스</p>
                </div>
               
                        
              </div>
            


              <div className="popularContentSliderInner" 
                   onMouseEnter={onStop}
                   onMouseLeave={onRun}  >

                    <div className={"original".concat(
                      animate ? "" : " stop")}>

                  {cosData.map((cos) => (
                    <div className="popularContentCard" >

                      <div className="cardThumbnail">
                        <img src={cos.mainimage} className="cardImg"/>
                      </div>
                      <div className="cardInfo">
                        <div className="cardUserInfo">
                          <div className="cardUserNickname">
                            <i className="nickNameIcon"><FontAwesomeIcon icon={faUser} /></i>
                            <span>{cos.nickname}</span>                            
                            </div>                          
                          <div className="cardDate">
                            <i className="nickNameIcon"><FontAwesomeIcon icon={faCalendar} /></i>
                            <span>{cos.boarddate.split(' ')[0]}</span>
                          </div>
                        </div>
                        <div className="cardTitle">
                          <div className="cardUserTitle">
                            <h3>{cos.boardtitle}</h3>
                          </div>
                          <div className="cardUserDescription">
                            <p>{stripHtmlAndEntities(cos.boardcontent)}</p>
                          </div>
                        </div>
                        <div className="cardCategory"><p>#</p>{cos.category}</div> 
                      </div>
                   </div>
                       ))} 
                  </div>   

                   <div className={"clone".concat(animate ? "" : " stop")}>
                   {cosData.map((card) => (
                    <div className="popularContentCard">
                      <div className="cardThumbnail">
                        <img src={card.image} className="cardImg"/>
                      </div>
                      <div className="cardInfo">
                        <div className="cardUserInfo">
                          <div className="cardUserNickname">
                            <i className="nickNameIcon"><FontAwesomeIcon icon={faUser} /></i>
                            <span>{card.nickname}</span>                            
                            </div>                          
                          <div className="cardDate">
                            <i className="nickNameIcon"><FontAwesomeIcon icon={faCalendar} /></i>
                            <span>{card.date}</span>
                          </div>
                        </div>
                        <div className="cardTitle">
                          <div className="cardUserTitle">
                            <h3>{card.title}</h3>
                          </div>
                          <div className="cardUserDescription">
                            <p>{card.description}</p>
                          </div>
                        </div>
                        <div className="cardCategory"><p>#</p>{card.category}</div> 
                      </div>
                   </div>
                       ))}    
                       </div>              
              </div>
          </div>

          <div className="contourLine"></div>

          <div className="recommendContentInner">

             <div className="recommendContentTitleInner">
               <div className="recommendContentTitle">
                <p>많은 분들이 이곳으로 떠날 준비 중이에요! 🚕 </p>
               </div>
             </div>

             <div className="recommendMainContentInner">
              <div className="recommendMainContentContainer">
               {places.map((place, index) => (
                <div key={index} className="recommendMainContent">
                    <a href="#">
                        <div>
                            <img src={place.imageUrl} className="recommendMainContentImg"/>
                            <div className="likeCount">
                                <i className="heartIcon">♡ </i>
                                <span>{place.likes}</span>
                            </div>
                        </div>
                        <div className="recommendMainContentInfo">
                            <div className="1">
                                <h3>{place.name}</h3>
                                <p>{place.address}</p>
                            </div>                          
                        </div>
                    </a>
                </div>
                ))}

              

          
              </div>
             </div>
           </div>
        </div>
      </div>
    );


    
}

export default Maincontents;