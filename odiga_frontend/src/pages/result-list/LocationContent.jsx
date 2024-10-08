import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";
import axios from "axios";
import "./LocationContent.css";
import { red } from '@mui/material/colors';
import PlaceIcon from '@mui/icons-material/Place';


function LocationContent(
    { show, handleClose, contentId}
) {

    const [data, setData] = useState([null]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`/api/contentId/${contentId}`);
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

        // cleanup 함수에서 completed 변수 제거
        return () => {
            setData(""); // 컴포넌트가 unmount될 때 data 초기화
        };
    }, []);

    const img = data[contentId]?.img;
    const likeCount = data[contentId]?.likeCount;
    const title = data[contentId]?.title;
    const addr = data[contentId]?.addr;
    const cat = data[contentId]?.cat;
    const catkr = data[contentId]?.catkr;
    const overview = data[contentId]?.overview;

    // 카테고리 텍스트에 따라 배경색과 폰트색을 매핑하는 객체
    const catColors = {
        '액티비티': { backgroundColor: '#B4DAF2', color: 'black'},
        '테마파크': { backgroundColor: '#B4DAF2', color: 'black'},
        '축제': { backgroundColor: '#B4DAF2', color: 'black'},
        '바다': { backgroundColor: '#DBDBC5', color: 'black'},
        '자연': { backgroundColor: '#DBDBC5', color: 'black'},
        '산': { backgroundColor: '#DBDBC5', color: 'black'},
        '문화역사': { backgroundColor: '#F7AB89', color: 'black'},
        '실내여행지': { backgroundColor: '#F7AB89', color: 'black'},
        '쇼핑': { backgroundColor: '#F7AB89', color: 'black'},
        '카페': { backgroundColor: '#F4D35E', color: 'black'},
        '식당': { backgroundColor: '#F4D35E', color: 'black'},
    };

    // 해당 카테고리의 배경색과 폰트색 가져오기
    const { backgroundColor, color } = catColors[cat] || { backgroundColor: 'gray', color: 'black' };



    const [selectedData, setSelectedData] = useState(null);
    const contentData = '';
    // 이미지, 주소, 좋아요(찜 추가되면 나중에 추가)

    // 모달을 열기 전에 선택된 데이터를 설정합니다.
    useEffect(() => {
        if (contentData) {
            setSelectedData(contentData);
        }
    }, [contentData]);


    const tokenData = sessionStorage.getItem("token");

    function openDetailPage() {
        sessionStorage.setItem("token", tokenData);
        window.open(`/detail/${contentId}`, "_blank");
    }

    return (
        <Modal show={show}
               onHide={handleClose}
               centered
               dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title
                style={{
                    fontFamily: "JalnanGothic",
                    fontSize: "25px"
                }}
                >
                    {title}
                    <span style={{
                        backgroundColor,
                        color,
                        fontSize: '15px',
                        fontFamily: "GmarketSansMedium",
                        padding: '0.25em 0.5em',
                        borderRadius: "8px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        lineHeight: "normal",
                        marginLeft: "0.8rem" // title과의 간격 조절
                    }}>{cat}_{catkr}</span>
                    <p style={{color:"#808080", fontSize: "1rem"}}> <FavoriteIcon sx={{ color: red[500], fontSize:"medium" }} /> {likeCount} </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center', fontFamily: "GmarketSansMedium"}}>
                {/*이미지, 주소 가운데 정렬 + 간격 두기*/}
                <Image src={img} rounded style={{width:"20rem", marginBottom: '1rem'}}/>
                <br />
                <span
                style={{
                    fontFamily: "GmarketSansMedium",
                    fontSize: "18px"
                }}
                ><PlaceIcon/> 주소: {addr}</span>
                <p
                    style={{
                        color: "gray"
                    }}
                >더 자세한 여행지 정보는? <button onClick={openDetailPage}
                style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "blue",
                    fontFamily: "GmarketSansMedium",
                    fontSize: "15px"
                }}
                >여기</button></p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LocationContent;