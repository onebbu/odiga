const Pagination = ({
    currentPage,
    postsPerPage,
    totalPosts,
    setCurrentPage,
  }) => {
    const pageNumbers = [];
    const lastNum = currentPage - Math.round((currentPage % 5.1)) + 5;
    const firstNum = currentPage - Math.round((currentPage % 5.1)) + 1;
  
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

    console.log(currentPage);
  
    return (
      <>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "50px auto",
            display: "inline-block",
          }}
        >
          <button
            style={{margin: "1px" }}
            className="btn btn-primary"
            onClick={prevPageGroup}
            disabled={firstNum <= 1}
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              style={{margin: "1px" }}
              className="btn btn-primary"
              key={number}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            style={{margin: "1px" }}
            className="btn btn-primary"
            onClick={nextPageGroup}
            disabled={lastNum >= Math.ceil(totalPosts / postsPerPage)}
          >
            &gt;
          </button>
        </div>
      </>
    );
  };
  
  export default Pagination;
  