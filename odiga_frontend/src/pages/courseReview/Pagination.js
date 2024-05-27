import React from "react";

const Pagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  const lastNum = currentPage - Math.round(currentPage % 5.1) + 5;
  const firstNum = currentPage - Math.round(currentPage % 5.1) + 1;

  if (Math.ceil(totalPosts / postsPerPage) <= lastNum) {
    // 현재 페이지가 마지막 페이지 그룹에 속할 때
    for (let i = firstNum; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  } else {
    // 현재 페이지가 중간에 있는 경우
    for (let i = firstNum; i <= lastNum; i++) {
      pageNumbers.push(i);
    }
  }

  const nextPageGroup = () => {
    if (lastNum < Math.ceil(totalPosts / postsPerPage)) {
      setCurrentPage(lastNum + 1);
    }
  };

  const prevPageGroup = () => {
    if (firstNum > 1) {
      setCurrentPage(firstNum - 5);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "50px auto",
        paddingBottom : "50px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{ margin: "1px", marginLeft:"10px" }}
          className="btn btn-primary"
          onClick={prevPageGroup}
          disabled={firstNum <= 1}
        >
          &lt;
        </button>
        {pageNumbers.map((number) => (
          <button
            style={{ margin: "1px" }}
            className="btn btn-primary"
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          style={{ margin: "1px" }}
          className="btn btn-primary"
          onClick={nextPageGroup}
          disabled={lastNum >= Math.ceil(totalPosts / postsPerPage)}
        >
          &gt;
        </button>
        <div
          style={{
            textAlign: "right",
            marginLeft: "auto", // 왼쪽 여백을 최대한 늘려서 오른쪽에 정렬
          }}
        >
          <a
            href="/courseimport"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "18px",
              fontFamily: "GmarketSansMedium",
              display: "inline-block",
              padding : "10px",
              marginRight: "10px"
            }}
            className="btn btn-primary"
          >
            글쓰기
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
