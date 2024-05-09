import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


function carousel() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      rows: 1,
    };
    return (
      <div style={{ top: "50%", textAlign: "center" }}>
        <Slider {...settings}>
          <div>
          <img
          style={{
            maxWidth: "100%",
            maxHeight: "300px",
            overflow: "hidden",
            padding: "20px",
            borderRadius: "50px",
          }}
          src="https://tour.gb.go.kr/file/thumbnail.do?img_physical=20214125175094.png"
        />
          </div>
          <div>
          <img
          style={{
            maxWidth: "100%",
            maxHeight: "300px",
            overflow: "hidden",
            padding: "20px",
            borderRadius: "50px",
          }}
          src="https://cdn.s-journal.co.kr/news/photo/202312/19345_18389_5623.jpeg"
        />
          </div>
          <div>
          <img
          style={{
            maxWidth: "100%",
            maxHeight: "300px",
            overflow: "hidden",
            padding: "20px",
            borderRadius: "50px",
          }}
          src="https://www.kkday.com/ko/blog/wp-content/uploads/korea_pocheon_pyunggangland_1.jpg"
        />
          </div>
        </Slider>
      </div>
    );
  }

  export default carousel;