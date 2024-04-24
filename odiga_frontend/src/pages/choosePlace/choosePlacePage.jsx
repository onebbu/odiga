import React, {useState , useRef } from "react";
import Styled from "styled-components";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import './cPP.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ListPlace, { areacode } from './Place';
import DropContainer from "./DropContainer";
import Drawer from './Drawer';

// http://localhost:3000/place

const Body= Styled.div`
    margin: 0;
    padding: 0;
    background: #f3f4f6; /* 미미한 회색 */
`;
const Wrapper=Styled.div` display: flex; min-height: 100vh; `;
const AccordionWrap=Styled.div`width:20%; height: 100%; position:fixed;`;
const Section=Styled.div` position: relative; border: 1px solid #ccc; width: 75%; gap: 20px;
    margin-left:20%; display: flex; flex-direction: column; width:80%; padding: 16px;`;
const OpenButton = Styled.button`position: fixed; top: 0px; right: 100px; width: 200px; height: 60px;
    background-color: #549C9B; /* Green */ border: none; border-radius: 0 0 10px 10px; cursor: pointer; outline: none;
    transition: background-color 0.3s ease; color: white; text-weight: border; font-size: 20px;
    &:hover {  background-color: #417977; /* Darker green on hover */ } `;
const ItemsContainer = Styled.div`
    margin-top: ${(props) => (props.isDrawerOpen ? 320 : 0)}px;
    transition: margin-top 0.3s ease-in-out;
  `;
// 찾고자 하는 areacode
const targetAreacode = '6';
const order = "title"; //title //travelviewcount //

const areaList = [
    { areacode: '1', areaname: '서울' },
    { areacode: '2', areaname: '인천' },
    { areacode: '3', areaname: '대전' },
    { areacode: '4', areaname: '대구' },
    { areacode: '5', areaname: '광주' },
    { areacode: '6', areaname: '부산' },
    { areacode: '7', areaname: '울산' },
    { areacode: '8', areaname: '세종특별자치시' },
    { areacode: '31', areaname: '경기도' },
    { areacode: '32', areaname: '강원도' },
    { areacode: '33', areaname: '충청북도' },
    { areacode: '34', areaname: '충청남도' },
    { areacode: '35', areaname: '경상북도' },
    { areacode: '36', areaname: '경상남도' },
    { areacode: '37', areaname: '전라북도' },
    { areacode: '38', areaname: '전라남도' },
    { areacode: '39', areaname: '제주도' },
];

const ChoosePlace = () => {

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // useEffect(() => { //유동적 높이 조절 포기,,,,,,,
  //   if (containerRef.current) {
  //     const height = containerRef.current.clientHeight;
  //     console.log('isDrawerOpen:', isDrawerOpen);
  //     console.log('containerHeight:', containerHeight);
  //     setContainerHeight(height);
  //   }
  // }, [isDrawerOpen, containerHeight]);


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

    return(
        <Body>
          <DndProvider backend={HTML5Backend}>
            <Wrapper>
                <CustomizedAccordions/>
                <Section>  
                  <OpenButton onClick={toggleDrawer}>찜 목록 열기</OpenButton>
                  <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} ref={containerRef}/>
                  <ItemsWrapper isDrawerOpen={isDrawerOpen} containerHeight={containerHeight} targetAreacode={targetAreacode}/>
                </Section>
            </Wrapper>
            </DndProvider>
        </Body>
    );
}
// const ItemsContainer = Styled.div`
//   margin-top: ${(props) => props.isDrawerOpen ? `${props.containerHeight}px` : '0'};
//   transition: margin-top 0.3s ease-in-out;
// `;


const ItemsWrapper = ({ isDrawerOpen, containerHeight, targetAreacode}) => {
  // find 함수를 사용하여 areacode가 targetAreacode와 일치하는 요소를 찾기
  const foundArea = areaList.find(area => area.areacode === targetAreacode);
  const foundAreaName = foundArea ? foundArea.areaname : '없음';
  return(<>
    <ItemsContainer isDrawerOpen={isDrawerOpen} containerHeight={containerHeight}>
      <div className="item">
          <p> 여행지를 드래그하여 채워보세요! </p>
          <h2> {foundAreaName}의 꼭! 가봐야 할 여행지 </h2>
      </div>
      <div className="item"> <span>인기순 | 가나다순 | 별점순 </span>  </div>
      <div className="item">
        <ListPlace areacode={targetAreacode} order={order}/>
      </div>
    </ItemsContainer>
  
  </>)
}

{/* 왼쪽 메뉴 --------------------------------------------------- */}
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));
  
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
}));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    paddingTop: '20px',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    minHeight: '450px'
}));
  
function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState('panel1');
  
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    return (
      <AccordionWrap>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography> DAY 1 </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DropContainer />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography> DAY 2 </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DropContainer />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography> DAY 3 </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DropContainer />
          </AccordionDetails>
        </Accordion>
      </AccordionWrap>
    );
}

export default ChoosePlace;