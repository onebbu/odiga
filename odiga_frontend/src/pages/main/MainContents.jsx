import React, { useState, useEffect, useRef } from 'react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import './MainContents.css';
import image1 from '../../assets/images/busan.png';
import image2 from '../../assets/images/mokupdata/합정.jpg';
import image3 from '../../assets/images/mokupdata/강릉.jpg';
import image4 from '../../assets/images/mokupdata/인천.jpg';
import image5 from '../../assets/images/mokupdata/서울숲.jpg';
import image6 from '../../assets/images/mokupdata/대구.jpg';
import image7 from '../../assets/images/mokupdata/경복궁.jpg';
import image8 from '../../assets/images/mokupdata/전주.jpg';

function MainContents() {
    // const [cards, setCards] = useState([]); 

    // useEffect(() => {
    //      //   const fetchCards = async () => {
    //     try {
    //       const response = await fetch('YOUR_API_ENDPOINT');
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const data = await response.json();
    //       setCards(data);
    //     } catch (error) {
    //       console.error('Fetch error:', error);
    //     }
    //   };
  
    //   fetchCards();
    // }, []); 
    let cardData = [
      {
        id: 1,
        nickname: '여행 조아',
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
        nickname: '집에있는데집에가고싶다',
        date: '2024.04.10',
        title: '영종도 당일치기 코스 공유',
        description: 'ㅁㄴㅇㅁ우짐어ㅣ먀넝ㅈ머ㅣㄻㄴㅇㅁㅇㅁ너이점이ㅑㅓ이ㅑㅓㅈ미ㅑㅓㄴ이ㅓㅈ미ㅑ어',
        category: '인천',
        image: image4 
      },

      {
        id: 5,
        nickname: '미미미미미미미미',
        date: '2024.04.17',
        title: '서울숲 여행',
        description: '서울숲을 다녀왔어요',
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
    

   
    






    return (
        <div className="mainContentsComp">
        <div className="mainContentsInner">
          <div className="popularContent">
              <div className="popularContentTittle">
                <i><FontAwesomeIcon icon={faFire}/></i>
                <p>현재 가장 HOT한 여행지</p>
              
              </div>
              <div className="popularContentGrid">

              {cardData.map((card) => (

              <div className="popularContentGridCard" key={card.id}>
                <div className="card">
                  <div className="thumbnail">
                    <img src={card.image} className="card-image" alt={card.title}/>
                  </div>
                  <div className="card-info">
                    <div className="user-info">
                      <span className="nickname">{card.nickname}</span>
                      <span className="date"> | {card.date}</span>
                    </div>
                    <h2 className="title">{card.title}</h2>
                    <p className="description">{card.description}</p>
                    <div className="category"><p>{card.category}</p></div>
                  </div>
                </div>
              </div>
            
              ))}


             </div>
            
          </div>
          <div className="topRatedTourContent"></div>
        </div>
      </div>
    );


    
}

export default MainContents;