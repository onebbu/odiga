import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import BoardList from "./pages/boardList/BoardList";


function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route exact path="/" element={<Main />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/board-list" element={<BoardList />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;