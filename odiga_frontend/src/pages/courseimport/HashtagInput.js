import React, { useState, useEffect } from 'react';
import './couseImport.css';
import styled from 'styled-components';

function HashtagInput({ initialTags = [], onTagsChange }) {
  const [hashtags, setHashtags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (hashtags.length >= 10) {
        alert('태그는 10개까지만 가능합니다 !');
      } else {
        addHashtag();
      }
    }
  };

  const addHashtag = () => {
    if (inputValue.trim() !== '') {
      const newHashtag = `# ${inputValue.trim()} `;
      const updatedTags = [...hashtags, newHashtag];
      if (updatedTags.length > 10) {
        alert('태그는 10개까지만 가능합니다!');
        return;
      }
      setHashtags(updatedTags);
      setInputValue('');
      onTagsChange(updatedTags.join(' '));
    }
  };

  const removeHashtag = (indexToRemove) => {
    const updatedTags = hashtags.filter((_, index) => index !== indexToRemove);
    setHashtags(updatedTags);
    // 태그가 변경되었음을 통짜 String으로 상위 컴포넌트로 전달
    onTagsChange(updatedTags.join(' '));
  };

  useEffect(() => {
    setHashtags(initialTags);
  }, []);

  return (
    <div className="hashTagBox">
      <div className="hashTagInner">
        {hashtags.map((tag, index) => (
          <span className="tagClass" key={index} onClick={() => removeHashtag(index)}>
            {tag}
          </span>
        ))}
      </div>

      <div className="hashtagInputInner">
      <input
        className="hashtagInput"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="태그를 추가해보세요!"
      />
      </div>
    </div>
  );
}

export default HashtagInput;
