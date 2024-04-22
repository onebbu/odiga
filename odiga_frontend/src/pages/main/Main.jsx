import * as React from 'react';
import Header from "../tiles/Header";
import Banner from "./Banner";
import KoreaLocations from "./KoreaLocations";
import Maincontents from "./MainContents";

function Main() {
    return (

        <div>
            <Header/>
            <Banner/>
            <KoreaLocations/>
            <Maincontents/>
        </div>

    );

}

export default Main;