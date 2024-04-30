import React from 'react';
import styled from 'styled-components';
import {useDrag} from 'react-dnd';
import './cPP.css';

const places = [
  {
      id : 1,
      pic : "https://source.unsplash.com/featured/?mountain",
      name: "대구산",
      region: "대구시 중구",
      rate: "4.0",
      review: "10000개"
  },
  {
      id : 2,
      pic : "https://source.unsplash.com/featured/?sunflower",
      name: "해바라기",
      region: "부산광역시 중구",
      rate: "4.5",
      review: "13300개"
  },
  {
      id : 3,
      pic : "https://source.unsplash.com/featured/?fire",
      name: "산불",
      region: "대구시 중구",
      rate: "4.2",
      review: "10500개"
  },
  {
      id : 4,
      pic : "https://source.unsplash.com/featured/?cat",
      name: "충주시 산",
      region: "충청북도 충주시",
      rate: "4.5",
      review: "10060개"
  },
  {
      id : 5,
      pic : "https://source.unsplash.com/featured/?flower",
      name: "꽃밭",
      region: "대구시 달서구",
      rate: "4.5",
      review: "20000개"
  },
  {
      id : 6,
      pic : "https://source.unsplash.com/featured/?activity",
      name: "서울 산",
      region: "서울특별시 중구",
      rate: "4.5",
      review: "10300개"
  },
  {
      id : 7,
      pic : "https://source.unsplash.com/featured/?beach",
      name: "강원도 산",
      region: "강원도",
      rate: "4.5",
      review: "20개"
  },
  {
      id : 8,
      pic : "https://source.unsplash.com/featured/?meseum",
      name: "산산",
      region: "대구시 중구",
      rate: "4.5",
      review: "24개"
  },
  {   id : 9,
      pic : "https://source.unsplash.com/featured/?mountain",
      name: "산산2",
      region: "대구시 중구",
      rate: "4.0",
      review: "10000개"
  },
  {
      id : 10,
      pic : "https://source.unsplash.com/featured/?sunflower",
      name: "해바라기",
      region: "부산광역시 중구",
      rate: "4.5",
      review: "13300개"
  },
]

const DrawerContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1000;
    transition: transform 0.3s ease-in-out;
    transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
`;

const DrawerContent = styled.div`
  padding: 20px;
`;
const steamGames = [
    'Counter-Strike: Global Offensive',
    'Dota 2',
    'Team Fortress 2',
    'PUBG',
    'Among Us',
    'Rocket League',
    'Apex Legends',
    'Fortnite',
  ];

const Drawer = ({ isOpen, onClose, ref }) => {
  return (
    <DrawerContainer isopen={isOpen} ref={ref}>
      <DrawerContent>
        {/* <ul>
            {steamGames.map((game, index) => (
                <li key={index}>{game}</li>
            ))}
        </ul> */}
        <div className="drawer">
          {places.map(item => ( <Place key={item.id} id={item.id} pic={item.pic} name={item.name} region={item.region}/> ))}
        </div>
        <button className="buttondesign" onClick={onClose}>Close</button>
      </DrawerContent>
    </DrawerContainer>
  );
};

const Place = ({id,pic,name,region }) =>{ //개별 플레이스 drag 가능~

  const[{ isDragging },drag] = useDrag({
      type: 'placeitem',
      item: { id, name, region },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
  });

  const opacity = isDragging ? 0 : 1;

  return(
      <div key={id} className={`drawer-item ${opacity ? '' : 'dragging'}`} ref={drag}> 
          <img src={pic} />
          <span>{name} | {region} </span>
      </div>
  )
}

export default Drawer;
