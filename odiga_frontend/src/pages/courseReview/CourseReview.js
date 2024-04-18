import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseReviewBoard from "./CourseReviewBoard";
import CourseReviewDetail from "./CourseReviewDetail";

function CourseReview() {
  return (
      <Routes>
          <Route path="/"  element={<CourseReviewBoard />} />
          <Route path="/detail"  element={<CourseReviewDetail />} />
      </Routes>
  );
}

export default CourseReview;
