import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ClearIcon from '@mui/icons-material/Clear';

function Sidebar({catList, setCatCode}) {
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

    // 카테고리 초기화
    const handleCatTypeReset = () => {
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

    // 팝오버 내용
    const popoverContent = (
        <Popover id="popover-cat">
            <Popover.Body>
                <div
                style={{display: "flex"}}
                >
                    <div>
                        {Object.keys(catTypesMap).map((cattype, index) => (
                            <div key={index}>
                                <CatButton
                                    onClick={() => handleCatTypeClick(cattype)}
                                    className={selectedCatType === cattype ? 'active' : ''}
                                    style={{padding: '5px 10px', fontSize: '0.8rem'}}
                                >
                                    {cattype}
                                </CatButton>
                            </div>
                        ))}
                    </div>
                    <div>
                        {selectedCatType && (
                            <div>
                                {catTypesMap[selectedCatType].map((cat, index) => (
                                    <div key={index}>
                                        <CatButton
                                            onClick={() => handleCatkrClick(cat.catcode)}
                                            className={selectedCatCode === cat.catcode ? 'active' : ''}
                                            style={{padding: '5px 10px', fontSize: '0.8rem'}}
                                        >
                                            {cat.catkr}
                                        </CatButton>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="sidebar">
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popoverContent}
                rootClose
            >
                <CategoryButton>카테고리 선택</CategoryButton>
            </OverlayTrigger>
            <div>
                {selectedCatCode && (
                    <SelectedCategoryWrapper>
                        <SelectedCat
                            onClick={handleCatTypeReset}>{catList.find(cat => cat.catcode === selectedCatCode)?.catkr}
                            <ClearIcon/></SelectedCat>
                    </SelectedCategoryWrapper>
                )}
            </div>
        </div>
    );
}

export default Sidebar;

const SelectedCategoryWrapper = styled.div`
  text-align: center;
`;

const SelectedCat = styled.button`
  background-color: #4285F4;
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  margin-right: 10px;
  border: none;
`;

const CategoryButton = styled.button`
  background-color: white;
  color: #4285F4;
  border-radius: 8px;
  padding: 5px 10px;
  border: black solid 1px;
  margin-right: 10px;
`;

const CatButton = styled.button`
  color: black;
  margin-bottom: 5px;
  display: block;
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
  &.active {
    font-weight: bold;
  }
`;
