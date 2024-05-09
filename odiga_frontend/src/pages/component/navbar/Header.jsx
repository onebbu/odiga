import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faBurger } from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //검색 관련 기능 
  const handleSearch = (event) => {
    event.preventDefault();  
    navigate(`/SearchPage?query=${encodeURIComponent(searchQuery)}`);  // 검색 쿼리와 함께 검색 페이지로 이동
  };

        //로그인 관련 기능 
        const isUserLoggedIn = () => {
           return Boolean(localStorage.getItem('token'));
         };

        axios.interceptors.request.use(function (config) {
          const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
         return config;
        }, function (error) {
         return Promise.reject(error);   
        });

          //로그인 상태 확인
          useEffect(() => {
            const token = localStorage.getItem('token');
             setIsLoggedIn(!!token); 
           }, []);

      const handleLoginClick = () => {
       if (isLoggedIn) {
        navigate('/my-page/*'); 
      } else {
        navigate('/login'); 
      }
      };


    return (
        <header className="app-header">
        <div className="header-logo"></div>
                <nav className="header-nav">
                    <ul className="NavMenu">
                        <li><a href="/">홈</a></li>
                        <li><a href="/preference"> 여행코스 생성</a></li>
                        <li><a href="/"> 여행코스 조회</a></li>
                        <li><a href="/">여행지 조회</a></li>
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
            <button className="login-link" onClick={handleLoginClick}>
                <FontAwesomeIcon icon={faUser} style={{ color: isLoggedIn ? 'green' : 'black' }}/>
            </button>
          </div>
          {/* <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBurger} />
            </button> */}
        </div>
      </header>
    );
  }
  
  export default Header;