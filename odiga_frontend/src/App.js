import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
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
import SearchPage from "./pages/SearchPage/SearchPage";
import ChoosePlace from "./pages/choosePlace/choosePlacePage";
import LoginInfoProvider from "./pages/login/LoginInfoProvider";

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    {/* 로그인 x */}
                    <Route>
                        <Route exact path="/" element={<Main/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/sign-up" element={<SignUp/>}/>
                        <Route path="/detail/:contentID" element={<TravelDetailPage />} />
                        <Route exact path="/preference" element={<ChoosePreference/>}/>
                        <Route exact path="/courseimport" element={<CourseImport/>}/>
                        <Route exact path="/coursereview/*" element={<CourseReview/>}/>
                        <Route exact path="/SearchPage" element={<SearchPage/>}/>
                        <Route exact path="/wrongpath/:nextPath" element={<WrongPathPage/>}/>
                        <Route exact path="/place" element={<ChoosePlace />}></Route>
                    </Route>


                    {/* 로그인 o */}
                    <Route path="/my-page/*" element={
                        <LoginInfoProvider> {/* LoginInfoProvider를 MypageMain 컴포넌트의 상위에 배치 */}
                            <MypageMain/>
                        </LoginInfoProvider>
                    }/>
                    <Route path="/result-list/:nickname/:courseNo" element={
                        <LoginInfoProvider>
                            <ResultView/>
                        </LoginInfoProvider>
                    }/>

                </Routes>
            </BrowserRouter>
    );
}

export default App;