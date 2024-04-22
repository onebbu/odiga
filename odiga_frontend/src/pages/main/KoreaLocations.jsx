import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import './Locations.css';
import seoulImage from '../../assets/images/seoul.jpg';
import busanImage from '../../assets/images/busan.png';
import incheonImage from '../../assets/images/incheon.png';
import daeguImage from '../../assets/images/daegu.png';
import Image1 from '../../assets/images/경기도.png';
import Image2 from '../../assets/images/제주도.jpg';
import Image3 from '../../assets/images/광주.jpg';
import Image4 from '../../assets/images/대전.jpg';

function KoreaLocations() {
    const locations = [
        { name: '서울', image: seoulImage },
        { name: '부산', image: busanImage },
        { name: '인천', image: incheonImage },
        { name: '대구', image: daeguImage },
        { name: '경기', image: Image1 },
        { name: '제주', image: Image2 },
        { name: '광주', image: Image3 },
        { name: '대전', image: Image4 }
        
    ];

    const numVisible = 4; 
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth = 100 / numVisible; 
    const sliderStyle = {
        transform: `translateX(-${currentIndex * slideWidth}%)`,
        transition: 'transform 0.5s ease' 
    };

    const handlePrev = () => {
        if (currentIndex - numVisible < 0) {
            setCurrentIndex(locations.length - numVisible);
        } else {
            setCurrentIndex(currentIndex - numVisible);
        }
    };

    const handleNext = () => {
        if (currentIndex + numVisible >= locations.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + numVisible);
        }
    };

    
    const visibleLocations = locations.slice(currentIndex, currentIndex + numVisible);

    return (
        <section className="MainLocations">
            <div className="LocationsHeading">
                <div className="LocationsHeadingIcon"><FontAwesomeIcon icon={faLightbulb} /></div>
                <div className="LocationsHeadingText"><p>어디로 떠나볼까요?</p></div>
            </div>
            <nav className="LocationsContents">
                <button className="ArrowButton" onClick={handlePrev}><FontAwesomeIcon icon={faArrowLeft} /></button>
                {visibleLocations.map((location, index) => (
                    <div className="NavLocations" key={index}>
                        <a href="#">
                            <div className="NavLocationImg">
                                <img alt={location.name} src={location.image} />
                            </div>
                            <div className="NavLocationText">
                                <p>{location.name}</p>
                            </div>
                        </a>
                    </div>
                ))}
                <button className="ArrowButton" onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} /></button>
            </nav>
        </section>
    );
}

export default KoreaLocations;
