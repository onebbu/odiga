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
import ListPlace from './Place';
import DropContainer from "./DropContainer";
import Drawer from './Drawer';
import axios from 'axios';

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


//현재는 임의로 설정 추후 수정요망
export const areacode = 3;

const ChoosePlace = () => {

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [data, setData] = useState(null);
  const [didMount, setDidMount] = useState(false); // 컴포넌트가 마운트되었는지 여부를 나타내는 상태
  // useEffect(() => { //유동적 높이 조절 포기,,,,,,,
  //   if (containerRef.current) {
  //     const height = containerRef.current.clientHeight;
  //     console.log('isDrawerOpen:', isDrawerOpen);
  //     console.log('containerHeight:', containerHeight);
  //     setContainerHeight(height);
  //   }
  // }, [isDrawerOpen, containerHeight]);

  useEffect(() => {
    setDidMount(true); // Set didMount to true after component mounts
  }, []);

  useEffect(() => {
      if (didMount) {
        // 백엔드 API 호출
        axios.get(`/place/${areacode}`)
          .then(response => {
            console.log('Data received:', response.data);
            setData(response.data); // 데이터를 상태에 저장
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }, [didMount, areacode]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

    return(
        <Body>
          <DndProvider backend={HTML5Backend}>
            <Wrapper>
                <CustomizedAccordions/>
                <Section>

    <div>
      {/* Render data once it's fetched and not null */}
      {data && (
        <div>
          <h1>{data.title}</h1>
          {/* Render other properties from data */}
        </div>
      )}
    </div>
  
                  <OpenButton onClick={toggleDrawer}>찜 목록 열기</OpenButton>
                  <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} ref={containerRef}/>
                  <ItemsWrapper isDrawerOpen={isDrawerOpen} containerHeight={containerHeight} data={data} />
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


const ItemsWrapper = ({ isDrawerOpen, containerHeight, data }) => {
  return(<>
    <ItemsContainer isDrawerOpen={isDrawerOpen} containerHeight={containerHeight}>
      <div className="item">
          <p> 여행지를 드래그하여 채워보세요! </p>
          <h2>서울시의 꼭! 가봐야 할 여행지 </h2>
      </div>
      <div className="item">  인기순 | 가나다순 | 별점순  </div>
      <ListPlace data={data}/>
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