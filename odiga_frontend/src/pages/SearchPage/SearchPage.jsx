import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './SideBar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SearchPage.css';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => JSON.parse(localStorage.getItem('recentSearches')) || []);
  const [selectedAreaCode, setSelectedAreaCode] = useState('1');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const [catList, setCatList] = useState([]); 
  const [catCode, setCatCode] = useState(null);
  const [courseResults, setCourseResults] = useState([]);
  const [resultCourseCount, setResultCourseCount] = useState(0);
  const [coursetotalPages, setCourseTotalPages] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSearchResults(currentPage);
    fetchCourseResults(currentPage);
  }, [currentPage, catCode]); // catCode added

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAreaChange = (event) => {
    setSelectedAreaCode(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCatkrSelection = (selectedCatcode) => {
    setCatCode(selectedCatcode); // Now triggers search in useEffect
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
          areacode: selectedAreaCode,
          catcode: catCode
        }
      });
      const { searchList, resultCount } = response.data;
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

  const fetchCourseResults = async (page) => {
    try {
      const response = await axios.get('/searchcourse', {
        params: {
          page: page,
          text: searchText,
          areacode: selectedAreaCode
        }
      });
      const { CourseListResult, resultCourseCount } = response.data;
      setCourseResults(CourseListResult);
      setResultCourseCount(resultCourseCount);
      setCourseTotalPages(Math.floor(resultCourseCount / 10) || 0);
    } catch (error) {
      console.error('Error fetching course results:', error);
      setCourseResults([]);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchSearchResults(1);
    fetchCourseResults(1);
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

  const renderCoursePageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = Math.ceil(resultCourseCount / 10);
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

  return (
    <div className="search-page">
      <div className="search-form">
        <select value={selectedAreaCode} onChange={handleAreaChange}>
          <option value="1">서울</option>
          <option value="2">인천</option>
          <option value="3">대전</option>
          <option value="4">대구</option>
          <option value="5">광주</option>
          <option value="6">부산</option>
          <option value="7">울산</option>
          <option value="8">세종</option>
          <option value="31">경기도</option>
          <option value="32">강원도</option>
          <option value="33">충청북도</option>
          <option value="34">충청남도</option>
          <option value="35">경상북도</option>
          <option value="36">경상남도</option>
          <option value="37">전라북도</option>
          <option value="38">전라남도</option>
          <option value="39">제주도</option>
        </select>

        <input
          type="text"
          value={searchText}
          onChange={handleSearchInputChange}
          placeholder="검색어를 입력하세요"
          list="recent-searches"
        />
        <datalist id="recent-searches">
          {recentSearches.map((search, index) => (
            <option key={index} value={search} />
          ))}
        </datalist>

        <button onClick={handleSearch}>검색</button>
      </div>

      <Tabs>
        <TabList>
          <Tab>여행지</Tab>
          <Tab>여행코스</Tab>
        </TabList>

        <TabPanel>
          <div className="search-results-container">
            <Sidebar catList={catList} setCatCode={handleCatkrSelection} />
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div key={index} className="search-result-card">
                    <div className="search-result-title">{result.title}</div>
                    <div className="search-result-info">
                      위치: {result.addr1}
                    </div>
                  </div>
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </div>
          </div>

          <div className="pagination">
            <button disabled={currentPage <= 5} onClick={() => handlePageChange(currentPage - 5)}>이전</button>
            {renderTravlePageNumbers()}
            <button disabled={(Math.floor((currentPage - 1) / 5) + 1) * 5 >= totalPages} onClick={() => handlePageChange(currentPage + 5)}>다음</button>
          </div>

          <div>
            총 {resultCount}개의 결과
          </div>
        </TabPanel>

        <TabPanel>
          <div className="search-result-card">
            {courseResults.length > 0 ? (
              courseResults.map((result, index) => (
                <div key={index} className="search-result-card">
                  <div className="search-result-title">{result.boardtitle}</div>
                  <div className="search-result-info">
                    작성날짜 : {result.boarddate}
                  </div>
                </div>
              ))
            ) : (
              <p>여행코스 결과가 없습니다.</p>
            )}
          </div>

          <div className="pagination">
            <button disabled={currentPage <= 5} onClick={() => handlePageChange(currentPage - 5)}>이전</button>
            {renderCoursePageNumbers()}
            <button disabled={(Math.floor((currentPage - 1) / 5) + 1) * 5 >= coursetotalPages} onClick={() => handlePageChange(currentPage + 5)}>다음</button>
          </div>

          <div>
            총 {resultCourseCount}개의 결과
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default SearchPage;

