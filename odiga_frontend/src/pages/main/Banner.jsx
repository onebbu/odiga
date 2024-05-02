import './banner.css';

function Banner(){
    return (
        <section className="MainBanner">
        <div className="BannerContent">
          <div className="BannerText">
          <p className="BannerHeading">그래서 우리 어디가??</p>
            <div className="BannerDescription">
              <p>ODIGA가 여러분의 여행을 </p>
              <p>안내 해드릴게요!</p>
            </div>
          </div>
          <div className="BannerImage"></div>
        </div>
        </section>
    );
  }
  
  export default Banner;