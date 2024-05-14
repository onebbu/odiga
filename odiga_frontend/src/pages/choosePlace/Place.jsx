import React, {useState, useEffect} from "react";
import Styled from "styled-components";
import {useDrag} from 'react-dnd';
import axios from "axios";
import './cPP.css';

//const region_url = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=eTvi0rTQ1PoHjUzFGNoNUjpVx%2BMk6y8Hs%2FyH4JzAlRk5Ag7c5rqIcBWoLWuG%2BJoHzywuB1cVkEHiZZFuhDYbhA%3D%3D&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;

const Rate=Styled.div`width: 45px; height: 22px; color:white; background-color:#4978ce; padding:2px; text-align: center; line-height:22px; display:inline;`;
const P=Styled.div`display:inline; font-size:10px; color:#909090;`;

const Place = ({id,pic,name,region}) =>{ //개별 플레이스 drag 가능~
    const [avgrate, setAvgrate] = useState(0); // 여행지 평균 별점
    const [cntrate, setCntrate] = useState(0); // 여행지 리뷰 개수
    
    useEffect(() => {
          // 백엔드 API 호출
          axios.get(`/placerate/${id}`)
            .then((response) => {
              response.data.averageRate !== null ? setAvgrate(response.data.averageRate) : setAvgrate('빵점');
              response.data.cntRating !== null ? setCntrate(response.data.cntRating) : setCntrate(0);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });

    }, [id]);

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
            {name} <P> <br/>{region}</P><br/>
            <Rate>{avgrate}</Rate> <P>/{cntrate}개</P>
        </div>
    )
}

function ListPlace({areacode, order}) {
    const [dataList, setDataList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [displayStart, setDisplayStart] = useState(0);
    
    const handleShowMore = () => {
        if (displayStart == 0)
            { setDisplayStart(1); } // 처음 불러올 때
        else if(displayStart != 0)
            { setDisplayStart((prevCount) => prevCount + 8); } // 두번째 불러올 때
        fetchList(); // 추가 데이터를 가져오도록 fetchList 호출
    };
    
    const fetchList = () => {
          // 백엔드 API 호출
        axios.get(`/place/${areacode}/${displayStart}/${order}`)
            .then((response) => {
                    console.log('Data received:', response.data);
                    setDataList((prevDataList) => {
                        return prevDataList ? [...prevDataList, ...response.data] : response.data;
                    });
              setIsLoading(false);
            })
            .catch((error) => {
                console.log("displaySTart === " + displayStart);
              console.error('Error fetching data:', error);
              
              setIsLoading(true);
        });
        
    };
    
    useEffect(() => {
        fetchList(); //초기에 한 번 데이터를 가져옴.
    }, [areacode, order]);

    useEffect(() => { //order 가 바뀌면 재로딩~~
        setIsLoading(true);  //로딩화면으로 한 번 돌렸다가.
        fetchList();
    },[order])

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
                        <Place key={data.contentid} id={data.contentid} pic={data.firstimage} name={data.title} region={data.addr1}/>
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