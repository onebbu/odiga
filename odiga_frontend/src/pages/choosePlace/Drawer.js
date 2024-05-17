import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import {useDrag} from 'react-dnd';
import axios from "axios";
import './cPP.css';

const DrawerContainer = styled.div`
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1000;
    transition: transform 0.3s ease-in-out;
    transform: translateY(${(props) => (props.isOpen ? '0' : '-100%')});
`;

const DrawerContent = styled.div`
  padding: 20px;
`;

const H2 = styled.div`
  color:#909090;
  font-size: 25px;
  font-family: 'JalnanGothic';
  padding-bottom : 5px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;

const Drawer = ({ isOpen, onClose, loginInfo, areacode }) => {
  const [likeInfo, setLikeInfo] = useState([]);
  
  useEffect(() => {
        fetchData(); // 함수 호출
        console.log("likeInfo 길이길이길이 "+likeInfo);

  }, [isOpen]);

  const fetchData = () => {
    try {
      console.log("왜 안되냐? ? " + areacode);
        axios.get(`/mypage/mylike/${loginInfo.nickname}`, {
          params: {
            areacode: areacode
          }
        }).then(response => {
          setLikeInfo(response.data);
          console.log("likeInfo 저장함? "+likeInfo);
        })
        
    } catch (error) {
        console.error('좋아요 목록 가져오기 실패:', error);
    }
  };

  return (
    <DrawerContainer isOpen={isOpen}>
      <DrawerContent>
      <H2> {loginInfo.nickname} 님의 찜 목록 </H2>
      {likeInfo && Object.keys(likeInfo).length > 0 ? ( 
          <div className="drawer">
            {Object.keys(likeInfo).map((courseKey) => (
              <Place key={courseKey} id={courseKey} pic={likeInfo[courseKey].img} name={likeInfo[courseKey].title} region={likeInfo[courseKey].addr}/>
            ))}
          </div>
        ) : ( <Message> 찜 목록이 비어있습니다. </Message> )
      }
        <button className="buttondesign" onClick={onClose}>Close</button>
      </DrawerContent>
    </DrawerContainer>
  );
};

const Place = ({id, pic, name, region }) =>{ //개별 플레이스 drag 가능~
  const[{ isDragging }, drag] = useDrag({
      type: 'placeitem',
      item: { id, name, region },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
  });

  const opacity = isDragging ? 0 : 1;

  return(
      <div key={id} className={`drawer-item ${opacity ? '' : 'dragging'}`} ref={drag}> 
          <img src={pic} alt="이미지 로딩 중"/>
          <span>{name} | {region} </span>
      </div>
  )
}

export default Drawer;
