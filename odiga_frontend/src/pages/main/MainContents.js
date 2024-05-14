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
    const [traData, setTraData] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const Cosresult = await axios.get('/CourseSuggest');
          const Traresult = await axios.get('/TravelSuggest');
          setCosData(Cosresult.data);
          setTraData(Traresult.data);
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

                  {cosData.map((cosData) => (
                    
                    <div className="popularContentCard" >
                    <a href={`coursereview/detail/${cosData.boardno}`}>                       
                      <div className="cardThumbnail">
                        <img src={cosData.mainimage} className="cardImg"/>
                      </div>
                    </a>
                      <div className="cardInfo">
                        <div className="cardUserInfo">
                          <div className="cardUserNickname">
                            <i className="nickNameIcon"><FontAwesomeIcon icon={faUser} /></i>
                            <span>{cosData.nickname}</span>                            
                            </div>                          
                          <div className="cardDate">
                            <i className="nickNameIcon"><FontAwesomeIcon icon={faCalendar} /></i>
                            <span>{cosData.boarddate.split(' ')[0]}</span>
                          </div>
                        </div>
                        <div className="cardTitle">
                          <div className="cardUserTitle">
                            <h3>{cosData.boardtitle}</h3>
                          </div>
                          <div className="cardUserDescription">
                            <p>{stripHtmlAndEntities(cosData.boardcontent)}</p>
                          </div>
                        </div>
                        <div className="cardCategory"><p>#</p>{cosData.category}</div> 
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
               {traData.map((traData, index) => (
                <div key={index} className="recommendMainContent">
                    <a href={`/detail/${traData.contentid}`}> 
                        <div>
                            <img src={traData.firstimage} className="recommendMainContentImg"/>
                            <div className="likeCount">
                                <i className="heartIcon">♡ </i>
                                <span>{traData.wishlist_count}</span>
                            </div>
                        </div>
                        </a>
                        <div className="recommendMainContentInfo">
                            <div className="1">
                                <h3>{traData.title}</h3>
                                <p>{traData.addr1}</p>
                            </div>                          
                        </div>
                    
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