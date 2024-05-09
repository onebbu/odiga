import React, { useState } from 'react';

function HashtagInput({ onTagsChange }) {
  const [hashtags, setHashtags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' ) {
      event.preventDefault();
      addHashtag();
    }
  };

  const addHashtag = () => {
    if (inputValue.trim() !== '') {
      const newHashtag = `#${inputValue.trim()}`;
      setHashtags([...hashtags, newHashtag]);
      setInputValue('');
      // 태그가 변경되었음을 통짜 String으로 상위 컴포넌트로 전달
      onTagsChange([...hashtags, newHashtag].join(' '));
    }
  };

  const removeHashtag = (indexToRemove) => {
    const updatedTags = hashtags.filter((_, index) => index !== indexToRemove);
    setHashtags(updatedTags);
    // 태그가 변경되었음을 통짜 String으로 상위 컴포넌트로 전달
    onTagsChange(updatedTags.join(' '));
  };

  return (
    <div>
      <div>
        {hashtags.map((tag, index) => (
          <span key={index} onClick={() => removeHashtag(index)}>
            {tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Add hashtags..."
      />
    </div>
  );
}

export default HashtagInput;
