import React, {useEffect, useState} from "react";
import styled from "styled-components";
import './CP.css';
import date1 from './img/date_1.png'; import date2 from './img/date_2.png'; import date3 from './img/date_3.png';
import { useNavigate } from "react-router-dom";

// localhost:3000/preference
const Wrapper= styled.div`
    margin: 0;
    padding: 0;
    padding-top : 110px;
    font-family: 'JalnanGothic';
    background: #f3f4f6; /* 미미한 회색 */
    overflow: auto;
`;
const Container=styled.div`
    max-width: 56rem; margin-left: auto; margin-right: auto; padding: 6px;
`;

function ChoosePreference() {

    const navigate = useNavigate();
    const [selectedValues, setSelectedValues] = useState({
        region : null,
        duration : null,
        theme : []
    });
    const [filteredITEM3, setFilteredITEM3] = useState(ITEM3);

    // 다음 페이지로 선택된 값들을 전달하는 함수
    const goToNextPage = () => {

        // 규리님 그 sns로그인하면 쿠키에 값이있어서 다음페이지로 못넘어가서 일단 주석처리했습니다. 추후 오류나 문제생길시 수정부탁드립니다.
        // if (!sessionStorage.getItem('token')) {
        //     alert("로그인이 필요한 서비스 입니다. 로그인 페이지로 이동합니다.");
        //     navigate('/login');
        //     return;
        // }

        // 모든 영역에서 선택된 값들을 검사하여 누락된 값이 있는지 확인
            if (selectedValues.region === null || selectedValues.duration === null || selectedValues.theme.length < 2) {
                // 누락된 값이 있으면 사용자에게 알림을 표시
                alert('모든 영역에서 선택이 완료되지 않았습니다. 선택을 완료해주세요.');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
            } else {
                // 모든 값이 선택되었으면 다음 페이지 경로와 함께 선택된 값들을 전달합니다.
                navigate(`/place`, { state: selectedValues });
            }
    };
    // region 선택 시 selectedValues 업데이트
    const handleRegionSelect = (region) => {
        console.log(region);
        setSelectedValues(prevState => ({
            ...prevState,
            region: region
        }));
    };

    // duration 선택 시 selectedValues 업데이트
    const handleDurationSelect = (duration) => {
        console.log(duration);
        setSelectedValues(prevState => ({
            ...prevState,
            duration: duration
        }));
    };

    // theme 선택 시 selectedValues 업데이트
    const handleThemeSelect = (theme) => {
        console.log(theme)
        const updatedTheme = [...selectedValues.theme];
        const themeIndex = updatedTheme.indexOf(theme);
        if (themeIndex === -1) {
            updatedTheme.push(theme);
        } else {
            updatedTheme.splice(themeIndex, 1);
        }
        setSelectedValues(prevState => ({
            ...prevState,
            theme: updatedTheme
        }));
    };

    useEffect(() => {
        const exclusions = regionExclusions[selectedValues.region] || [];
        const newFilteredITEM3 = ITEM3.filter(item => !exclusions.includes(item.content));
        setFilteredITEM3(newFilteredITEM3);
    }, [selectedValues.region]);
    
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
                    <ButtonList List={ITEM1} OneCheck={true} onSelect={handleRegionSelect}/>
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
                    <ButtonList List={ITEM2} OneCheck={true} onSelect={handleDurationSelect}/>
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
                    <ButtonList List={filteredITEM3} OneCheck={false} onSelect={handleThemeSelect} />
                </div>
            </div>
            <button id="nextbtn" onClick={goToNextPage}>다음</button>
            </Container>
        </Wrapper>
    );
}
function ButtonList ({List, OneCheck, onSelect}) {
    const [isSelected, setIsSelected]= useState([false]);
    const handleClick = (idx) => {
        const newArr = Array(List.length).fill(false);
        newArr[idx] = true;
        setIsSelected(newArr);
        onSelect(List[idx].code);
    };
    const handleClick2 = (idx) => {
        let cnt = 0;
        let copy = [...isSelected];
        copy[idx] = !isSelected[idx];
        copy.forEach(el => { if (el) cnt += 1; });
        if (cnt > 4) {
            alert('이미 4개를 선택하셨습니다. 다른 테마를 선택하고 싶으시면 선택한 여행테마를 해제 후, 선택해주세요');
            copy[idx] = isSelected[idx];
        }
        setIsSelected(copy);
        onSelect(List[idx].content);
    };
    return (
        List.map((elm, index) => {
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

const regionExclusions = {
    '1' : ['바다'], //서울
    '3' : ['바다'], //대전
    '4' : ['바다'], //대구
    '5' : ['바다'], //광주
    '8' : ['바다']  //세종
    // 다른 지역과 제외할 테마를 추가하세요
};

const ITEM1 = [
    {  content: '서울' , code:'1' },
    {  content: '인천' , code:'2' },
    {  content: '대전' , code:'3' },
    {  content: '대구' , code:'4' },
    {  content: '광주' , code:'5' },
    {  content: '부산' , code:'6' },
    {  content: '울산' , code:'7' },
    {  content: '세종' , code:'8' },
    {  content: '경기' , code:'31' },
    {  content: '강원' , code:'32' },
    {  content: '충북' , code:'33' },
    {  content: '충남' , code:'34' },
    {  content: '경북' , code:'35' },
    {  content: '경남' , code:'36' },
    {  content: '전북' , code:'37' },
    {  content: '전남' , code:'38' },
    {  content: '제주' , code:'39' }
];

const ITEM2 = [
    { icon: date1 , content: '당일여행', code: '당일여행' },
    { icon: date2 , content: '1박2일', code: '1박2일'  },
    { icon: date3 , content: '2박3일', code: '2박3일'  },
];
const ACCESS_KEY = 'iUJAIhZJ0Pq3YgEIgxl8kZ1JR2CBVrVxN0d5lZhkJh8';
const ITEM3 = [
    { icon : "https://source.unsplash.com/featured/?mountain", content : '산' },
    { icon : "https://source.unsplash.com/featured/?beach", content : '바다' },
    { icon : "https://source.unsplash.com/featured/?nature", content : "자연" },
    { icon : "https://source.unsplash.com/featured/?indoor", content : "실내여행지" },
    { icon : "https://source.unsplash.com/featured/?cafe", content : "카페" },
    { icon : "https://source.unsplash.com/featured/?restaurant", content : "식당" },
    { icon : "https://source.unsplash.com/featured/?shopping", content : "쇼핑" },
    { icon : "https://source.unsplash.com/featured/?adventure", content : "액티비티" },
    { icon : "https://source.unsplash.com/featured/?theme park", content : "테마파크" },
    { icon : "https://source.unsplash.com/featured/?museum", content : "문화역사" },
    { icon : "https://source.unsplash.com/featured/?trandition", content : "전통시장" },
    { icon : "https://source.unsplash.com/featured/?festival", content : "축제" }
];

export default ChoosePreference;