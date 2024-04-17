import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import BoardList from "./pages/boardList/BoardList";
import SignUp from "./pages/sign-up/SignUp";
import TravelDetailPage from "./pages/traveldetailpage/TravelDetailPage";
import ResultList from "./pages/result-list/ResultList";
import ChoosePreference from "./pages/choosePreference/ChoosePage";
import MypageMain from "./pages/mypage/MypageMain";
import CourseReview from "./pages/courseReview/CourseReview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/sign-up" element={<SignUp />}></Route>
          <Route exact path="/board-list" element={<BoardList />}></Route>
          <Route exact path="/detail" element={<TravelDetailPage />}></Route>
          <Route exact path="/result-list" element={<ResultList />}></Route>
          <Route exact path="/preference" element={<ChoosePreference />}></Route>
          <Route exact path="/mypage/*" element={<MypageMain />}></Route>
          <Route exact path="/coursereview/*"  element={<CourseReview />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
