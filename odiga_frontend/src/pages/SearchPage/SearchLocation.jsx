import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from './SideBar';
import 'react-tabs/style/react-tabs.css';
import './SearchPage.css';
import southKorea from "../../assets/images/south-korea.svg";
import mapPath from "./MapPath.json";
import {Link} from "react-router-dom";
import styled from "styled-components";


function SearchLocation() {
    const [searchText, setSearchText] = useState('');
    const [recentSearches, setRecentSearches] = useState(() => JSON.parse(localStorage.getItem('recentSearches')) || []);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [resultCount, setResultCount] = useState(0);
    const [catList, setCatList] = useState([]);
    const [catCode, setCatCode] = useState(null);
    const [order, setOrder] = useState('title');
    const [areaCode, setAreaCode] = useState(0);
    const [mapData, setMapData] = useState([]);


    const data = [
        {locale: "서울", localeNum: 1, count: 0},
        {locale: "인천", localeNum: 2, count: 0},
        {locale: "대전", localeNum: 3, count: 0},
        {locale: "대구", localeNum: 4, count: 0},
        {locale: "광주", localeNum: 5, count: 0},
        {locale: "부산", localeNum: 6, count: 0},
        {locale: "울산", localeNum: 7, count: 0},
        {locale: "세종", localeNum: 8, count: 0},
        {locale: "경기도", localeNum: 31, count: 0},
        {locale: "강원도", localeNum: 32, count: 0},
        {locale: "충청북도", localeNum: 33, count: 0},
        {locale: "충청남도", localeNum: 34, count: 0},
        {locale: "경상북도", localeNum: 35, count: 0},
        {locale: "경상남도", localeNum: 36, count: 0},
        {locale: "전라북도", localeNum: 37, count: 0},
        {locale: "전라남도", localeNum: 38, count: 0},
        {locale: "제주도", localeNum: 39, count: 0},
    ];


    useEffect(() => {
        fetchCategories();
        fetchAreaCounts();
    }, [catCode, areaCode, searchText]);

    useEffect(() => {
        fetchSearchResults(currentPage);
    }, [currentPage, catCode, areaCode, order]);

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCatkrSelection = (selectedCatcode) => {
        setCatCode(selectedCatcode); // Now triggers search in useEffect
    };

    const handleAreaCode = (selectedAreaCode) => {
        setAreaCode(selectedAreaCode);
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/categories');
            setCatList(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSearchResults = async (page) => {
        try {
            const response = await axios.get('/search', {
                params: {
                    page: page,
                    text: searchText,
                    areacode: areaCode,
                    order: order,
                    catcode: catCode
                }
            });
            const {searchList, resultCount} = response.data;
            setSearchResults(searchList || []);
            setTotalPages(Math.floor(resultCount / 10) || 0);
            setResultCount(resultCount || 0);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
            setTotalPages(0);
            setResultCount(0);
        }
    };

    const fetchAreaCounts = async () => {
        try {
            const response = await axios.get('/count-areas', {
                params: {
                    text: searchText,
                    catcode: catCode
                }
            });
            const areaCounts = response.data;

            // data 배열을 업데이트
            const updatedData = data.map(item => {
                const localeNum = item.localeNum.toString();
                if (areaCounts.hasOwnProperty(localeNum)) {
                    return {...item, count: areaCounts[localeNum]};
                } else {
                    return item;
                }
            });

            // 업데이트된 데이터를 mapData에 설정
            setMapData(updatedData);

        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
            setTotalPages(0);
            setResultCount(0);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchSearchResults(1);
        updateRecentSearches(searchText);
    };

    const updateRecentSearches = (searchTerm) => {
        const updatedSearches = [searchTerm, ...recentSearches.filter(term => term !== searchTerm)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const renderTravlePageNumbers = () => {
        const pageNumbers = [];
        const totalPagesToShow = Math.ceil(resultCount / 10);
        const groupIndex = Math.floor((currentPage - 1) / 5);
        const maxPage = Math.min(totalPagesToShow, (groupIndex + 1) * 5);
        const minPage = groupIndex * 5 + 1;

        for (let i = minPage; i <= maxPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };


    const handleOrderChange = (newOrder) => {
        if (order !== newOrder) {
            setOrder(newOrder);
            setCurrentPage(1); // Set page to 1 when order changes
        }
    };

    // 클릭된 도시를 추적하기 위한 상태
    const [tooltip, setTooltip] = useState({show: false, x: 0, y: 0, cityName: "", count: 0});

    const handleMouseOver = (event, cityName, count) => {
        setTooltip({show: true, x: event.clientX, y: event.clientY, cityName, count});
    };

    const handleMouseOut = () => {
        setTooltip({...tooltip, show: false});
    };

    const setColorByCount = (count) => {
        if (count === 0) return "#F1F1F1";
        if (count > 5000) return "#79D3C4";
        if (count > 3000) return "#43cdb6";
        if (count > 1000) return "#61CDBB";
        if (count > 200) return "#91D9CD";
        if (count > 100) return "#A9DFD6";
        if (count > 50) return "#C1E5DF";
        if (count > 5) return "#D9EBE8";
        return "#ebfffd"; // 기본값
    };


    return (
        <div className="search-container">
            <div className="search-map">
                <div>
                    <svg xmlns={southKorea} viewBox="0 0 524 631">
                        {/* 각 도시 경로에 툴팁과 이벤트 핸들러 추가 */}
                        {mapData && mapData.map((city) => (
                            <path
                                key={city.localeNum}
                                id={city.locale}
                                name={city.locale}
                                d={mapPath[city.locale]}
                                onClick={() => handleAreaCode(city.localeNum)}
                                fill={setColorByCount(city.count)}
                                stroke="#777777"
                                onMouseOver={(e) => handleMouseOver(e, city.locale, city.count)}
                                onMouseOut={handleMouseOut}
                            />
                        ))}
                    </svg>
                    {tooltip.show && (
                        <div
                            style={{
                                position: 'absolute',
                                left: tooltip.x,
                                top: tooltip.y,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                color: '#fff',
                                padding: '5px',
                                borderRadius: '5px',
                                zIndex: 9999,
                            }}
                        >
                            <div>{tooltip.cityName}: {tooltip.count}건</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="search-wrap">
                <div className="search-page">
                    <div className="search-form">
                        <input
                            type="text"
                            value={searchText}
                            placeholder="검색어를 입력하세요"
                            list="recent-searches"
                            onChange={handleSearchInputChange}
                        />
                        <datalist id="recent-searches">
                            {recentSearches.map((search, index) => (
                                <option key={index} value={search}/>
                            ))}
                        </datalist>

                        <button onClick={() => handleSearch(searchText)}>검색</button>
                    </div>
                    <div className="sort-options">
                        <button className={`sort-button ${order === 'title' ? 'active' : ''}`}
                                onClick={() => handleOrderChange('title')}>제목순
                        </button>
                        <button className={`sort-button ${order === 'grade' ? 'active' : ''}`}
                                onClick={() => handleOrderChange('grade')}>별점순
                        </button>
                        <button className={`sort-button ${order === 'date' ? 'active' : ''}`}
                                onClick={() => handleOrderChange('date')}>최신순
                        </button>
                    </div>

                    <div className="search-results-container">
                        <Sidebar catList={catList} setCatCode={handleCatkrSelection}/>
                        <div className="search-results">
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => (

                                    <Link to={`/detail/${result.contentid}`}
                                          style={{textDecoration: 'none'}}
                                    >
                                        <Place key={result.contentid}
                                               index={index}
                                               contentid={result.contentid}
                                               firstImage={result.firstImage}
                                               title={result.title}
                                               addr1={result.addr1}
                                               cat3={result.cat3}
                                               averageRate={result.averageRate}
                                               cntRating={result.cntRating}/>
                                    </Link>
                                ))
                            ) : (
                                <p>검색 결과가 없습니다.</p>
                            )}
                        </div>
                    </div>

                    <div className="pagination">
                        <button disabled={currentPage <= 5}
                                onClick={() => handlePageChange(currentPage - 5)}>이전
                        </button>
                        {renderTravlePageNumbers()}
                        <button disabled={(Math.floor((currentPage - 1) / 5) + 1) * 5 >= totalPages}
                                onClick={() => handlePageChange(currentPage + 5)}>다음
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default SearchLocation;

const Place = ({index, contentid, firstImage, title, addr1, cat3, averageRate, cntRating}) => {

    const Rate = styled.div`width: 45px;
      height: 22px;
      color: white;
      background-color: #4978ce;
      padding: 2px;
      text-align: center;
      line-height: 22px;
      display: inline;
      margin-left: 10px;`;
    const P = styled.div`display: inline;
      font-size: 15px;
      color: #909090;
      margin-right: 10px;
      margin-left: 10px;`;

    const catColors = {
        '액티비티': {backgroundColor: '#B4DAF2'},
        '테마파크': {backgroundColor: '#B4DAF2'},
        '축제': {backgroundColor: '#B4DAF2'},
        '바다': {backgroundColor: '#DBDBC5'},
        '자연': {backgroundColor: '#DBDBC5'},
        '산': {backgroundColor: '#DBDBC5'},
        '문화역사': {backgroundColor: '#F7AB89'},
        '실내여행지': {backgroundColor: '#F7AB89'},
        '쇼핑': {backgroundColor: '#F7AB89'},
        '카페': {backgroundColor: '#F4D35E'},
        '식당': {backgroundColor: '#F4D35E'},
    };

    // 해당 카테고리의 배경색과 폰트색 가져오기
    const {backgroundColor, color} = catColors[cat3] || {
        backgroundColor: 'gray',
        color: 'black',
        fontFamily: "GmarketSansMedium"
    };
    return (
        <div key={index} className="search-result-card">
            <div>
                <div
                    style={{
                        display: "flex"
                    }}
                >
                    <a href={`/detail/${contentid}`}>
                        <img src={firstImage}
                             style={{width: '90px', height: '90px', borderRadius: '100px', marginRight: '30px'}}/>
                    </a>
                    {title}
                    <Rate>{averageRate}</Rate> <P>/{cntRating}개</P>
                </div>
                <div>
                    <strong style={{
                        backgroundColor, color,
                        fontSize: '75%', fontFamily: "GmarketSansMedium",
                        fontWeight: '300',
                        padding: '0.25em 0.5em', borderRadius: "8px",
                        marginLeft: '10px'
                    }}>{cat3}</strong>
                    <P>{addr1}</P>
                </div>
            </div>

        </div>
    )
}

