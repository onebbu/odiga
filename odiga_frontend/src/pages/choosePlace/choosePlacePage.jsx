import React, {useState , useEffect, useContext } from "react";
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
import { LoginInfoContext } from "../login/LoginInfoProvider";
import ListPlace from './Place';
import DropContainer from "./DropContainer";
import Drawer from './Drawer';
import ScrollToTopButton from '../component/scrollTopBtn';
import axios from "axios";

// http://localhost:3000/place

const Body= Styled.div`
    margin: 0;
    padding: 0;
    padding-top: 100px;
    background: #f3f4f6; /* 미미한 회색 */
`;
const Wrapper=Styled.div` display: flex; min-height: 100vh;`;
const AccordionWrap=Styled.div`width:100%;`;
const Section=Styled.div` position: relative; border: 1px solid #ccc; width: 75%; gap: 20px;
    display: flex; flex-direction: column; width:80%; padding: 16px;`;
const OpenButton = Styled.button`position: fixed; top: ${({ top }) => top}px; right: 100px; width: 200px; height: 60px;
    background-color: #549C9B; /* Green */ border: none; border-radius: 0 0 10px 10px; cursor: pointer; outline: none;
    transition: top 0.3s;  color: white; text-weight: border; font-size: 20px;
    &:hover {  background-color: #417977; /* Darker green on hover */ } `;
const Position = Styled.div`position:relative; width:25%; height: 100vh;`;

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

const catColors = {
  '액티비티': {backgroundColor: '#B4DAF2'},
  '테마파크': {backgroundColor: '#B4DAF2'},
  '축제': {backgroundColor: '#B4DAF2'},
  '바다': {backgroundColor: '#DBDBC5'},
  '자연': {backgroundColor: '#DBDBC5'},
  '산': {backgroundColor: '#DBDBC5'},
  '문화역사': {backgroundColor: '#F7AB89'},
  '실내여행지': {backgroundColor: '#F7AB89'},
  '쇼핑': {backgroundColor: '#F7AB89'},
  '카페': {backgroundColor: '#F4D35E'},
  '식당': {backgroundColor: '#F4D35E'},
};

const ChoosePlace = () => {

  const loginInfo = useContext(LoginInfoContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // vvvvvvvvvvvvvvv choosePage의 Preference들 .vvvvvvvvvvvvvvvvvvvvvv
  const [targetArea, setTargetArea] = useState(null);
  const [targetDura, setTargetDura] = useState(null);
  const [targetTheme, setTargetTheme] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedValues, setSelectedValues] = useState(null); //위의 세 개 값 저장해서 쓸라고.
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
     // 선택한 값이 모두 채워져 있는지 확인하고 targetArea, targetDura, targetTheme 설정
    if (selectedValues && selectedValues.region && selectedValues.duration && selectedValues.theme.length >= 2) {
      console.log("선택한 값들:", selectedValues);
      setTargetArea(selectedValues.region);
      setTargetDura(selectedValues.duration);
      setTargetTheme(selectedValues.theme);
    } else {
      // 선택한 값이 모두 채워져 있지 않은 경우, wrongpath 페이지로 이동 또는 사용자에게 메시지 표시
      //navigate('/wrongpath/preference');
    }
      
    return () => { // cleanup 함수: 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        window.removeEventListener("load", handleLoad);
    };

  }, [location.state, selectedValues]); 

  const [buttonTop, setButtonTop] = useState(100);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setButtonTop(0);
    } else {
      setButtonTop(100);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return(
    <Body>
      <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <CustomizedAccordions duration={targetDura} loginInfo={loginInfo} />
            <Section>  
              <OpenButton top={buttonTop} onClick={toggleDrawer}>찜 목록 열기</OpenButton>
              <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}  loginInfo={loginInfo} areacode={targetArea}/>
              <ItemsWrapper targetAreacode={targetArea}
                            targetTheme={targetTheme}
                            loginInfo={loginInfo}/>
              <ScrollToTopButton/>
            </Section>
        </Wrapper>
      </DndProvider>
    </Body>
  );  
}


