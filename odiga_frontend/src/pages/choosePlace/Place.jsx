import React, {useState, useEffect} from "react";
import Styled from "styled-components";
import {useDrag} from 'react-dnd';
import axios from "axios";
import './cPP.css';

//const region_url = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=eTvi0rTQ1PoHjUzFGNoNUjpVx%2BMk6y8Hs%2FyH4JzAlRk5Ag7c5rqIcBWoLWuG%2BJoHzywuB1cVkEHiZZFuhDYbhA%3D%3D&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;

const Rate=Styled.div`width: 45px; height: 22px; color:white; background-color:#4978ce; padding:2px; text-align: center; line-height:22px; display:inline;`;
const P=Styled.div`display:inline; font-size:10px; color:#909090;`;
// 카테고리 텍스트에 따라 배경색과 폰트색을 매핑하는 객체
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

const Place = ({id,pic,name,region,cat, averageRate, cntRating}) =>{ //개별 플레이스 drag 가능~

    // 해당 카테고리의 배경색과 폰트색 가져오기
    const {backgroundColor, color } = catColors[cat] || {
        backgroundColor: 'gray',
        color: 'black',
        fontFamily: "GmarketSansMedium"
    };

    const[{ isDragging },drag] = useDrag({
        type: 'placeitem',
        item: { id, name, region },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    return(
        <div key={id} className={`grid-item ${opacity ? '' : 'dragging'}`} ref={drag}> 
        {/* traveldetailpage 링크 */}
        <a href={`/detail/${id}`}> 
            <img src={pic} />
        </a>
            {name} <strong style={{
                backgroundColor, color,
                fontSize: '75%', fontFamily: "GmarketSansMedium",
                fontWeight: '300',
                padding: '0.25em 0.5em', borderRadius: "8px",
                textAlign:'right'
            }}>{cat}</strong>
            <P> <br/>{region}</P><br/>
            <Rate>{averageRate}</Rate> <P>/{cntRating}개</P>
        </div>
    )
}

function ListPlace({areacode, order, theme}) {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [displayStart, setDisplayStart] = useState(1);
    const fetchList = () => {
        if (areacode !== null){
            axios.get(`/place/${displayStart}/${order}`, {
                params: {
                    areacode : areacode,
                    theme: theme.join(',') //displayStart,order는 PathVariable로 넘기고 areacode,theme는 param으로 넘기려구용 ㅎㅎ
                }
            }).then((response) => {
                    const newData = response.data || [];
                    setDataList((prevDataList) => {
                        return displayStart === 1 ? newData : [...prevDataList, ...newData];
                    });
                    setIsLoading(false);
                    console.log("fetchList 완료  displaySTart === " + displayStart);
                })
                .catch((error) => {
                    console.log("displaySTart === " + displayStart);
                    console.error('Error fetching data:', error);
                    setIsLoading(true);
            });
        } else {
            setIsLoading(true);
        }
    };
    
    const handleShowMore = () => {
        setDisplayStart(prevDisplayStart => prevDisplayStart + 8);
    };

    useEffect(() => {     
        setDisplayStart(1); // order 값이 변경되면 displayStart를 1로 설정
    }, [order]);

    useEffect(() => {
        setIsLoading(false); //displayStart는 값이 변해도 IsLoading 실행 XX
    }, [displayStart]);

    useEffect(() => {
        fetchList();
    }, [areacode, order, displayStart]); 
    
    return (
        <div>
            {isLoading ? ( <><p>Loading....</p> <button onClick={fetchList}>다시 시도</button><br/><br/></> ) : (
                <>
                <div style={{
                    padding: "10px",
                    display: "grid",
                    gridTemplateRows: "1fr ",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gridGap: "30px",
                }}>
                    {dataList && dataList.map((data) => ( 
                        <Place key={data.contentid} 
                                id={data.contentid} 
                                pic={data.firstimage} 
                                name={data.title} 
                                region={data.addr1}
                                cat={data.cat3}
                                averageRate={data.averageRate}
                                cntRating={data.cntRating} />
                    ))}
                </div>
                <div>
                    {dataList && dataList.length < 100 && ( // 100개 이상은 안보여줌.
                        <button className="buttondesign" onClick={handleShowMore}>More</button>
                    )}
                </div>
                </>
            )}
        </div>
    )
}

export default ListPlace;