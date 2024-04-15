import React from "react";
import Styled from "styled-components";
const places = [
    {
        pic : "https://source.unsplash.com/featured/?mountain",
        name: "산",
        region: "대구시 중구",
        rate: "4.0",
        review: "10000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?sunflower",
        name: "해바라기",
        region: "부산광역시 중구",
        rate: "4.5",
        review: "13300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?fire",
        name: "산불",
        region: "대구시 중구",
        rate: "4.2",
        review: "10500개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "충청북도 충주시",
        rate: "4.5",
        review: "10060개"
    },
    {
        pic : "https://source.unsplash.com/featured/?flower",
        name: "꽃밭",
        region: "대구시 달서구",
        rate: "4.5",
        review: "20000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?activity",
        name: "산",
        region: "서울특별시 중구",
        rate: "4.5",
        review: "10300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?beach",
        name: "산",
        region: "강원도",
        rate: "4.5",
        review: "20개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "대구시 중구",
        rate: "4.5",
        review: "24개"
    },{
        pic : "https://source.unsplash.com/featured/?mountain",
        name: "산",
        region: "대구시 중구",
        rate: "4.0",
        review: "10000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?sunflower",
        name: "해바라기",
        region: "부산광역시 중구",
        rate: "4.5",
        review: "13300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?fire",
        name: "산불",
        region: "대구시 중구",
        rate: "4.2",
        review: "10500개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "충청북도 충주시",
        rate: "4.5",
        review: "10060개"
    },
    {
        pic : "https://source.unsplash.com/featured/?flower",
        name: "꽃밭",
        region: "대구시 달서구",
        rate: "4.5",
        review: "20000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?activity",
        name: "산",
        region: "서울특별시 중구",
        rate: "4.5",
        review: "10300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?beach",
        name: "산",
        region: "강원도",
        rate: "4.5",
        review: "20개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "대구시 중구",
        rate: "4.5",
        review: "24개"
    },
    {
        pic : "https://source.unsplash.com/featured/?mountain",
        name: "산",
        region: "대구시 중구",
        rate: "4.0",
        review: "10000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?sunflower",
        name: "해바라기",
        region: "부산광역시 중구",
        rate: "4.5",
        review: "13300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?fire",
        name: "산불",
        region: "대구시 중구",
        rate: "4.2",
        review: "10500개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "충청북도 충주시",
        rate: "4.5",
        review: "10060개"
    },
    {
        pic : "https://source.unsplash.com/featured/?flower",
        name: "꽃밭",
        region: "대구시 달서구",
        rate: "4.5",
        review: "20000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?activity",
        name: "산",
        region: "서울특별시 중구",
        rate: "4.5",
        review: "10300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?beach",
        name: "산",
        region: "강원도",
        rate: "4.5",
        review: "20개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "대구시 중구",
        rate: "4.5",
        review: "24개"
    },
    {
        pic : "https://source.unsplash.com/featured/?mountain",
        name: "산",
        region: "대구시 중구",
        rate: "4.0",
        review: "10000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?sunflower",
        name: "해바라기",
        region: "부산광역시 중구",
        rate: "4.5",
        review: "13300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?fire",
        name: "산불",
        region: "대구시 중구",
        rate: "4.2",
        review: "10500개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "충청북도 충주시",
        rate: "4.5",
        review: "10060개"
    },
    {
        pic : "https://source.unsplash.com/featured/?flower",
        name: "꽃밭",
        region: "대구시 달서구",
        rate: "4.5",
        review: "20000개"
    },
    {
        pic : "https://source.unsplash.com/featured/?activity",
        name: "산",
        region: "서울특별시 중구",
        rate: "4.5",
        review: "10300개"
    },
    {
        pic : "https://source.unsplash.com/featured/?beach",
        name: "산",
        region: "강원도",
        rate: "4.5",
        review: "20개"
    },
    {
        pic : "https://source.unsplash.com/featured/?meseum",
        name: "산",
        region: "대구시 중구",
        rate: "4.5",
        review: "24개"
    },


];

const Rate=Styled.div`width: 45px; height: 22px; color:white; background-color:#4978ce; padding:2px; text-align: center; line-height:22px; display:inline;`;
const Img=Styled.img`width:100%; height: 180px;`;
const P=Styled.div`display:inline; font-size:10px; color:#909090;`;
function Item() {
    const showPlace = (places).slice(0, 8);

    return (
        <>
        <div style={{
            padding: "5px",
            display: "grid",
            gridTemplateRows: "1fr ",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridGap: "20px",

          }}>
            {showPlace.map((place) =>{
                return(
                    <div className="grid-item">
                        <Img src={place.pic}/>
                        {place.name} <P>| {place.region}</P><br/>
                        <Rate>{place.rate}</Rate> <P>{place.review}</P>
                    </div>
                )
            })}
        </div>


        
        </>

    )

}

export default Item;