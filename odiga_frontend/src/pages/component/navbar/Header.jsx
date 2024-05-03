import React from 'react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import './Header.css';

function Header() {
    return (
        <header className="app-header">
        <div className="header-logo"></div>
        <nav className="header-nav">
          <ul className="NavMenu">
            <li><a href="/">홈</a></li>
            <li><a href="/create-trip">내 여행코스 생성</a></li>
            <li><a href="/view-trip">내 여행코스 조회</a></li>
            <li><a href="/explore">여행지 조회</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className="search-box">
            <input 
              type="text"
              className="search-input"
              placeholder="어디로, 어떤 여행을 떠날 예정인가요?"          
            />
            <button className="search-button">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
          </div>
          <div className="sub-menu-line"></div>
          <div className="login-box">
            <a href="/login" className="login-link"><FontAwesomeIcon icon={faUser}/></a>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;