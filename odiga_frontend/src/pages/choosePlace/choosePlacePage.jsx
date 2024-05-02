import React, {useState , useRef, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import ListPlace from './Place';
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
  // vvvvvvvvvvvvvvv choosePage의 Preference들 .vvvvvvvvvvvvvvvvvvvvvv
  
  const [targetArea, setTargetArea] = useState('1');
  const [targetDura, setTargetDura] = useState('3');
  const [targetTheme, setTargetTheme] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedValues, setSelectedValues] = useState(null);

  useEffect(() => {
    const startTime = performance.now();

    // 페이지가 완전히 로드된 후 시간 측정 종료 및 출력
    const handleLoad = () => {
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      console.log("페이지 로딩 시간:", totalTime, "밀리초");
    };

    window.addEventListener("load", handleLoad);


    setSelectedValues(location.state);
      // 선택한 값이 모두 채워져 있는지 확인
    if (!selectedValues || !selectedValues.region || !selectedValues.duration || selectedValues.theme.length < 2) {
      // 선택한 값이 모두 채워져 있지 않은 경우, wrongpath 페이지로 이동
      //navigate('/wrongpath/preference');
    }
    else{
      console.log("선택한 값들:", selectedValues); // 선택한 값들을 콘솔에 출력
      setTargetArea(selectedValues.region);
      setTargetDura(selectedValues.duration);
      setTargetTheme(selectedValues.theme);
    }
      // cleanup 함수: 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        window.removeEventListener("load", handleLoad);
    };

  }, [navigate, location, selectedValues]); 
  // ^^^^^^^^^^^^^^^choosePage의 Preference들 ^^^^^^^^^^^^^^

  // useEffect(() => { //유동적 높이 조절 포기,,,,,,,
  //   if (containerRef.current) {
  //     const height = containerRef.current.clientHeight;
  //     console.log('isDrawerOpen:', isDrawerOpen);
  //     console.log('containerHeight:', containerHeight);
  //     setContainerHeight(height);
  //   }
  // }, [isDrawerOpen, containerHeight]);
  // const ItemsContainer = Styled.div`
  //   margin-top: ${(props) => props.isDrawerOpen ? `${props.containerHeight}px` : '0'};
  //   transition: margin-top 0.3s ease-in-out;
  // `;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return(
    <Body>
      <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <CustomizedAccordions duration={targetDura} />
            <Section>  
              <OpenButton onClick={toggleDrawer}>찜 목록 열기</OpenButton>
              <Drawer isopen={isDrawerOpen} onClose={toggleDrawer} ref={containerRef}/>
              <ItemsWrapper isDrawerOpen={isDrawerOpen} 
                            containerHeight={containerHeight} 
                            targetAreacode={targetArea}
                            targetTheme={targetTheme}/>
            </Section>
        </Wrapper>
      </DndProvider>
    </Body>
  );  
}


const ItemsWrapper = ({ isDrawerOpen, containerHeight, targetAreacode, targetTheme}) => {
  const [order, setOrder] = useState('title'); //order defalt = 'title'
  // find 함수를 사용하여 areacode가 targetAreacode와 일치하는 요소를 찾기
  const foundArea = areaList.find(area => area.areacode === targetAreacode);
  const foundAreaName = foundArea ? foundArea.areaname : '없음';

  const Orderbtn = ({name, orderID }) => {
    return (
      <div  onClick={()=>setOrder(orderID)} style={{cursor:"pointer", display:"inline", padding:'7px'}}>
        {name}
      </ div>
    )
  }; 

  return(<>
    <ItemsContainer isDrawerOpen={isDrawerOpen} containerHeight={containerHeight}>
      <div className="item">
          <p> 여행지를 드래그하여 채워보세요! </p>
          <h2> {foundAreaName}의 꼭! 가봐야 할 여행지 </h2>
      </div>
      {targetTheme}
      <div className="item"> <span> 
                <Orderbtn name={'조회순'} orderID={'travelviewcount'}/>|
                <Orderbtn name={'가나다순'} orderID={'title'}/>|
                <Orderbtn name={'별점순'} orderID={'likecount'}/> </span>    </div>
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
  
const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    paddingTop: '20px',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    minHeight: '450px'
}));

const scheduleData = [
  { id: 1, title: 'DAY 1', duration: ['당일여행', '1박2일', '2박3일'] },
  { id: 2, title: 'DAY 2', duration: ['1박2일', '2박3일'] },
  { id: 3, title: 'DAY 3', duration: ['2박3일'] },
];

const Position = Styled.div`
  position: relative;
`;

function CustomizedAccordions({duration}) {
  const [expanded, setExpanded] = useState('');
  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const sendData = () => {
    // 여기에 정보를 전송하는 코드를 작성합니다.
    alert('정보를 전송합니다.');
  }

    return (
      <Position>
      <AccordionWrap>
        {scheduleData.map(schedule => {
            if (duration && schedule.duration.includes(duration)) {
              return (
                <Accordion key={schedule.id} expanded={expanded === `panel${schedule.id}`} onChange={handleChange(`panel${schedule.id}`)}>
                  <AccordionSummary aria-controls={`panel${schedule.id}d-content`} id={`panel${schedule.id}d-header`}>
                    <Typography>{schedule.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      <DropContainer />
                  </AccordionDetails>
                </Accordion>
              );
            } else {
              return null;
            }
          })
        }
        <button className="buttondesign save" onClick={sendData}>저장하기</button>
      </AccordionWrap>
      
      </Position>
    );
}

export default ChoosePlace;