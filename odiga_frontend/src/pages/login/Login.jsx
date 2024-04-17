import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import KakaoLoginButton from "../component/Oauth/kakao/KakaoLogin";
import "./Login.css";
import NaverLoginButton from "../component/Oauth/naver/NaverLoginButton";
import GoogleLogin from "../component/Oauth/google/GoogleLogin";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// localhost:3000/login

/**
 * 해야할 일
 * UI 수정 및 이메일 형식 입력 가능하게
 * 아이디, 비밀번호가 틀릴경우 틀렸다고 alert 메세지
 */

const defaultTheme = createTheme();

export default function SignIn() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false); // 한 번만 submit 하도록 상태 추가
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 이미 제출된 경우 다시 제출하지 않음
        if (isSubmitted) {
            return;
        }

        setIsSubmitted(true); // 제출 상태로 설정

        try {
            const response = await axios.post('/auth/login', formData);
            const token = response.data; // 서버에서 전달받은 토큰

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', token);

            // 로그인 성공 후 리다이렉트할 경로
            navigate("/");
        } catch (error) {
            console.error('로그인 실패:', error);
            setIsSubmitted(false); // 제출 상태 초기화
        }
    };

    return (
        <body>
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="이메일을 입력하세요"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="비밀번호를 입력하세요"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isSubmitted}
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                {/*<Grid item xs>*/}
                                {/*    <Link href="#" variant="body2">*/}
                                {/*        Forgot password?*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                                <Grid item>
                                    <Link href="http://localhost:3000/sign-up" variant="body2">
                                        계정이 없으신가요? 회원가입하기
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
                </Container>
            </ThemeProvider>
        </div>
        {/*kakao, google, naver login api & button*/}
        <div className="oauth">
            <GoogleLogin/>
            <KakaoLoginButton/>
            <NaverLoginButton/>
        </div>
        </body>
    );
}