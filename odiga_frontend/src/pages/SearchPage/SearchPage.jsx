import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedAreaCode, setSelectedAreaCode] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    // 페이지 변경 시 검색 결과 요청
    fetchSearchResults(currentPage);
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
  };

  // 함수: 검색 결과 요청
  const fetchSearchResults = async (page) => {
    try {
      const response = await axios.get('/search', {
        params: {
          page: page,
          text: searchText,
          areacode: selectedAreaCode
        }
      });
      const { searchList, totalPages, resultCount } = response.data;
      setSearchResults(searchList || []);
      setTotalPages(totalPages || 0);
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
    setCurrentPage(1); // 검색어가 변경되면 첫 페이지로 초기화
  };
// 페이지 번호를 생성하는 함수 (5개씩 표시)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = Math.ceil(resultCount / 10); // 결과를 10개씩 나눈 총 페이지 수
    const maxPage = Math.min(totalPagesToShow, currentPage + 4); // 현재 페이지에서 최대 5개의 페이지까지만 표시
    const minPage = Math.max(1, maxPage - 4); // 최대 페이지에서 최소 5개의 페이지까지 표시
  
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
          <option value="">전체</option>
          <option value="1">서울</option>
          {/* 옵션 목록 */}
        </select>

        {/* 검색어 입력 */}
        <input
          type="text"
          value={searchText}
          onChange={handleSearchInputChange}
          placeholder="검색어를 입력하세요"
        />

        {/* 검색 버튼 */}
        <button onClick={handleSearch}>검색</button>
      </div>

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

        {/* 페이지네이션 */}
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>이전</button>
          {renderPageNumbers()}
          <button disabled={currentPage === totalPages || searchResults.length === 0} onClick={() => handlePageChange(currentPage + 1)}>다음</button>
        </div>
        
        {/* 최종 결과 수 표시 */}
        <div>
          총 {resultCount}개의 결과
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
