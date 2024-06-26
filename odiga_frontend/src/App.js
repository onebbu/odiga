import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import TravelDetailPage from "./pages/traveldetailpage/TravelDetailPage";
import ChoosePreference from './pages/choosePreference/ChoosePage';
import CourseImport from './pages/courseimport/CourseImport';
import MypageMain from "./pages/mypage/MypageMain";
import CourseReview from "./pages/courseReview/CourseReview";
import Main from "./pages/main/Main";
import ResultView from "./pages/result-list/ResultView";
import WrongPathPage from "./pages/wrongpathPage/WrongPath";
import ChoosePlace from "./pages/choosePlace/choosePlacePage";
import LoginInfoProvider from "./pages/login/LoginInfoProvider";
import PlaceList from "./pages/placeList/placeList";
import Header from "./pages/component/navbar/Header.js";
import Footer from "./pages/component/footer/Footer";
import SearchLocation from "./pages/SearchPage/SearchLocation";


function App() {

    return (
        <BrowserRouter>

            <LoginInfoProvider>
                <Header/>

                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route exact path="/preference" element={<ChoosePreference/>}/>
                    <Route exact path="/courseimport" element={<CourseImport/>}/>
                    <Route exact path="/search-location/:areacodeUrl" element={<SearchLocation/>}/>
                    <Route exact path="/wrongpath/:nextPath" element={<WrongPathPage/>}/>
                    <Route exact path="/placeList/show" element={<PlaceList/>}></Route>
                    <Route path="/my-page/*" element={<MypageMain/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/detail/:contentID" element={<TravelDetailPage/>}/>
                    <Route path="/coursereview/*" element={<CourseReview/>}/>
                    <Route path="/place" element={<ChoosePlace/>}></Route>

                    {/* 로그인 o / 로그인 x / 코스 생성자 3가지 경우의 수 // LoginInfoProvider 지우기 X*/}
                    <Route path="/result-list/:nickname/:courseNo" element={<ResultView/>}/>

                </Routes>
            </LoginInfoProvider>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
