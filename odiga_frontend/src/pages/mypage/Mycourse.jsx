import React, {useContext, useEffect, useState} from "react"; // React를 불러옵니다.
import styled from "styled-components";
import {LoginInfoContext} from "../login/LoginInfoProvider";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Badge from "react-bootstrap/Badge";

function Mycourse() {

    //   코스 리스트 axios로 쭉 가져오기
    //   정리해서 리턴에 뿌리기
    //   resultlist도 조회 경로 변경(url 파라미터에 닉네임 추가)
    const loginInfo = useContext(LoginInfoContext);
    const [courseInfo, setCourseInfo] = useState();

    useEffect(() => {
        if (loginInfo) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/mypage/mycourse/` + loginInfo.nickname);
                    setCourseInfo(response.data);
                } catch (error) {
                    console.error('코스 가져오기 실패:', error);
                }
            };

            fetchData(); // 함수 호출
        }
    }, [loginInfo]); // loginInfo가 변경될 때마다 실행


    console.log(courseInfo);

    return (
        <div style={{width: "50rem", margin: "auto"}}>
            <Title>{loginInfo.nickname}님의 여행코스</Title>
            <hr style={{marginBottom: "4rem"}}/>
            {courseInfo && (
                <Accordion>
                    {Object.keys(courseInfo).map((courseKey, index) => {
                        console.log(courseInfo)

                            return (
                                <Accordion.Item key={courseKey} eventKey={index}>
                                    <Accordion.Header>
                                        <span>{courseInfo[courseKey].title}으로 <Link to={`/result-list/${courseKey}`}> 이동하기</Link></span>
                                    </Accordion.Header>
                                    <Accordion.Body>

                                        <h5>여행 경로</h5>
                                        <span>{courseInfo[courseKey].content}</span>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        }
                    )}
                </Accordion>
            )}
        </div>
    );
}

export default Mycourse;

const Title = styled.h3`
  margin-top: 4rem;
  text-align: center;
  width: 100%;
`;

