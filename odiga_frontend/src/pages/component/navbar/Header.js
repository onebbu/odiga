import React, {useState, useEffect, useContext} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Logout from '../../login/Logout';
import {LoginInfoContext} from "../../login/LoginInfoProvider";

function Header() {
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();
    const loginInfo = useContext(LoginInfoContext);
    console.log("로그인 정보",loginInfo)

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            document.querySelector('.app-header').style.top = '-100px'; // 헤더가 위로 사라짐
        } else {
            document.querySelector('.app-header').style.top = '0'; // 헤더가 다시 나타남
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    axios.interceptors.request.use(function (config) {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    const handleNavigation = (path) => {
        if (path === '/preference' && !sessionStorage.getItem('token')) {
            const isConfirmed = window.confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까?');
            if (isConfirmed) {
                navigate('/login');
            }
        } else {
            navigate(path);
        }
    };


    return (
        <header className="app-header">
            <div className="header-logo" onClick={() => navigate('/')}>
            </div>
            <nav className="header-nav">
                <ul className="NavMenu">
                    <li><a onClick={() => handleNavigation('/preference')}>여행코스 생성</a></li>
                    <li><a href="/coursereview">여행코스 검색</a></li>
                    <li><a href="/search-location">여행지 검색</a></li>
                </ul>
            </nav>
            <div className="header-actions">
                <div className="hello-box">
                    {loginInfo &&
                        <p
                            style={{marginRight: "3px"}}
                        >{loginInfo.nickname}님</p>
                    }
                    <p>어디로, 어떤 여행을 떠날 예정인가요?</p>
                </div>
                <div className="sub-menu-line"></div>
                <div className="login-box">
                    {sessionStorage.getItem('token') ? (
                        <>
                            <Logout />
                            <button className="login-link" onClick={() => navigate('/my-page')}>
                                마이페이지
                            </button>
                        </>
                    ) : (
                        <button className="login-link" onClick={() => navigate('/login')}>
                            로그인
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;