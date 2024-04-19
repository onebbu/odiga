import React, { useState } from "react";
import styled from "styled-components";
import './CP.css';
import date1 from './img/date_1.png'; import date2 from './img/date_2.png'; import date3 from './img/date_3.png';

// localhost:3000/preference
const Wrapper= styled.div`
    margin: 0;
    padding: 0;
    font-family: 'JalnanGothic';
    background: #f3f4f6; /* 미미한 회색 */
    overflow: auto;
`;
const Container=styled.div`
    max-width: 56rem; margin-left: auto; margin-right: auto; padding: 6px;
`;

function ChoosePreference() {
    return(
        <Wrapper>
            <Container>
            <div className="content"> {/*item 1*/}
                <div className="content-top">
                    <h2>이번 여행, 어디로 떠나볼까요?</h2>
                    <div className="content-step">
                        <div className="step-indicator active">1</div>
                        <div className="step-indicator">2</div>
                        <div className="step-indicator">3</div>
                    </div>
                </div>
                <p><em>여행을 떠나고 싶은 지역을</em> <br/>선택해 주세요.</p>
                <div className="grid1">
                    <ButtonList List={ITEM1} OneCheck={true}/>
                </div>
            </div>

            <div className="content"> {/*item 2*/}
                <div className="content-top">
                    <h2>며칠동안 여행을 떠나시나요? </h2>
                    <div className="content-step">
                        <div className="step-indicator">1</div>
                        <div className="step-indicator active">2</div>
                        <div className="step-indicator">3</div>
                    </div>
                </div>
                <p><em>여행 기간을</em><br/>선택해 주세요.</p>
                <div className="select_priod">
                    <ButtonList List={ITEM2} OneCheck={true}/>
                </div>
            </div>
        
            <div className="content"> {/*item 3*/}
                <div className="content-top">
                    <h2>마지막으로 이번 여행의 테마를 정해볼까요?</h2>
                    <div className="content-step">
                        <div className="step-indicator">1</div>
                        <div className="step-indicator">2</div>
                        <div className="step-indicator active">3</div>
                    </div>
                </div>
                <p><em>원하는 여행 테마를 2개 이상</em><br/>선택해 주세요. (최대 4개)</p>
                <div className="grid2">
                    <ButtonList List={ITEM3} OneCheck={false} />
                </div>
            </div>
            <button id="nextbtn">다음</button>
            </Container>
        </Wrapper>
    );
}
function ButtonList ({List, OneCheck}) {
    const [isSelected, setIsSelected]= useState([false]);
    const testList = List;
    const handleClick = (idx) => {
        const newArr = Array(testList.length).fill(false);
        newArr[idx] = true;
        setIsSelected(newArr);
    };
    const handleClick2 = (idx) => {
        let cnt = 0;
        let copy = [...isSelected];
        copy[idx] = !isSelected[idx];
        copy.forEach(el => { if (el) cnt += 1; });
        if (cnt > 4) {
            alert('이미 4개를 선택하셨습니다. 다른 여행지를 선택하고 싶으시면 선택한 여행지를 해제 후, 선택해주세요');
            copy[idx] = isSelected[idx];
        }
        setIsSelected(copy);
    };
    return ( 
        testList.map((elm, index) => {
            return (
                <Button
                    key={index}
                    handleClick={OneCheck ? handleClick : handleClick2}
                    isSelected={isSelected[index]}
                    elementIndex={index}
                    icon={elm.icon}
                    content={elm.content}
                />
            );
        })
    )
}

const Button = ({handleClick, isSelected, elementIndex, icon, content }) => {
    return(
        <button className={`buttonList ${isSelected ? "isSelected" : "not"}`} onClick={() => handleClick(elementIndex)}>
            <img src={icon} alt="" /> 
            <span> {content} </span> 
        </button>
    );
}

const ITEM1 = [
    {  content: '서울'  },
    {  content: '부산'  },
    {  content: '대구'  },
    {  content: '인천'  },
    {  content: '광주'  },
    {  content: '대전'  },
    {  content: '울산'  },
    {  content: '세종'  },
    {  content: '경기'  },
    {  content: '강원'  },
    {  content: '충북'  },
    {  content: '충남'  },
    {  content: '전북'  },
    {  content: '전남'  },
    {  content: '경북'  },
    {  content: '경남'  },
    {  content: '제주'  }
];

const ITEM2 = [
    { icon: date1 , content: '당일여행' },
    { icon: date2 , content: '1박2일'  },
    { icon: date3 , content: '2박3일'  },
];

const ITEM3 = [
    { icon : "https://source.unsplash.com/featured/?mountain", content : '산' },
    { icon : "https://source.unsplash.com/featured/?beach", content : '바다' },
    { icon : "https://source.unsplash.com/featured/?indoor", content : '실내여행지' },
    { icon : "https://source.unsplash.com/featured/?cafe", content : "카페" },
    { icon : "https://source.unsplash.com/featured/?adventure", content : "액티비티" },
    { icon : "https://source.unsplash.com/featured/?theme park", content : "테마파크" },
    { icon : "https://source.unsplash.com/featured/?museum", content : "문화 | 역사" },
    { icon : "https://source.unsplash.com/featured/?trandition", content : "전통시장" },
    { icon : "https://source.unsplash.com/featured/?festival", content : "축제" }
];

export default ChoosePreference;