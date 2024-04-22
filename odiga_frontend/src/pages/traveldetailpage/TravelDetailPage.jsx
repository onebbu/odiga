import React, { useState ,  useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import ReviewImportForm from './component/ReviewImportForm';
import ReviewDisplay from "./component/ReviewDisplay";

const Container = styled.body`
    margin: 0;
    padding: 0;
    text-align: center;
    color: #333;
`;

const Header = styled.header`
    background-color: #007bff;
    color: #fff;
    padding: 20px;
    text-align: center;
`;

const Main = styled.main`
    padding: 20px;
`;

const Section = styled.section`
    position: relative;
    margin: 30px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 70%; 
`;

const H2 = styled.h2`
    margin-bottom: 10px;
`;

const Tag = styled.span`
    display: inline-block;
    background-color: #e7f5ff;
    color: #333;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
    font-size: 14px;
`;

//현재는 임의로 설정 추후 수정요망
export const contentID = 2370995;

function TravelDetailPage() {
    const [likes, setLikes] = useState(0);
    const [data, setData] = useState(null);
    const [didMount, setDidMount] = useState(false); // 컴포넌트가 마운트되었는지 여부를 나타내는 상태
    // let mountCount = 1
    
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

    






    return (
        <Container>
            <Header>
                <h1>여행지 상세 정보</h1>
            </Header>

            <Main>
                <LikeButton likes={likes} setLikes={setLikes} data={data}/>
                <Section id="travel-name">
                    <H2>여행지 이름</H2>
                    <p id="name-placeholder">{data && data.title}</p>
                </Section>

                <Section id="map-location">
                    <H2>지도 위치</H2>
                    <div id="map" style={{ width: '100%', height: '400px' }}></div>
                </Section>

                <Section id="detail-info">
                    <H2>상세 정보</H2>
                    <p id="detail-placeholder">{data && data.overview && data.overview.replace(/<br\s*\/?>/ig, '')}</p>
                </Section>

                <Section id="tag-list">
                    <H2>태그 목록</H2>
                    <div id="tag-list-placeholder">
                        <Tag>#벛꽃</Tag>
                        <Tag>#축제</Tag>
                        <Tag>#가고싶다</Tag>
                    </div>
                </Section>

                <Section id="similar-destinations">
                    <H2>비슷한 여행지 추천 목록</H2>
                    <div id="similar-destinations-placeholder">
                        <img src={data && data.firstimage} alt="비슷한 여행지 사진 1" />
                        <img src="https://image.ajunews.com/content/image/2020/10/29/20201029110919207531.jpg" alt="비슷한 여행지 사진 2" />
                        <img src="https://img.freepik.com/free-photo/woman-traveler-with-backpack-walking-in-row-of-yellow-ginkgo-tree-in-autumn-autumn-park-in-tokyo-japan_335224-178.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1712102400&semt=ais" alt="비슷한 여행지 사진 3" />
                    </div>
                </Section>

                <Section id="reviews">
                    <ReviewImportForm/>
                </Section>

                <Section id="review-display">
                    <ReviewDisplay/>
                </Section>
            </Main>
        </Container>
    );
}

function LikeButton({data}) {
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
        <Section id="action-bar">
            <div id="count-container">
                {/* <img src="view-icon.png" alt="icon" /> */}
                <span id="view-count">조회수: {data && (data.travelviewcount || 0)}</span>
                {/* <img src="like-icon.png" alt="icon" /> */}
                <span id="like-count">좋아요: {data && (data.likecount || 0)}</span>
            </div>
            <button id="like-button" onClick={sendLikeRequest}>
                좋아요
            </button>
        </Section>
           
    );
}

export default TravelDetailPage;

