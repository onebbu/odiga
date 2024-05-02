import React, { useState, useEffect, useRef } from 'react'; 
import './footer.css'; // CSS 모듈 사용 시

function Footer () {
   return(
    
    <footer className="site-footer">
        <div className="contourLine2"></div>
    <div className="footer-content">
      <h3>ODIGA</h3>
      <p>다양한 여행 정보와 추천을 제공하는 ODIGA와 함께 떠나요!</p>
      <div className="footer-team">
          <p>팀원: 박상은, 차세종, 박규리, 박승환, 이재현</p>
        </div>
        <p>© ODIGA. All rights reserved.</p>
    </div>
    
  </footer>



   );

}

export default Footer;