import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Logout from '../../login/Logout';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

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

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/SearchPage?query=${encodeURIComponent(searchQuery)}`);
    };

    axios.interceptors.request.use(function (config) {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    const handleLoginClick = () => {
        if (sessionStorage.getItem('token')) {
            navigate('/my-page');
        } else {
            navigate('/login');
        }
    };


    return (
        <header className="app-header">
            <div className="header-logo" onClick={() => navigate('/')}>
            </div>
            <nav className="header-nav">
                <ul className="NavMenu">
                    <li><a href="/">홈</a></li>
                    <li><a href="/preference">여행코스 생성</a></li>
                    <li><a href="/">여행코스 검색</a></li>
                    <li><a href="/search-location">여행지 검색</a></li>
                </ul>
            </nav>
            <div className="header-actions">
                <div className="search-box">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="어디로, 어떤 여행을 떠날 예정인가요?"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button className="search-button" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </form>
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
                        <button className="login-link" onClick={handleLoginClick}>
                            로그인
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;