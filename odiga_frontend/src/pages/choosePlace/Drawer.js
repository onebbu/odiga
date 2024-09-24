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
    z-index: 50;
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

    const fetchData = async () => {
    try {
      const response = await axios.get(`/api/mypage/mylike/${loginInfo.nickname}`, {
        params: {
          areacode: areacode
        }
      });
      // 데이터 변환
      const data = response.data;
      const transformedData = Object.keys(data).reduce((acc, key) => {
        const item = data[key];
        acc[key] = {
            contentid: item.contentId,
            img: item.img,
            title: item.title,
            addr: item.addr
        };
        return acc;
    }, {});
    
    setLikeInfo(transformedData);
    console.log(likeInfo[0].contentid);
        
    } catch (error) {
        console.error('좋아요 목록 가져오기 실패:', error);
    }
  };
        fetchData(); // 함수 호출

  }, [isOpen]);

  

  return (
    <DrawerContainer isOpen={isOpen}>
      <DrawerContent>
      <H2> {loginInfo.nickname} 님의 찜 목록 </H2>
      {isOpen ? ( 
          <div className="drawer">
            {Object.values(likeInfo).map((data) => (
                  <Place
                      key={data.contentid}
                      id={data.contentid}
                      pic={data.img}
                      name={data.title}
                      region={data.addr} />
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
  useEffect(()=>{
    console.log("drag ID"+ id);
  },[drag])

  const opacity = isDragging ? 0 : 1;

  return(
      <div key={id} className={`drawer-item ${opacity ? '' : 'dragging'}`} ref={drag}> 
          <img src={pic} alt="이미지 로딩 중"/>
          <span>{name} | {region} </span>
      </div>
  )
}

export default Drawer;
