import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';


function Sidebar({ catList, setCatCode }) {
  const [selectedCatType, setSelectedCatType] = useState(null);
  const [selectedCatCode, setSelectedCatCode] = useState(null);

  useEffect(() => {
    // selectedCatCode가 변경될 때마다 setCatCode를 호출
    setCatCode(selectedCatCode);
  }, [selectedCatCode]); // selectedCatCode가 변경될 때만 이 effect를 실행

  // 카테고리 타입별로 매핑
  const catTypesMap = {};
  catList.forEach((cat) => {
    
    if (!catTypesMap[cat.cattype]) {
      catTypesMap[cat.cattype] = [];
    }
    
    catTypesMap[cat.cattype].push(cat);
  });

  // 카테고리 타입 선택 핸들러
  const handleCatTypeClick = (cattype) => {
    setSelectedCatType(cattype);
    setSelectedCatCode(null); // 새 타입 선택 시 기존 선택된 catCode 초기화
  };

  // 카테고리 코드 선택 핸들러
  const handleCatkrClick = (catcode) => {
    if (selectedCatCode === catcode) {
      // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
      setSelectedCatCode(null);
    } else {
      // 새로운 카테고리 선택
      setSelectedCatCode(catcode);
    }
  };

  return (
    <div className="sidebar" style={{ float: "right" }}>
        <h2>카테고리</h2>

        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>cattype</Accordion.Header>
                <Accordion.Body>
                    <div>
                        {Object.keys(catTypesMap).map((cattype, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => handleCatTypeClick(cattype)}
                                    className={selectedCatType === cattype ? 'active' : ''}
                                    style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                                >
                                    {cattype}
                                </button>
                            </div>
                        ))}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>catkr</Accordion.Header>
                <Accordion.Body>
                    <div>
                        {selectedCatType && (
                            <div>
                                {catTypesMap[selectedCatType].map((cat, index) => (
                                    <div key={index}>
                                        <button
                                            onClick={() => handleCatkrClick(cat.catcode)}
                                            className={selectedCatCode === cat.catcode ? 'active' : ''}
                                            style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                                        >
                                            {cat.catkr}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
      {selectedCatCode && (
        <div className="selected-category">
          선택된 카테고리: {catList.find(cat => cat.catcode === selectedCatCode)?.catkr}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
