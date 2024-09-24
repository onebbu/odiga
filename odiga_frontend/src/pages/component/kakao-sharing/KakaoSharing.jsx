import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import kakao from "../../../assets/images/icon/kakao-share-icon.png";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import * as React from "react";
import * as Yup from "yup";

// kakao 기능 동작을 위해 넣어준다.
const {Kakao} = window;

const KakaoShareSchema = Yup.object().shape({
    sharePw: Yup.string()
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
        .max(20, '비밀번호는 최대 20자까지 허용됩니다.')
        .required('필수 항목입니다.')
});

const KakaoSharing = () => {
    let {nickname, courseNo} = useParams();

    const jsKey = process.env.REACT_APP_KAKAO_SHARE_JS_API_KEY

    const [sharePw, setSharePw] = useState('');
    const [errors, setErrors] = useState({});

    const handleSharePwChange = (event) => {
        setSharePw(event.target.value); // TextField 값이 변경될 때마다 상태 업데이트
    };

    useEffect(() => {
        // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        Kakao.init(jsKey);
        // 잘 적용되면 true 를 뱉는다.
        console.log(Kakao.isInitialized());
    }, []);

    const shareKakao = async () => {
        try {
            await KakaoShareSchema.validate({sharePw}, {abortEarly: false}); // 유효성 검사 수행
            const response = await axios.post('/sendPw', {pw: sharePw, courseNo});
            console.log(response.data); // 성공 시 응답 확인

             // Kakao로 공유하기
            Kakao.Share.sendDefault({
                objectType: 'text',
                text: `여행 비밀번호는 ${sharePw}입니다. \n여행 일정 보러가기 버튼을 누른 후 비밀번호를 입력해주세요!`,
                link: {
                    mobileWebUrl: `http://13.125.150.232/api/result-list/${nickname}/${courseNo}`,
                    webUrl: `http://13.125.150.232/api/result-list/${nickname}/${courseNo}`,
                },
                buttons: [
                    {
                        title: '여행 일정 보러 가기',
                        link: {
                            webUrl: `http://13.125.150.232/api/result-list/${nickname}/${courseNo}`,
                        },
                    },
                ],
            });
            setErrors({}); // 유효성 검사 통과 시 에러를 초기화하여 헬퍼 텍스트를 숨김
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // ValidationError가 발생하면 상태를 업데이트하여 헬퍼 텍스트 설정
                const yupErrors = {};
                error.inner.forEach(err => {
                    yupErrors[err.path] = err.message;
                });
                setErrors(yupErrors);
            } else {
                console.error('Error saving coursePw:', error);
            }
        }
    };

    return (
        <div>
            <TextField
                required
                fullWidth
                id="sharePw"
                label="여행 공유 비밀번호를 입력해주세요"
                name="sharePw"
                autoComplete="sharePw"
                value={sharePw}
                onChange={handleSharePwChange}
                style={{fontFamily: 'GmarketSansMedium'}}
                error={Boolean(errors.sharePw)}
                helperText={errors.sharePw ? errors.sharePw : ""}
            />
            <div style={{marginTop: "1rem"}}></div>
            <div
                style={{
                    display: "flex",
                    backgroundColor: "#fddc3f",
                    width: "16rem",
                    height: "3.5rem",
                    borderRadius: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    cursor: "pointer", // 마우스 커서를 포인터로 변경하여 클릭 가능하도록 설정
                }}
                onClick={shareKakao} // 클릭 이벤트를 바로 연결
            >
                <img
                    src={kakao}
                    style={{
                        width: "2rem",
                        marginRight: "0.5rem", // 아이콘과 텍스트 사이의 간격 조정
                    }}
                />
                <p
                    style={{
                        margin: "0", // 기본 마진 제거
                        fontFamily: "GmarketSansMedium",
                        fontSize: "15px"
                    }}
                >카카오톡으로 공유하기</p>
            </div>
        </div>
    )
}

export default KakaoSharing;