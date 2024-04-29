import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import TravelDetailPage from "./pages/traveldetailpage/TravelDetailPage";
import ChoosePreference from './pages/choosePreference/ChoosePage';
import ChoosePlace from './pages/choosePlace/choosePlacePage';
import CourseImport from './pages/courseimport/CourseImport';
import MypageMain from "./pages/mypage/MypageMain";
import CourseReview from "./pages/courseReview/CourseReview";
import Main from "./pages/main/Main";
import ResultView from "./pages/result-list/ResultView";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route exact path="/" element={<Main />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/sign-up" element={<SignUp />}></Route>
                    <Route exact path="/detail" element={<TravelDetailPage />}></Route>
                    <Route exact path="/result-list/:id" element={<ResultView />}></Route>
                    <Route exact path="/preference" element={<ChoosePreference />}></Route>
                    <Route exact path="/place" element={<ChoosePlace />}></Route>
                    <Route exact path="/courseimport" element={<CourseImport />}></Route>
                    <Route exact path="/mypage/*" element={<MypageMain />}></Route>
                    <Route exact path="/coursereview/*"  element={<CourseReview />}></Route>
                    <Route exact path="/SearchPage"  element={<SearchPage />}></Route>

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;