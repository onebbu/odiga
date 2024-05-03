import React, { useState } from 'react';

function Sidebar({ catList, setCatCode }) {
  const [selectedCatType, setSelectedCatType] = useState(null);

  catList = catList.map((cat) => {
    if (cat.cattype === null) {
      return { ...cat, cattype: "숙소/코스" };
    }
    return cat;
  });

  const handleCatkrClick = (catcode) => {
    setCatCode(catcode); // 선택한 catcode를 부모 컴포넌트로 전달
  };

  const catTypesMap = {};
  catList.forEach((cat) => {
    if (!catTypesMap[cat.cattype]) {
      catTypesMap[cat.cattype] = [];
    }
    catTypesMap[cat.cattype].push(cat);
  });

  const handleCatTypeClick = (cattype) => {
    setSelectedCatType(cattype);
  };

  return (
    <div className="sidebar" style={{ float: "right" }}>
      <h2>카테고리</h2>
      <h5>cattype</h5>
      <div>
        {Object.keys(catTypesMap).map((cattype, index) => (
          <div key={index}>
            <button onClick={() => handleCatTypeClick(cattype)}>{cattype}</button>
          </div>
        ))}
      </div>
      <h5>catkr</h5>
      <div>
        {selectedCatType && (
          <div>
            {catTypesMap[selectedCatType].map((cat, index) => (
              <div key={index}>
                <button onClick={() => handleCatkrClick(cat.catcode)}>{cat.catkr}</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
