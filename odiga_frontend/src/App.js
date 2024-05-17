import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {BrowserRouter as Router} from 'react-router-dom';
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
import PlaceList from "./pages/placeList/placeList";

function App() {

    // 페이지 이동시 로그인 정보 삭제 => 추후 수정
    // useEffect(() => {
    //     const handleUnload = () => {
    //         localStorage.clear();
    //
    //         // 쿠키 삭제 (참고용으로 작성한 것이며, 실제로는 브라우저에서 쿠키를 삭제하는 방법이 다를 수 있습니다)
    //         document.cookie.split(";").forEach((c) => {
    //             document.cookie = c
    //                 .replace(/^ +/, "")
    //                 .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    //         });
    //     };
    //
    //     window.addEventListener('unload', handleUnload);
    //
    //     return () => {
    //         window.removeEventListener('unload', handleUnload);
    //     };
    // }, []);


    return (
        <BrowserRouter>
            {/*<Header />*/}
            <Routes>
                {/* 로그인 x */}
                <Route>
                    <Route exact path="/" element={<Main/>}/>
                    {/*<Route path="/detail/:contentID" element={<TravelDetailPage/>}/>*/}
                    <Route exact path="/preference" element={<ChoosePreference/>}/>
                    <Route exact path="/coursereview/*" element={<CourseReview/>}/>
                    <Route exact path="/SearchPage" element={<SearchPage/>}/>
                    <Route exact path="/wrongpath/:nextPath" element={<WrongPathPage/>}/>

                    <Route exact path="/place/show" element={<PlaceList/>}></Route>
                </Route>


                {/* 로그인 o */}
                <Route path="/my-page/*" element={
                    <LoginInfoProvider> {/* LoginInfoProvider를 MypageMain 컴포넌트의 상위에 배치 */}
                        <MypageMain/>
                    </LoginInfoProvider>
                }/>
                   <Route path="/courseimport" element={
                    <LoginInfoProvider> {/* LoginInfoProvider를 MypageMain 컴포넌트의 상위에 배치 */}
                        <CourseImport/>
                    </LoginInfoProvider>
                }/>
                <Route path="/login" element={
                    <LoginInfoProvider> {/* LoginInfoProvider를 MypageMain 컴포넌트의 상위에 배치 */}
                        <Login/>
                    </LoginInfoProvider>
                }/>
                <Route path="/sign-up" element={
                    <LoginInfoProvider> {/* LoginInfoProvider를 MypageMain 컴포넌트의 상위에 배치 */}
                        <SignUp/>
                    </LoginInfoProvider>
                }/>
                <Route path="/detail/:contentID" element={
                    <LoginInfoProvider> {/* LoginInfoProvider를 MypageMain 컴포넌트의 상위에 배치 */}
                        <TravelDetailPage/>
                    </LoginInfoProvider>
                }/>
                {/* 로그인 o / 로그인 x / 코스 생성자 3가지 경우의 수 // LoginInfoProvider 지우기 X*/}
                <Route path="/result-list/:nickname/:courseNo" element={
                    <LoginInfoProvider>
                        <ResultView/>
                    </LoginInfoProvider>
                }/>
                <Route exact path="/place" element={
                    <LoginInfoProvider>
                        <ChoosePlace/>
                    </LoginInfoProvider>
                }></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;