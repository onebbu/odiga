import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import BoardList from "./pages/boardList/BoardList";
import SignUp from "./pages/sign-up/SignUp";
import TravelDetailPage from './pages/traveldetailpage/TravelDetailPage';
import Test from './pages/traveldetailpage/Test';


function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route exact path="/" element={<Main />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/sign-up" element={<SignUp />}></Route>
                    <Route exact path="/board-list" element={<BoardList />}></Route>
                    <Route exact path="/detail" element={<TravelDetailPage />}></Route>
                    <Route exact path="/test" element={<Test />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;