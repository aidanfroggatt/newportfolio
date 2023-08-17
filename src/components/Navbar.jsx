import React from "react";
import '../styles/Navbar.css';
import {AppInfo} from "../info/AppInfo";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const goToDestination = (destination) => {
        navigate(destination)
    }

    return (
        <div className="navbar">
            <div className="my-name-container">
                <div className="my-name" onClick={() => goToDestination(AppInfo.landingPage.route)}>
                    {AppInfo.name}
                </div>
            </div>
            <div className="page-container">
                {
                    Object.keys(AppInfo.pages).map((page, index) => {
                        return (
                            <div className="page" key={index} onClick={() => goToDestination(AppInfo.pages[page].route)}>
                                {AppInfo.pages[page].name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="social-media-container">
                {
                    Object.keys(AppInfo.socialMedia).map((socialMedia, index) => {
                        return (
                            <div className="social-media-icon" key={index} onClick={() => window.open(AppInfo.socialMedia[socialMedia].link, "_blank")}>
                                {AppInfo.socialMedia[socialMedia].name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Navbar;
