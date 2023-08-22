import React from "react";
import '../styles/pages/Home.css';
import {AppInfo} from "../info/AppInfo";
import AnimatedPage from "../animations/AnimatedPage";
import Experience from "./Experience";

const Home = () => {

    return (
        <AnimatedPage>
            <div className='landing-page'>
                <h1>{AppInfo.pages.AboutMe.heading}</h1>
                <h2>{AppInfo.pages.AboutMe.description}</h2>
            </div>
            <Experience/>
        </AnimatedPage>
    )
}

export default Home;
