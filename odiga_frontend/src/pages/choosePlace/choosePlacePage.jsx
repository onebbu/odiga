import React from "react";
import Styled from "styled-components";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './cPP.css';

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
                    <div class="item">
                        <p> 여행지를 드래그하여 채워보세요! </p>
                        <h2>서울시의 꼭! 가봐야 할 여행지 </h2>
                    </div>
                    <div class="item">
                        인기순 | 가나다순 | 별점순
                    </div>
                    <RowAndColumnSpacing />
                    <div class="item">
                        <button type="button" class="button" id="load">
                            <span class="button__text">Add Item</span>
                            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                        </button>
                    </div>
                </Section>
            </Wrapper>
        </Body>
    );
}


const Rate=Styled.div`width: 45px; height: 22px; color:white; background-color:#4978ce; padding:2px; text-align: center; line-height:22px; display:inline;`;


const Img=Styled.img`width:100%; height: 180px;`;

function Item() {
    return(
        <div>
            <Img src="https://source.unsplash.com/featured/?mountain" alt="산"/>
            여행지 이름 <br/>
            <Rate>4.5</Rate> <p style={{display:"inline", fontSize:'12px', color:'#909090'}}>리뷰 10000개</p>
        </div>
    );
}

function RowAndColumnSpacing() {
    return (
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Item> 1 </Item>
          </Grid>
          <Grid item xs={4}>
            <Item> 2 </Item>
          </Grid>
          <Grid item xs={4}>
            <Item> 3 </Item>
          </Grid>
          <Grid item xs={4}>
            <Item> 4 </Item>
          </Grid>
          <Grid item xs={4}>
            <Item> 5 </Item>
          </Grid>
          <Grid item xs={4}>
            <Item> 6 </Item>
          </Grid>
          <Grid item xs={4}>
            <Item> 7 </Item>
          </Grid>
        </Grid>
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