import React from "react";
import Styled from "styled-components";
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
    {
        id : 11,
        pic : "https://source.unsplash.com/featured/?fire",
        name: "산불",
        region: "대구시 중구",
        rate: "4.2",
        review: "10500개"
    },
    {
        id : 12,
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "충청북도 충주시",
        rate: "4.5",
        review: "10060개"
    },
    {
        id : 13,
        pic : "https://source.unsplash.com/featured/?flower",
        name: "꽃밭",
        region: "대구시 달서구",
        rate: "4.5",
        review: "20000개"
    },
    {
        id : 14,
        pic : "https://source.unsplash.com/featured/?activity",
        name: "산",
        region: "서울특별시 중구",
        rate: "4.5",
        review: "10300개"
    },
    {
        id : 15,
        pic : "https://source.unsplash.com/featured/?beach",
        name: "산",
        region: "강원도",
        rate: "4.5",
        review: "20개"
    },
    {
        id : 16,
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "대구시 중구",
        rate: "4.5",
        review: "24개"
    },
    {
        id : 17,
        pic : "https://source.unsplash.com/featured/?mountain",
        name: "산",
        region: "대구시 중구",
        rate: "4.0",
        review: "10000개"
    },
    {
        id : 18,
        pic : "https://source.unsplash.com/featured/?sunflower",
        name: "해바라기",
        region: "부산광역시 중구",
        rate: "4.5",
        review: "13300개"
    },
    {
        id : 19,
        pic : "https://source.unsplash.com/featured/?fire",
        name: "산불",
        region: "대구시 중구",
        rate: "4.2",
        review: "10500개"
    },
    {
        id : 20,
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "충청북도 충주시",
        rate: "4.5",
        review: "10060개"
    },
    {
        id : 21,
        pic : "https://source.unsplash.com/featured/?flower",
        name: "꽃밭",
        region: "대구시 달서구",
        rate: "4.5",
        review: "20000개"
    },
    {
        id : 22,
        pic : "https://source.unsplash.com/featured/?activity",
        name: "산",
        region: "서울특별시 중구",
        rate: "4.5",
        review: "10300개"
    }
];

const Rate=Styled.div`width: 45px; height: 22px; color:white; background-color:#4978ce; padding:2px; text-align: center; line-height:22px; display:inline;`;
const P=Styled.div`display:inline; font-size:10px; color:#909090;`;

const Place = ({id,pic,name,region,rate,review}) =>{ //개별 플레이스 drag 가능~

    const[{ isDragging },drag] = useDrag({
        type: 'placeitem',
        item: () => {
            return {
                name : name,
                region : region, }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        
    });
    const opacity = isDragging ? 0 : 1
    return(
        <div className={`grid-item ${opacity ? '' : 'dragging'}`} ref={drag}>
            <img src={pic}/>
            {name} <P>| {region}</P><br/>
            <Rate>{rate}</Rate> <P>{review}</P>
        </div>
    )
}

function ListPlace() {
    const showPlace = (places).slice(0, 8);
    return (
        <div style={{
            padding: "5px",
            display: "grid",
            gridTemplateRows: "1fr ",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridGap: "20px",
          }}>
            {showPlace.map(item => ( <Place key={item.id} pic={item.pic} name={item.name} region={item.region} rate={item.rate} review={item.review}/> ))}
        </div>


    )

}

export default ListPlace;