import React, { useState, useEffect, useRef } from 'react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
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
    const cloneDataRef = useRef([]); 


    useEffect(() => {
      const fetchData = async () => {
        try {
          const Cosresult = await axios.get('/CourseSuggest');
          const Traresult = await axios.get('/TravelSuggest');
          setCosData(Cosresult.data.slice(0, 8)); 
          setTraData(Traresult.data.slice(0, 10)); 
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

    useEffect(() => {
      cloneDataRef.current = [...cosData];
    }, [cosData]);
   
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
                <div className={"original".concat(animate ? "" : " stop")}>
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
                            <span>{cosData.nickname}</span>                            
                          </div>   
                          <div className="contourLineCardInfo"></div>        
                          <div className="cardDate">                            
                            <span className="dateFont">{cosData.boarddate.split(' ')[0]}</span>
                          </div>
                        </div>
                        <div className="cardTitle">
                          <div className="cardUserTitle">
                            <h5>{cosData.boardtitle}</h5>
                          </div>
                          <div className="cardUserDescription">
                            <p>{stripHtmlAndEntities(cosData.boardcontent)}</p>
                          </div>
                        </div>
                        {/* 백엔드 엔드포인트에 카테고리 없음 */}
                        <div className="cardCategory"><p>#</p>{cosData.category}</div> 
                      </div>
                   </div>
                  ))} 
                </div>   

                <div className={"clone".concat(animate ? "" : " stop")}>
                  {cloneDataRef.current.map((card, index) => (
                    <div className="popularContentCard" key={index}>
                      <div className="cardThumbnail">
                        <img src={card.mainimage} className="cardImg"/>
                      </div>
                      <div className="cardInfo">
                        <div className="cardUserInfo">
                          <div className="cardUserNickname">                            
                            <span>{card.nickname}</span>                            
                          </div>
                          <div className="contourLineCardInfo"></div>  
                          <div className="cardDate">                            
                            <span className="dateFont">{card.boarddate.split(' ')[0]}</span>
                          </div>
                        </div>
                        <div className="cardTitle">
                          <div className="cardUserTitle">
                            <h5>{card.boardtitle}</h5>
                          </div>
                          <div className="cardUserDescription">
                            <p>{stripHtmlAndEntities(card.boardcontent)}</p>
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
                      <div className="imageContainer">
                        <img src={traData.firstimage} className="recommendMainContentImg"/>
                        <div className="overlay">
                           <h5 className="overlayTitle">{traData.title}</h5>
                           <p className="overlayAddr">{traData.addr1}</p>
                        </div>
                        <div className="likeCount">
                          <i><FontAwesomeIcon icon={faHeart} style={{color : '#DC143C ', fontSize : '18px'}}/> </i>
                          <span style={{fontSize : '18px'}}>{traData.wishlist_count}</span>
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
