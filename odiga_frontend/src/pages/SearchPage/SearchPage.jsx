import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './SideBar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedAreaCode, setSelectedAreaCode] = useState('1');
  const [searchResults, setSearchResults] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const [catList, setCatList] = useState([]); 
  const [catCode , setCatCode] = useState(null);
  const [courseResults, setCourseResults] = useState([]);
  const [resultCourseCount, setResultCourseCount] = useState(0);
  const [coursetotalPages, setCourseTotalPages] = useState(0);


  useEffect(() => {
    // 페이지 변경 시 검색 결과 요청
    fetchSearchResults(currentPage);
    fetchCourseResults(currentPage);
    fetchCategories();
  }, [currentPage]);

  // 함수: 검색어 입력 시 상태 업데이트
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // 함수: 옵션 선택 시 상태 업데이트
  const handleAreaChange = (event) => {
    setSelectedAreaCode(event.target.value);
  };

  // 함수: 페이지 변경 시 상태 업데이트
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchSearchResults(page);
    fetchCourseResults(page);
  };

  const handleCatkrSelection = (selectedCatcode) => {
    setCatCode(selectedCatcode);
    fetchSearchResults(1);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories'); // 카테고리 가져오는 API 엔드포인트
      setCatList(response.data);
    } catch (error) {
      console.error('카테고리를 불러오는 중 에러 발생:', error);
    }
  };
  // 여행코스 결과를 가져오는 함수 (예시)
  const fetchCourseResults = async (page) => {
    try {
      const response = await axios.get('/searchcourse', {
        params: {
          page: page,
          text: searchText,
          areacode: selectedAreaCode
        }
      });
      const { CourseListResult , resultCourseCount } = response.data;
      setCourseResults(CourseListResult);
      setResultCourseCount(resultCourseCount);
      setCourseTotalPages(Math.floor(resultCourseCount / 10) || 0);
    } catch (error) {
      console.error('여행코스 검색 결과를 불러오는 중 에러 발생:', error);
      setCourseResults([]); // 오류 발생 시 결과 초기화
    }
  };

  // 함수: 여행지 검색 결과 요청
  const fetchSearchResults = async (page) => {
    try {
      const response = await axios.get('/search', {
        params: {
          page: page,
          text: searchText,
          areacode: selectedAreaCode,
          catcode : catCode
        }
      });
      const { searchList, resultCount } = response.data;
      setSearchResults(searchList || []);
      setTotalPages(Math.floor(resultCount / 10) || 0);
      setResultCount(resultCount || 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // 오류 발생 시 검색 결과 초기화
      setSearchResults([]);
      setTotalPages(0);
      setResultCount(0);
    }
  };

  // 함수: 검색 버튼 클릭 시 검색 수행
  const handleSearch = () => {
    setCurrentPage(1);
    fetchSearchResults(1); 
    fetchCourseResults(1);
  };
// 여행지 페이지 번호를 생성하는 함수 
const renderTravlePageNumbers = () => {
  const pageNumbers = [];
  const totalPagesToShow = Math.ceil(resultCount / 10); // 결과를 10개씩 나눈 총 페이지 수
  const groupIndex = Math.floor((currentPage - 1) / 5); // 현재 페이지 그룹 인덱스
  const maxPage = Math.min(totalPagesToShow, (groupIndex + 1) * 5); // 현재 그룹의 마지막 페이지
  const minPage = groupIndex * 5 + 1; // 현재 그룹의 첫 페이지

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
// 여행코스 전용 페이지 번호를 생성하는 함수
const renderCoursePageNumbers = () => {
  const pageNumbers = [];
  const totalPagesToShow = Math.ceil(resultCourseCount / 10); // 결과를 10개씩 나눈 총 페이지 수
  const groupIndex = Math.floor((currentPage - 1) / 5); // 현재 페이지 그룹 인덱스
  const maxPage = Math.min(totalPagesToShow, (groupIndex + 1) * 5); // 현재 그룹의 마지막 페이지
  const minPage = groupIndex * 5 + 1; // 현재 그룹의 첫 페이지

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
      {/* 검색 입력 폼 */}
      <div className="search-form">
        {/* 시군구 옵션 */}
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
          {/* 옵션 목록 */}
        </select>

        {/* 검색 입력 */}
        <input
          type="text"
          value={searchText}
          onChange={handleSearchInputChange}
          placeholder="검색어를 입력하세요"
        />

        {/* 검색 버튼 */}
        <button onClick={handleSearch}>검색</button>
      </div>
      <Tabs>
        <TabList>
          <Tab>여행지</Tab>
          <Tab>여행코스</Tab>
        </TabList>

      <TabPanel>
        {/* 사이드바 */}
      <Sidebar
        catList={catList}
        // catKr={catKr}
        setCatCode={handleCatkrSelection}
      />
      {/* 검색 결과 표시 */}
      <div className="search-results">
        {/* 검색 결과 목록 */}
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index}>{result.title}</div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
          {/* 이전 버튼: 현재 페이지 그룹의 첫 페이지가 1보다 큰 경우에만 활성화 */}
          <button disabled={currentPage <= 5} onClick={() => handlePageChange(currentPage - 5)}>이전</button>
          {renderTravlePageNumbers()}
          {/* 다음 버튼: 현재 페이지 그룹의 마지막 페이지가 총 페이지 수보다 작은 경우에만 활성화 */}
          <button disabled={(Math.floor((currentPage - 1) / 5) + 1) * 5 >= totalPages} onClick={() => handlePageChange(currentPage + 5)}>다음</button>
        </div>
        
        {/* 최종 결과 수 표시 */}
        <div>
          총 {resultCount}개의 결과
        </div>
      </TabPanel>

      <TabPanel>
        <div className="course-results">
          {courseResults.length > 0 ? (
            courseResults.map((result, index) => (
              <div key={index}>{result.boardtitle}</div>
            ))
          ) : (
            <p>여행코스 결과가 없습니다.</p>
          )}
        </div>
        {/* 여행코스 전용 페이지네이션 */}
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
