import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReviewDisplay from "./component/ReviewDisplay";
import './TravelDetailPage.css';
import Slider from "react-slick";
import './slick.css';
import './slick-theme.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';

function TravelDetailPage({ modalContentId }) {
    const [likes, setLikes] = useState(0);
    const [data, setData] = useState(null);
    const [imgs, setImgs] = useState([]);
    const [views, setViews] = useState(0);
    const navigate = useNavigate();
    const { contentID } = useParams();
    const [locaContId, setLocaContId] = useState("");

    useEffect(() => {
        setLocaContId(modalContentId || contentID);
    }, [modalContentId, contentID]);

    useEffect(() => {
        if (locaContId) {
            fetchData();
        }
    }, [locaContId]);

    const fetchData = async () => {
        try {
            const detailResponse = await axios.get(`/detail/${locaContId}`);
            setData(detailResponse.data);
            setLikes(detailResponse.data.wishlist_count || 0);
            setViews(detailResponse.data.travelviewcount || 0);
            const imgsResponse = await axios.get(`/imgs/${locaContId}`);
            setImgs(imgsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleNewLike = () => {
        fetchData();  // 새 하트가 추가될 때마다 fetchData 새로고침
    };

    useEffect(() => {
        if (data) {
            const script = document.createElement('script');
            script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qdemuo7rvh&callback=initMap';
            script.async = true;
            script.onload = () => {
                const mapOptions = {
                    center: new window.naver.maps.LatLng(data.mapy, data.mapx),
                    zoom: 80
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
                        <img src=${data.firstimage} style="max-width: 200px;"></img>
                    </div>
                `;

                const infoWindow = new window.naver.maps.InfoWindow({
                    content: contentString
                });

                window.naver.maps.Event.addListener(marker, 'click', function () {
                    infoWindow.open(map, marker);
                });
            };
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [data]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <div className="inner">
            <div className="main">
                <section className="travelTitle" id="travel-name">
                    <h2 id="name-placeholder">{data && data.title}</h2>
                    <p id="name-placeholder">{data && data.addr1}</p>
                </section>

                <section className="detailInfo" id="detail-info">
                    <div className="InfoAndLikeBox">
                        <h2>상세 정보</h2>
                        <div className="likeview">
                            <span id="view-count">👀 {views}</span>
                            <span style={{ marginLeft: '20px' }}><FontAwesomeIcon icon={faHeart} /> {likes}</span>
                        </div>
                    </div>
                    <div className="contourLine3"></div>
                    <p id="detail-placeholder">{data && data.overview && data.overview.replace(/<br\s*\/?>/ig, '')}</p>
                </section>

                <section className="mapLocation" id="map-location">
                    <div id="map" style={{ width: '80%', height: '500px' }}></div>
                </section>

                {/* 밑에 이 section 안쓰는거 아님???????? */}
                {/* <section className="tagList" id="tag-list"style={{backgroundColor:'hotpink'}}> 
                    <div className="tagItem" id="tag-list-placeholder" style={{backgroundColor:'hotpink'}}>
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
                </section> */}
                <section className="slider" id="similar-destinations">
                    <p>사진을 움직여 둘러보세요!</p>
                    <Slider {...settings}>
                        {data && data.firstimage && (
                            <div className="sliderImgBox">
                                <img src={data.firstimage} alt="비슷한 여행지 사진 1" className="sliderImg" />
                            </div>
                        )}
                        {imgs && imgs.length > 0 && imgs.map((img, index) => (
                            <div key={index}>
                                <img src={img} alt={`비슷한 여행지 사진 ${index + 2}`} className="sliderImg" />
                            </div>
                        ))}
                    </Slider>
                </section>

                <section id="review-display">
                    <ReviewDisplay travelInfo={data} onsetLike={handleNewLike}/>
                </section>

            </div>
        </div>
    );
}

export default TravelDetailPage;
