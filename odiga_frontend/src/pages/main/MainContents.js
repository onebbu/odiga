import React, { useState, useEffect, useRef } from 'react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import './MainContents.css';

function Maincontents() {
    const [animate, setAnimate] = useState(true);
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);
    const [cosData, setCosData] = useState([]);
    const [traData, setTraData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const cloneDataRef = useRef([]); 

    // 데이터 불러오기
    useEffect(() => {
      const fetchData = async () => {
        try {
          const Cosresult = await axios.get('/api/CourseSuggest');
          const Traresult = await axios.get('/api/TravelSuggest');
          setCosData(Cosresult.data.slice(0, 8)); 
          setTraData(Traresult.data.slice(0, 10)); 
          cloneDataRef.current = [...Cosresult.data.slice(0, 8)];
          setLoading(false); // 데이터 로드 완료
        } catch (error) {
          console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
          setLoading(false); // 오류가 발생해도 로딩 상태 해제
        }
      };
      fetchData();
    }, []);

    const stripHtmlAndEntities = (content) => {
      let strippedContent = content.replace(/<[^>]+>/g, '');
      strippedContent = strippedContent.replace(/&[^;]+;/g, '');
      return strippedContent;
    };

    // 로딩 중일 때 로딩 메시지 표시
    if (loading) {
      return <p>Loading...</p>;
    }

    return (
        <div className="mainContentsComp">
          <div className="mainContentsInner">
            <div className="popularContent">
              <div className="popularContentTittleInner">
                <div className="popularContentTittle">
                  <i><FontAwesomeIcon icon={faFire}/></i>
                  <p>현재 가장 HOT한 여행코스</p>
                </div>
              </div>
              <div className="popularContentSliderInner" 
                   onMouseEnter={onStop}
                   onMouseLeave={onRun}>
                <div className={"original".concat(animate ? "" : " stop")}>
                  {Array.isArray(cosData) && cosData.map((cosItem) => (
                    <div className="popularContentCard" key={cosItem.boardno}>
                      <a href={`coursereview/detail/${cosItem.boardno}`}>             
                        <div className="cardThumbnail">
                          <img src={cosItem.mainimage} className="cardImg" alt="thumbnail"/>
                        </div>
                        <div className="cardInfo">
                          <div className="cardUserInfo">
                            <div className="cardUserNickname">
                              <span>{cosItem.nickname}</span>
                            </div>
                            <div className="contourLineCardInfo"></div>        
                            <div className="cardDate">
                              {/* 안전한 split 호출 */}
                              <span className="dateFont">
                                {cosItem.boarddate ? cosItem.boarddate.split(' ')[0] : 'No Date'}
                              </span>
                            </div>
                          </div>
                          <div className="cardTitle">
                            <div className="cardUserTitle">
                              <h6>{cosItem.boardtitle}</h6>
                            </div>
                            <div className="cardUserDescription">
                              <p>{stripHtmlAndEntities(cosItem.boardcontent)}</p>
                            </div>
                          </div>
                          <div className="cardCategory">
                            #{cosItem.tags && cosItem.tags.split('#')[1] ? cosItem.tags.split('#')[1] : ''}
                          </div>
                        </div>
                      </a>
                    </div>
                  ))} 
                </div>   

                <div className={"clone".concat(animate ? "" : " stop")}>
                  {Array.isArray(cloneDataRef.current) && cloneDataRef.current.map((card, index) => (
                    <div className="popularContentCard" key={index}>
                      <a href={`coursereview/detail/${card.boardno}`}>
                        <div className="cardThumbnail">
                          <img src={card.mainimage} className="cardImg" alt="thumbnail"/>
                        </div>
                        <div className="cardInfo">
                          <div className="cardUserInfo">
                            <div className="cardUserNickname">
                              <span>{card.nickname}</span>
                            </div>
                            <div className="contourLineCardInfo"></div>  
                            <div className="cardDate">
                              {/* 안전한 split 호출 */}
                              <span className="dateFont">
                                {card.boarddate ? card.boarddate.split(' ')[0] : 'No Date'}
                              </span>
                            </div>
                          </div>
                          <div className="cardTitle">
                            <div className="cardUserTitle">
                              <h6>{card.boardtitle}</h6>
                            </div>
                            <div className="cardUserDescription">
                              <p>{stripHtmlAndEntities(card.boardcontent)}</p>
                            </div>
                          </div>
                          <div className="cardCategory">
                            #{card.tags && card.tags.split('#')[1] ? card.tags.split('#')[1] : ''}
                          </div>
                        </div>
                      </a>
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
                  {Array.isArray(traData) && traData.map((traItem, index) => (
                    <div key={index} className="recommendMainContent">
                      <a href={`/detail/${traItem.contentid}`}>
                        <div className="imageContainer">
                          <img src={traItem.firstimage} className="recommendMainContentImg" alt="thumbnail"/>
                          <div className="overlay">
                            <h5 className="overlayTitle">{traItem.title}</h5>
                            <p className="overlayAddr">{traItem.addr1}</p>
                          </div>
                          <div className="likeCount">
                            <i><FontAwesomeIcon icon={faHeart} style={{color : '#DC143C ', fontSize : '18px'}}/></i>
                            <span style={{fontSize : '18px'}}>{traItem.wishlist_count}</span>
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
