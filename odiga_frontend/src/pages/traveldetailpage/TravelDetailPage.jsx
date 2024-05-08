import React, { useState ,  useEffect } from "react";
import axios from 'axios';
import ReviewImportForm from './component/ReviewImportForm';
import ReviewDisplay from "./component/ReviewDisplay";
import Header from "../tiles/Header";
import './TravelDetailPage.css';
import Footer from '../component/footer/Footer';
import Slider from "react-slick";
import './slick.css';
import './slick-theme.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';





//현재는 임의로 설정 추후 수정요망

function TravelDetailPage() {
    const [likes, setLikes] = useState(0);
    const [data, setData] = useState(null);
    const [imgs , setImgs] = useState(null);
    const [didMount, setDidMount] = useState(false); // 컴포넌트가 마운트되었는지 여부를 나타내는 상태
    // let mountCount = 1
    const { contentID } = useParams();
    
    useEffect(() => {

        // console.log('mount: ', mountCount)
        // mountCount++
        setDidMount(true)
        return () => {
        //   console.log('unmount')
        }
      }, [])


    useEffect(() => {
    //   console.log('didMount: ', didMount);
      if (didMount) {
        // 백엔드 API 호출
        axios.get(`/detail/${contentID}`)
          .then(response => {
            setData(response.data); // 데이터를 상태에 저장
            // console.log('view count +1');
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }
    }, [didMount]);
    useEffect(()=> {
        
            axios.get(`/imgs/${contentID}`)
            .then(response => {
                setImgs((response.data));
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
        
    },[didMount])
    
    
    useEffect(() => {
        if (data) {
            const script = document.createElement('script');
            script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qdemuo7rvh&callback=initMap';
            script.async = true;
            script.onload = () => {
                const mapOptions = {
                    center: new window.naver.maps.LatLng(data.mapy, data.mapx),
                    zoom: 17
                };
                
                const map = new window.naver.maps.Map('map', mapOptions);
                
                const markerOptions = {
                    position: new window.naver.maps.LatLng(data.mapy, data.mapx),
                    map: map
                };
                
                const marker = new window.naver.maps.Marker(markerOptions);
                
                const contentString = `
                    <div>
                        <h2>${data.title}</h2>
                        <p>${data.addr1}</p>                        
                        <img src=${data && data.firstimage} style="max-width: 200px;"></img>
                    </div>
                `;
                
                const infoWindow = new window.naver.maps.InfoWindow({
                    content: contentString
                });
                
                window.naver.maps.Event.addListener(marker, 'click', function() {
                    infoWindow.open(map, marker);
                });
            };
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [data]);

    //Slick 라이브러리 사용
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false, 
    };


    
   return (
         <div className="inner">
            <Header/>
             <div className="main">
               <section className="travelTitle" id="travel-name">                    
                  <h2 id="name-placeholder">{data && data.title}</h2>
                  <p id="name-placeholder">{data && data.addr1}</p>
                </section>

                <section className="detailInfo" id="detail-info">
                  <div className="InfoAndLikeBox">
                    <h2>상세 정보</h2>
                    <LikeButton likes={likes} setLikes={setLikes} data={data}/>
                  </div>                    
                    <div className="contourLine3"></div>
                    <p id="detail-placeholder">{data && data.overview && data.overview.replace(/<br\s*\/?>/ig, '')}</p>
                </section>
                <section className="mapLocation" id="map-location">   
                    <div id="map" style={{ width: '100%', height: '500px' }}></div>
                </section>
                <section className="tagList" id="tag-list">
                  <div className="tagItem" id="tag-list-placeholder">
                    {data && (
                      <>
                        {data.cat1 && (
                          <div className="tagItemBox">
                            <p>#{data.cat1}</p>
                          </div>
                        )}
                        {data.cat2 && (
                          <div className="tagItemBox">
                            <p>#{data.cat2}</p>
                          </div>
                        )}
                        {data.cat3 && (
                          <div className="tagItemBox">
                            <p>#{data.cat3}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </section>
                <section className="slider" id="similar-destinations">
                     <p>사진을 움직여 둘러보세요!</p>
                     <Slider {...settings} id="similar-destinations-placeholder" >
                       {data && data.firstimage && (
                         <div>
                          <img src={data.firstimage} alt="비슷한 여행지 사진 1" className="sliderImg" />
                         </div>
                       )}
                       {imgs && imgs.length > 0 && (
                        <div >
                         <img src={imgs[0]} alt="비슷한 여행지 사진 2" className="sliderImg"/>
                        </div>
                       )}
                       {imgs && imgs.length > 1 && (
                        <div >
                         <img src={imgs[1]} alt="비슷한 여행지 사진 3" className="sliderImg"/>
                        </div>
                       )}
                     </Slider>
                </section>

                <section id="reviews">
                    <ReviewImportForm/>
                </section>
                
                {/* <section id="review-display">
                    <ReviewDisplay/>
                </section> */}



             </div>
            <Footer/>
         </div>




   )

}


function LikeButton({data}) {
  const { contentID } = useParams();
  const sendLikeRequest = () => {
      // axios를 사용하여 GET 요청 보내기
      axios.get(`/travelLike/${contentID}`)
          .then(response => {
              console.log("좋아요누름");
          })
          .catch(error => {
              console.error('There was a problem with the request:', error);
          });
  };
  return (
      <section className="actionBar" id="action-bar">
          <div className="countContainer"id="count-container">
              {/* <img src="view-icon.png" alt="icon" /> */}
              <span id="view-count">👀 {data && (data.travelviewcount || 0)}</span>
              {/* <img src="like-icon.png" alt="icon" /> */}
              <span id="like-count">
                 <button className="Likebutton" id="like-button" onClick={sendLikeRequest}>
                  <FontAwesomeIcon icon={faHeart} />  
                 </button> {data && (data.likecount || 0)}
              </span>
          </div>
         
      </section>
         
  );
}


export default TravelDetailPage;