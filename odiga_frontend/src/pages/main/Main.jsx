import * as React from 'react';
import Header from "../component/navbar/Header";
import Banner from "./Banner";
import KoreaLocations from "./KoreaLocations";
import Maincontents from "./MainContents";
import Footer from '../component/footer/Footer';

function Main() {
    return (

        <div>
            <Banner/>
            <KoreaLocations/>
            <Maincontents/>
        </div>

    );

}

export default Main;