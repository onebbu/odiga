import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useParams} from "react-router-dom";
import axios from "axios";
import "./LocationContent.css";
import { red } from '@mui/material/colors';


function LocationContent(
    { show, handleClose, contentId}
    // { show, handleClose}
) {

    const [data, setData] = useState([null]);
    // const { contentId } = useParams();

    // const id = 2860963;

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`/contentId/${contentId}`);
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

    console.log("현재 타이틀",data[contentId]?.title);
    
    console.log("확인",data[contentId]);


    const img = data[contentId]?.img;
    const likeCount = data[contentId]?.likeCount;
    const title = data[contentId]?.title;
    const addr = data[contentId]?.addr;
    const cat = data[contentId]?.cat;
    const catkr = data[contentId]?.catkr;

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


    return (
        <Modal show={show}
               onHide={handleClose}
               centered
               dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                    <span style={{
                        backgroundColor,
                        color,
                        fontSize: '60%',
                        fontFamily: "GmarketSansMedium",
                        padding: '0.25em 0.5em',
                        borderRadius: "25%",
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
                {addr}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LocationContent;