const ItemsWrapper = ({targetAreacode, targetTheme, loginInfo}) => {
  const [order, setOrder] = useState('title'); //order defalt = 'title'
  // find 함수를 사용하여 areacode가 targetAreacode와 일치하는 요소를 찾기
  const foundArea = areaList.find(area => area.areacode === targetAreacode);
  const foundAreaName = foundArea ? foundArea.areaname : '없음';
  const themeList = targetTheme.map(theme => ({
    // 해당 카테고리의 배경색과 폰트색 가져오기
    ...catColors[theme],
    themeName: theme,
    themebackgroundColor: catColors[theme]?.backgroundColor || 'gray',
}));
  
  const Orderbtn = ({name, orderID }) => {
    return (
      <div  onClick={()=>setOrder(orderID)} style={{cursor:"pointer", display:"inline", padding:'7px'}}>
        {name}
      </ div>
    )
  }; 

  return(<>
      <div className="item">
          <p> {loginInfo.nickname} 님 ! 여행지를 드래그하여 채워보세요! </p>
          <h2> {foundAreaName}의 꼭! 가봐야 할 여행지 </h2>
      </div>
      <div>
          {themeList.map((themeItem, index) => (
            <span key={index} style={{
                backgroundColor: themeItem.themebackgroundColor,
                color: 'black',
                fontFamily: "GmarketSansMedium",
                fontWeight: '300',
                padding: '0.5em',
                marginRight:'8px',
                borderRadius: "8px"
            }} >
                {themeItem.themeName}
            </span>
          ))}
      </div>
      <div className="item"> <span> 
                <Orderbtn name={'조회순'} orderID={'travelviewcount'}/>|
                <Orderbtn name={'가나다순'} orderID={'title'}/>|
                <Orderbtn name={'별점순'} orderID={'averageRate'}/> </span>    </div>
      <div className="item">
        <ListPlace areacode={targetAreacode} order={order} theme={targetTheme}/>
      </div>  
  </>)
}

//* 왼쪽 메뉴 --------------------------------------------------- *//
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

function CustomizedAccordions({duration, loginInfo}) {
  const [expanded, setExpanded] = useState('');
  const [buttonClicked, setButtonClicked] = useState(true);
  const [savedData, setSavedData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSaveData = (dataList, scheduleID) => {
    if (buttonClicked) {
      // DropContainer 컴포넌트로부터 전달된 데이터를 처리하는 로직을 작성합니다.
      console.log("dataList", dataList);
      console.log("Schedule ID:", scheduleID);
      // 리스트를 순회하면서 각 요소에서 필요한 정보를 추출하여 상태를 업데이트
      const updatedData = dataList.map((data) => ({
        courseDay: scheduleID,
        travelNum : data.travelNum,
        contentId : data.contentId,
        name : data.name,
        address : data.address,
        nickname : loginInfo.nickname
      }));

      console.log("업데이트 데이터???????????????",updatedData);
      // 중복되지 않은 id를 가진 요소만 상태에 추가
      // Add only unique data to the state
      updatedData.forEach(data => {
        if (!savedData.some(item => item.contentId === data.contentId)) {
          setSavedData(prevData => [...prevData, data]);
        }
      });
    }
  };

  const handleClick = () => {
    setButtonClicked(true);
      const isValid = validateSavedData(savedData);
      if (isValid) {
        const title = prompt("원하는 [코스 이름]을 작성하세요:");
        const isConfirmed = window.confirm(`입력하신 코스 이름은 [${title}] 입니다. 저장하시겠습니까?`);
        if (isConfirmed) {
          sendDataToServer(savedData, title);
        } else {
          alert("취소되었습니다.");
        }
      } else {
        alert("아직 채워지지 않은 날짜가 있습니다. 최소 1개 이상 모두 채워주세요..");
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
  };

  const validateSavedData = (data) => {
    let isValidCourseDay;
    const courseDayValues = data.map(dt => dt.courseDay);
  
    if (duration === "당일여행") {
      isValidCourseDay = courseDayValues.includes(1);
    } else if (duration === "1박2일") {
      isValidCourseDay = courseDayValues.includes(1) && courseDayValues.includes(2);
    } else if (duration === "2박3일") {
      isValidCourseDay = courseDayValues.includes(1) && courseDayValues.includes(2) && courseDayValues.includes(3);
    } else {
      isValidCourseDay = false;
    }

    return isValidCourseDay;
  };

  const sendDataToServer = (savedData, title) => {
  
    console.log("전송될 데이터: ", savedData);
    console.log("title: ",title);
    axios.post(`/place/savedata/${title}`, savedData)
      .then((response) => {
        // 성공적으로 전송되었을 때의 처리
        console.log('데이터를 성공적으로 전송했습니다.' + response.data +"   ");
        alert('저장하였습니다.' );
        
        navigate(`/result-list/${loginInfo.nickname}/${response.data}`);
      })
      .catch((error) => {
        // 전송 중 오류가 발생했을 때의 처리
        console.log(savedData);
        console.error('데이터 전송 중 오류 발생:', error);
        alert('데이터 전송 중 오류가 발생했습니다.');
      });
  };

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
                      <DropContainer onSaveData={(data) => handleSaveData(data, schedule.id)}/>
                  </AccordionDetails>
                </Accordion>
              );
            } else {   return null;   }
          })
        }
      </AccordionWrap>
      <button className="buttondesignSave" onClick={handleClick}>코스 저장하기</button> 
      </Position>
    );
}

export default ChoosePlace;