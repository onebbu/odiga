import React from "react";
import axios from 'axios';
import styled from 'styled-components';

const Section = styled.section`
    position: relative;
    margin: 30px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 70%; 
`;

function LikeButton({ contentID, data }) {
    const sendLikeRequest = () => {
        axios.get(`/travelLike/${contentID}`)
            .then(response => {
                console.log("좋아요 눌렸습니다.");
            })
            .catch(error => {
                console.error('요청에 문제가 있습니다:', error);
            });
    };

    return (
        <Section id="action-bar">
            <div id="count-container">
                <span id="view-count">조회수: {data && (data.travelviewcount || 0)}</span>
                <span id="like-count">좋아요: {data && (data.likecount || 0)}</span>
            </div>
            <button id="like-button" onClick={sendLikeRequest}>
                좋아요
            </button>
        </Section>
    );
}

export default LikeButton;
