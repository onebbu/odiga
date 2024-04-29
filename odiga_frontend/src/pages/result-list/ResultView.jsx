import * as React from 'react';
import "./ResultList.css";
import Header from "../tiles/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import NaverMapView from "./naver-map/NaverMapView";
import ResultList from "./ResultList";
import "./ResultView.css"
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from "react-router-dom";


// http://localhost:3000/result-list/odiga_3
export default function ResultView() {
    const [data, setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`/courseId/${id}`);
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
            }
        }

        fetchData();

        // cleanup 함수에서 completed 변수 제거
        return () => {
            setData(""); // 컴포넌트가 unmount될 때 data 초기화
        };
    }, []);
    return (
        <>
            <Header/>
            <div className="wrapper">
                {loading ? (
                    <div className="loading-wrap">
                        <div className="loading">
                            <Spinner animation="border" style={{width: '3rem', height:'3rem'}}/>
                        </div>
                        <br />
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    <>
                        <div className="result-wrap"><ResultList data={data}/></div>
                        <div className="result-map"><NaverMapView data={data}/></div>
                    </>
                )}
            </div>
        </>
    );
}