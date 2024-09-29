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
import "./Login.css";
import {useContext, useEffect, useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import OauthLoginButton from "../component/Oauth/OauthLogin.jsx";
import {LoginInfoContext} from "./LoginInfoProvider";
import {styled} from '@mui/material/styles';
import {useLocation} from 'react-router-dom';

// localhost:3000/login

const defaultTheme = createTheme();

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('유효하지 않은 이메일 주소입니다.').required('필수 항목입니다.'),
    password: Yup.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').required('필수 항목입니다.'),
});

export default function Login() {
    const loginInfo = useContext(LoginInfoContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({}); // 에러 상태 추가

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
            if (Object.keys(loginInfo).length != 0) {
                alert("이미 로그인된 상태입니다.");
                navigate('/');
            }

    }, [loginInfo, location.pathname]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await LoginSchema.validate(formData, {abortEarly: false}); // 유효성 검사 수행
            // 유효성 검사 통과 후에만 axios post 요청을 보냄
            const response = await axios.post('/api/auth/login', formData);
            const result = response.data;

            if (result === "EMAIL_PASSWORD_NOT_MATCH") {
                alert("이메일 또는 비밀번호가 일치하지 않습니다!");
            } else {
                sessionStorage.setItem('token', result);
                setTimeout(() => {
                    sessionStorage.removeItem('token');
                }, 60 * 60 * 1000); // 1시간 후
                // 아니면 이전 페이지로 이동
                navigate(location.state?.from || '/');
                window.location.reload();
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors); // 유효성 검사 실패 시 에러 상태 업데이트
            } else {
                console.error('로그인 실패:', error);
            }
        }
    };


    return (
        <div className="login-wrap">
            <div>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',

                            }}
                        >
                            <div
                                style={{
                                    marginTop: "7rem"
                                }}
                            ></div>
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5"
                                        sx={{
                                            fontFamily: 'JalnanGothic',
                                            fontSize: '25px'
                                        }}
                            >
                                로그인
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="이메일을 입력하세요"
                                            name="email"
                                            autoComplete="email"
                                            onChange={handleChange}
                                            error={Boolean(errors.email)} // 에러가 있으면 true, 없으면 false
                                            helperText={errors.email ? errors.email : ""} // 에러 메시지 표시
                                            inputProps={{style: {fontFamily: 'GmarketSansMedium'}}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="비밀번호를 입력하세요"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            onChange={handleChange}
                                            error={Boolean(errors.password)} // 에러가 있으면 true, 없으면 false
                                            helperText={errors.password ? errors.password : ""} // 에러 메시지 표시
                                        />
                                    </Grid>
                                </Grid>
                                <LoginButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    로그인
                                </LoginButton>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <LoginLink href={`${process.env.REACT_APP_SERVER_ADDRESS}/sign-up`} variant="body2">
                                            계정이 없으신가요? 회원가입하기
                                        </LoginLink>
                                        {/*<LoginLink href="#" variant="body2">*/}
                                        {/*    비밀번호를 잊으셨나요? 비밀번호찾기*/}
                                        {/*</LoginLink>*/}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
            <div className="oauth"
                 style={{
                     marginBottom: "7rem"
                 }}
            >
                <OauthLoginButton/>
            </div>
        </div>
    );
}

const LoginButton = styled(Button)`
  font-family: 'JalnanGothic'; // 원하는 글꼴을 여기에 지정합니다.
  font-size: 18px;
`;

const LoginLink = styled(Link)`
  display: block;
  font-family: 'GmarketSansMedium'; // 원하는 글꼴을 여기에 지정합니다.
  font-size: 15px;
`;