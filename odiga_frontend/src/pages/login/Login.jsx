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
import * as Yup from 'yup';

// localhost:3000/login

const defaultTheme = createTheme();

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('유효하지 않은 이메일 주소입니다.').required('필수 항목입니다.'),
    password: Yup.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').required('필수 항목입니다.'),
});

const SignInForm = ({ handleSubmit, formData, handleChange, isEmailValid, isPasswordValid, isFormValid, isSubmitted }) => (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            error={formData.email && !isEmailValid(formData.email)}
            helperText={formData.email && !isEmailValid(formData.email) ? "올바른 이메일 형식으로 입력하세요" : ""}
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
            error={formData.password && !isPasswordValid(formData.password)}
            helperText={formData.password && !isPasswordValid(formData.password) ? "비밀번호는 8자 이상으로 입력하세요" : ""}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitted || !isFormValid}
            sx={{ mt: 3, mb: 2 }}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item>
                <Link href="http://localhost:3000/sign-up" variant="body2">
                    계정이 없으신가요? 회원가입하기
                </Link>
            </Grid>
        </Grid>
    </Box>
);

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        SignInSchema.isValid({ ...formData, [name]: value }).then(valid => setIsFormValid(valid));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitted) {
            return;
        }

        setIsSubmitted(true);

        try {
            const response = await axios.post('/auth/login', formData);
            const token = response.data;

            if (token === "이메일 또는 비밀번호가 일치하지 않습니다!") {
                alert(token);
                window.location.href = "/login";
            } else {
                localStorage.setItem('token', token);
                navigate("/");
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            setIsSubmitted(false);
        }
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    return (
        <body>
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <SignInForm
                            handleSubmit={handleSubmit}
                            formData={formData}
                            handleChange={handleChange}
                            isEmailValid={isEmailValid}
                            isPasswordValid={isPasswordValid}
                            isFormValid={isFormValid}
                            isSubmitted={isSubmitted}
                        />
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
        <div className="oauth">
            <GoogleLogin />
            <KakaoLoginButton />
            <NaverLoginButton />
        </div>
        </body>
    );
}