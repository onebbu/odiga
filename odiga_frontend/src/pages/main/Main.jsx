import * as React from 'react';
import Header from "../component/navbar/Header";
import Banner from "./Banner";
import KoreaLocations from "./KoreaLocations";
import Maincontents from "./MainContents";
import Footer from './Footer';

function Main() {
    return (

        <div>
            <Header/>
            <Banner/>
            <KoreaLocations/>
            <Maincontents/>
            <Footer/>
        </div>

    );

}

export default Main;