import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import './PL.css';

const Rate = styled.div`width: 80px; height: 22px; color:white; background-color:#00429b; padding:2px; text-align: center;display:inline;
                        border-radius: 20px 0 20px 20px;
                        padding: 4px 5px 2px 5px;
                        p { display:inline; font-size:10px;
                            color: #80a1cd;
                        } `;
const P=styled.div`display:inline; font-size:10px; color:#909090;`;

const Place = ({id, pic, name, region, averageRate, cntRating}) =>{ 
    return(
    <div key={id} className="grid-item"> 
            {/* traveldetailpage 링크 */}
            <a href={`/detail/${id}`}> 
                <img src={pic} />
            </a>
                {name} <P> <br/>{region}</P><br/>
                <Rate>{averageRate}</Rate> <P>/{cntRating}개</P>
        </div>
    )
}

function ListPlace({order}) {
    const [dataList, setDataList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [displayStart, setDisplayStart] = useState(1);
    
    const fetchList = () => {

            axios.get(`/api/place/${displayStart}/${order}`
            ).then((response) => {
                    const newData = response.data || [];
                    setDataList((prevDataList) => {
                        return displayStart === 1 ? newData : [...prevDataList, ...newData];
                    });
                    setIsLoading(false);
                    console.log("fetchList 완료  displayStart " + displayStart);
                })
                .catch((error) => {
                    console.log("displaySTart === " + displayStart);
                    console.error('Error fetching data:', error);
                    setIsLoading(true);
            });
    };
    
    const handleShowMore = () => {
        setDisplayStart(prevDisplayStart => prevDisplayStart + 16);
    };

    useEffect(() => {     
        setDisplayStart(1); // order 값이 변경되면 displayStart를 1로 설정
    }, [order]);

    useEffect(() => {
        setIsLoading(false); //displayStart는 값이 변해도 IsLoading 실행 XX
    }, [displayStart]);

    useEffect(()=>{
        fetchList();
    },[order, displayStart])

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