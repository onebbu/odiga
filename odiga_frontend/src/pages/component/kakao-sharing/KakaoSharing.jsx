import { useEffect } from "react";
import {useParams} from "react-router-dom";
import kakao from "../../../assets/images/kakao-login-icon.png";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

const KakaoSharing = (schedule) =>{

    const { id } = useParams();

    const jsKey = process.env.REACT_APP_KAKAO_SHARE_JS_API_KEY

    // 재랜더링시에 실행되게 해준다.
    useEffect(()=>{
        // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        Kakao.init(jsKey);
        // 잘 적용되면 true 를 뱉는다.
        console.log(Kakao.isInitialized());
    },[]);

    const shareKakao = async () => {
        const regularId = id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|"']/g, "");
        const regularSche = schedule.schedule.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|"']/g, "").split(" ").join("");

        const first = regularSche.slice(0, 6);
        const second = regularSche.slice(6);
        const sche = parseInt(first) + parseInt(second) + 12345

        const pw = regularId + sche;


        try {
            // // 서버로 UUID 전송
            const response = await axios.post('/sendPw', { pw, id });
            console.log(response.data); // 성공 시 응답 확인

            // Kakao로 공유하기
            Kakao.Share.sendDefault({
                objectType: 'text',
                text:
                    '당신의 여행 일정은?? ' + schedule.schedule +"\n" +
                    "여행 비밀번호는 " + pw + "입니다.",
                link: {
                    mobileWebUrl: 'http://localhost:3000/result-list/' + id,
                    webUrl: 'http://localhost:3000/result-list/' + id,
                },
                buttons: [
                    {
                        title: '여행 일정 보러 가기',
                        link: {
                            webUrl: 'http://localhost:3000/result-list/' + id,
                        },
                    },
                ],
            });
        } catch (error) {
            console.error('Error saving coursePw:', error);
        }
    };

    return(
        <>
            <button
                style={{
                    border: "none",
                    backgroundColor: "transparent",
            }}
                onClick={() => {
                    shareKakao()
                }} >
                <img src={kakao}
                style={{
                width: "4rem"}}
                />
                </button>
        </>
    )
}

export default KakaoSharing;
