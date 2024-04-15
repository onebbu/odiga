import React,{useState} from "react";
import Styled from "styled-components";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './cPP.css';
import Item from './Place';

const Body= Styled.div`
    margin: 0;
    padding: 0;
    font-family: 'JalnanGothic';
    background: #f3f4f6; /* 미미한 회색 */
`;
const Wrapper=Styled.div` display: flex; min-height: 100vh; `;
const AccordionWrap=Styled.div`width:20%; height: 100%;position:fixed;`;
const Section=Styled.div`width: 75%; margin-left:20%; display: flex; flex-direction: column; width:80%; padding: 16px;`;

function ChoosePlace() {
    return(
        <Body>
            <Wrapper>
                <CustomizedAccordions/>
                <Section>
                    <div className="item">
                        <p> 여행지를 드래그하여 채워보세요! </p>
                        <h2>서울시의 꼭! 가봐야 할 여행지 </h2>
                    </div>
                    <div className="item">
                        인기순 | 가나다순 | 별점순
                    </div>
                    <Item />
                    <button type="button" className="button" id="load">
                      <span className="button__text">Add Item</span>
                      <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                  </button>
                </Section>
            </Wrapper>
        </Body>
    );
}


// const Rate=Styled.div`width: 45px; height: 22px; color:white; background-color:#4978ce; padding:2px; text-align: center; line-height:22px; display:inline;`;
// const Img=Styled.img`width:100%; height: 180px;`;
// const P=Styled.div`display:inline; font-size:10px; color:#909090;`;
// function Item() {
//     return(
//         <div>
//             <Img src="https://source.unsplash.com/featured/?mountain" alt="산"/>
//             여행지 이름 <P>| 대구 중구</P> <br/>
//             <Rate>4.5</Rate> <P>리뷰 10000개</P>
//         </div>
//     );
// }

function RowAndColumnSpacing() {
  const [isShowMore, setIsShowMore] = useState(true);
  function showGrid() {
    setIsShowMore((isShowMore) => !isShowMore);
  }
 
    return (
      <Box sx={{ width: '100%' }}>
        <div className="item grid" >
          <div className="grid-item"><Item/></div>
        </div>
      </Box>
    );
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
    padding: theme.spacing(2),
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
            <Typography>
              가고 싶은 여행지를 드래그하여 채워보세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography> DAY 2 </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
                가고 싶은 여행지를 드래그하여 채워보세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography> DAY 3 </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
                가고 싶은 여행지를 드래그하여 채워보세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </AccordionWrap>
    );
}

export default ChoosePlace;