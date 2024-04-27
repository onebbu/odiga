import Header from "../tiles/Header";
import * as React from "react";
import ResultList from "./ResultList";

// http://localhost:3000/result-list
export default function ResultView() {
    // 요기서 로딩중 메세지?
    return (
        <div>
            <Header />
            <ResultList />
        </div>
    );
}