import React from "react";
import styled from "styled-components";
import './CP.css';

{/* 아직 수정중입니다... 24.04.12.금 :: 화면은 잘 나오나 완전한 리액트로 거듭나지 못함. 컴포넌트화 덜 함.*/}

const Wrapper= styled.div`
    margin: 0;
    padding: 0;
    font-family: 'JalnanGothic';
    background: #f3f4f6; /* 미미한 회색 */
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
                    <button>서울</button>
                    <button>부산</button>
                    <button>대구</button>
                    <button>인천</button>
                    <button>광주</button>
                    <button>대전</button>
                    <button>울산</button>
                    <button>세종</button>
                    <button>경기</button>
                    <button>강원</button>
                    <button>충북</button>
                    <button>충남</button>
                    <button>전북</button>
                    <button>전남</button>
                    <button>경북</button>
                    <button>경남</button>
                    <button>제주</button>
                </div>
            </div>

            <div className="content"> {/*item 2*/}
                <div className="content-top">
                    <h2>2박 3일은 2개 지역 선택 가능</h2>
                    <div className="content-step">
                        <div className="step-indicator">1</div>
                        <div className="step-indicator active">2</div>
                        <div className="step-indicator">3</div>
                    </div>
                </div>
                <p><em>여행 기간을</em><br/>선택해 주세요.</p>
                <div className="select_priod">
                    <button><img src={require("./img/date_1.png")} alt=""/><span>당일여행</span></button>
                    <button><img src={require("./img/date_2.png")} alt=""/><span>1박2일</span></button>
                    <button><img src={require("./img/date_3.png")} alt=""/><span>2박3일</span></button>
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
                    <button>
                        <img src="https://source.unsplash.com/featured/?mountain" alt="산"/>
                        <span>산</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?beach" alt="바다"/>
                        <span>바다</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?indoor" alt="실내여행지"/>
                        <span>실내여행지</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?cafe" alt="카페"/>
                        <span>카페</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?adventure" alt="액티비티"/>
                        <span>액티비티</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?theme park" alt="테마파크"/>
                        <span>테마파크</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?museum" alt="문화|역사"/>
                        <span>문화|역사</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?trandition" alt="전통시장"/>
                        <span>전통시장</span>
                    </button>
                    <button>
                        <img src="https://source.unsplash.com/featured/?festival" alt="축제"/>
                        <span>축제</span>
                    </button>
                </div>
                </div>
            <button id="nextbtn">다음</button>
            </Container>
        </Wrapper>
    );
}

export default ChoosePreference;