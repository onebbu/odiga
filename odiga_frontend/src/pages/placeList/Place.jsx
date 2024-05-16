import React, {useState, useEffect} from "react";
import Styled from "styled-components";
import axios from "axios";
import './PL.css';

const Rate=Styled.div`width: 45px; height: 22px; color:white; background-color:#4978ce; padding:2px; text-align: center; line-height:22px; display:inline;`;
const P=Styled.div`display:inline; font-size:10px; color:#909090;`;

const Place = ({id,pic,name,region}) =>{ 
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

    return(
        <div key={id}> 
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
    const [displayCount, setDisplayCount] = useState(8);
    
    const handleShowMore = () => {
        setDisplayCount((prevCount) => prevCount + 8);
    };
    
    const fetchList = () => {
        setIsLoading(true);
          // 백엔드 API 호출
        axios.get(`/place/${areacode}/${displayCount}/${order}`)
            .then((response) => {
                    console.log('Data received:', response.data);
                    setDataList((prevDataList) => {
                        return prevDataList ? [...prevDataList, ...response.data] : response.data;
                    });
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              setIsLoading(false);
        });
        
    };
    
    useEffect(() => {
        fetchList();
    }, [areacode, order, displayCount]);

    return (
        <div>
            {isLoading ? ( <><p>Loading....</p> <button onClick={fetchList}>다시 시도</button></> ) : (
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
            )}
            {displayCount < 100 && ( // 100개 이상은 안보여줌.
                <button className="buttondesign" onClick={handleShowMore}>More</button>
            )}
        </div>
    )
}

export default ListPlace;