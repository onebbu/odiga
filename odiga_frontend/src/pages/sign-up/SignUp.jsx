import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';

// localhost:3000/sign-up

const defaultTheme = createTheme();

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('유효하지 않은 이메일 주소입니다.').required('필수 항목입니다.'),
    nickname: Yup.string().max(8, '닉네임은 최대 8자까지 허용됩니다.').required('필수 항목입니다.'),
    password: Yup.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').max(20, '비밀번호는 최대 20자까지 허용됩니다.').required('필수 항목입니다.'),
    passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], '비밀번호가 일치해야 합니다.').required('필수 항목입니다.')
});

export default function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        password: '',
        passwordCheck: ''
    });
    const [errors, setErrors] = useState({}); // 에러 상태 추가

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 동작 중지
        console.log(formData);

        try {
            await SignUpSchema.validate(formData, { abortEarly: false }); // 유효성 검사 수행
            // 유효성 검사 통과 후에만 axios post 요청을 보냄
            const response = await axios.post('/auth/join', formData);
            const result = response.data;

            console.log("result", result);

            if (result === "EMAIL_ALREADY_EXIST") {
                alert("이미 이메일이 존재합니다.");
            } else if(result === "NICKNAME_ALREADY_EXIST") {
                alert("이미 닉네임이 존재합니다.");
            } else if(result === "SIGN_UP_SUCCESS") {
                navigate('/login');
                alert("회원가입이 성공했습니다.");
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors); // 유효성 검사 실패 시 에러 상태 업데이트
            } else {
                console.error('회원가입 실패:', error);
            }
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
                            회원가입
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="nickname"
                                        label="닉네임을 입력하세요"
                                        name="nickname"
                                        autoComplete="nickname"
                                        type="text"
                                        onChange={handleChange}
                                        error={Boolean(errors.nickname)} // 에러가 있으면 true, 없으면 false
                                        helperText={errors.nickname ? errors.nickname : ""} // 에러 메시지 표시
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
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="passwordCheck"
                                        label="비밀번호를 다시 한번 입력하세요"
                                        type="password"
                                        id="passwordCheck"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        error={Boolean(errors.passwordCheck)} // 에러가 있으면 true, 없으면 false
                                        helperText={errors.passwordCheck ? errors.passwordCheck : ""} // 에러 메시지 표시
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                회원가입
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="http://localhost:3000/login" variant="body2">
                                        이미 아이디가 있으신가요? 로그인하기
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
        </body>
    );
}