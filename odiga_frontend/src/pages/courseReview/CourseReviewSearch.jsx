import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import axios from "axios";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 500px;
  margin-top: 70px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 20px 0 0 20px;
  outline: none;
  font-size: 15px;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 20px 20px 0;
  background-color: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #e9ecef;
  }
`;

const CourseReviewSearch = memo(({ setPosts, setCurrentPage }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get("/coursereviewsearch", {
        params: {
          query: query,
        },
      });
      const fetchedPosts = response.data;
      setPosts(fetchedPosts);
      setCurrentPage(1);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="어디로, 어떤 여행코스를 살펴볼까요?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton type="submit" disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSearch} />}
        </SearchButton>
      </SearchForm>
    </CenteredContainer>
  );
});

export default CourseReviewSearch;
