import styled from 'styled-components';

const Place = ({
    boardGrade,
    boardTitle,
    boardViewCount,
    nickname,
    mainImage, // 이 객체는 다양한 해상도의 이미지 URL을 포함한다고 가정
  }) => {
    return (
      <div className="grid-item">
        {mainImage ? (
          <img 
            src={mainImage}
            alt="Image"
          />
        ) : (
          <img
            style={{ objectFit: "scale-down", display: "block" }}
            src="https://img.icons8.com/?size=512&id=j1UxMbqzPi7n&format=png"
            alt="Default Image"
          />
        )}
        {boardTitle} <P>| {nickname}</P>
        <br />
        <Rate>
          {boardGrade !== undefined && boardGrade !== null
            ? boardGrade.toFixed(1)
            : "평가 없음"}
        </Rate>{" "}
        <P>{boardViewCount}</P>
      </div>
    );
  };
  

  export default Place;

  const Rate = styled.div`
  width: 45px;
  height: 22px;
  color: white;
  background-color: #4978ce;
  padding: 2px;
  text-align: center;
  line-height: 22px;
  display: inline;
`;

const P = styled.div`
  display: inline;
  font-size: 10px;
  color: #909090;
`;
