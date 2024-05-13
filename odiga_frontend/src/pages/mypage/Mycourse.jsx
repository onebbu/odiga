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

    const handleSubmit = async (courseKey) => {
        try {
            const response = await axios.post(`/delete`, {courseKey});
            window.location.reload();
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return (
        <div style={{width: "50rem", margin: "auto"}}>
            <Title>{loginInfo.nickname}님의 여행코스</Title>
            <hr style={{marginBottom: "4rem"}}/>
            {courseInfo ? (
                <>
                    <Accordion>
                        {Object.keys(courseInfo).map((courseKey, index) => {
                                console.log(courseInfo)

                                return (
                                    <Accordion.Item key={courseKey} eventKey={index}>
                                        <Accordion.Header style={{width: "49rem"}}>
                                            <div style={{width: "40rem", justifyContent: "space-between", display: "flex"}}>
                                            <span>{courseInfo[courseKey].title}으로 <Link
                                                to={`/result-list/${loginInfo.nickname}/${courseKey}`}> 이동하기</Link></span>
                                                <span><Link onClick={() => handleSubmit(courseKey)}>삭제하기</Link></span>
                                            </div>
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
                </>
            ) : (
                <>
                    <Message>코스 정보가 없습니다.</Message>
                </>
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

const Message = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;
