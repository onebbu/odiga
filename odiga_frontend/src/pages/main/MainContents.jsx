import React, { useState, useEffect, useRef } from 'react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import './MainContents.css';
import image1 from '../assets/images/busan.png';
import image2 from '../assets/images/mokupdata/합정.jpg';
import image3 from '../assets/images/mokupdata/강릉.jpg';
import image4 from '../assets/images/mokupdata/인천.jpg';
import image5 from '../assets/images/mokupdata/서울숲.jpg';
import image6 from '../assets/images/mokupdata/대구.jpg';
import image7 from '../assets/images/mokupdata/경복궁.jpg';
import image8 from '../assets/images/mokupdata/전주.jpg';
import image9 from '../assets/images/asdf.png';

function Maincontents() {
    // 인기 게시글 더미 데이터 
    let cardData = [
      {
        id: 1,
        nickname: '여행조아',
        date: '2024.04.17',
        title: '부산 ! 다녀와보셨나요 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ?',
        description: '친구가 부산을 살아서 여행 겸 다녀와본적이 있었는데요~~~~~~~~',
        category: '부산',
        image: image1 
      },

      {
        id: 2,
        nickname: '여행전문가',
        date: '2024.04.18',
        title: '합정으로 와봤어요~',
        description: '벚꽃이 필 때 가장 이쁜 합정 길을 다녀와봤는데요 ~ ',
        category: '서울',
        image: image2 
      },

      {
        id: 3,
        nickname: '오늘정말피곤하다',
        date: '2024.04.17',
        title: '2박3일 강릉 여행 :)',
        description: '친구들과 함께 여행을 떠나볼까 하다가 강릉을 가게 되었는데요',
        category: '강릉',
        image: image3 
      },

      {
        id: 4,
        nickname: '집에있는데집에',
        date: '2024.04.10',
        title: '영종도 당일치기 코스 공유 여러분에게 꼭 필요할걸요?',
        description: 'ㅁㄴㅇㅁ우짐어ㅣ먀넝ㅈ머ㅣㄻㄴㅇㅁㅇㅁ너이점이ㅑㅓ이ㅑㅓㅁㄴㅇㅁ우짐어ㅣ먀넝ㅈ머ㅣㄻㄴㅇㅁㅇㅁ너이점이ㅑㅓ이ㅑㅓㅈ미ㅑㅓㄴ이ㅓㅈ미ㅑ어ㅁㄴㅇㅁ우짐어ㅣ먀넝ㅈ머ㅣㄻㄴㅇㅁㅇㅁ너이점이ㅑㅓ이ㅑㅓㅈ미ㅑㅓㄴ이ㅓㅈ미ㅑ어ㅁㄴㅇㅁ우짐어ㅣ먀넝ㅈ머ㅣㄻㄴㅇㅁㅇㅁ너이점이ㅑㅓ이ㅑㅓㅈ미ㅑㅓㄴ이ㅓㅈ미ㅑ어ㅈ미ㅑㅓㄴ이ㅓㅈ미ㅑ어',
        category: '인천',
        image: image4 
      },

      {
        id: 5,
        nickname: '미미미미미미미미',
        date: '2024.04.17',
        title: '서울숲 여행',
        description: '서울숲을 다녀왔어요서울숲을 다녀왔어요',
        category: '서울',
        image: image5
      },

      {
        id: 6,
        nickname: '도시여행',
        date: '2024.04.09',
        title: '동성로 탐방',
        description: '동성로에 다녀와봤습니다',
        category: '대구',
        image: image6 
      },

      {
        id: 7,
        nickname: '한량',
        date: '2024.04.08',
        title: '경복궁',
        description: '오늘은 경복궁에 다녀왔다',
        category: '서울',
        image: image7 
      },

      {
        id: 8,
        nickname: '아아아',
        date: '2024.04.05',
        title: '전주 1박 2일',
        description: '전주우~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
        category: '전주',
        image: image8 
      },
   
      
     
    ];
    
    const [animate, setAnimate] = useState(true);
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);


    // 찜목록 많은 게시글 백엔드 호출 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await fetch('/api/places');
    //         const data = await result.json();
    //         setPlaces(data);
    //     };
    //     fetchData();
    // }, []);
   
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
                 <p>현재 가장 HOT한 여행지</p>
                </div>
               
                        
              </div>
            


              <div className="popularContentSliderInner" 
                   onMouseEnter={onStop}
                   onMouseLeave={onRun}  >

                    <div className={"original".concat(
                      animate ? "" : " stop")}>

                  {cardData.map((card) => (
                    <div className="popularContentCard" >

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

                   <div className={"clone".concat(animate ? "" : " stop")}>
                   {cardData.map((card) => (
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