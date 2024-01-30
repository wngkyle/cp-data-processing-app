import React from "react";
import PagePreset from "./component/PagePreset.js";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const navigate = useNavigate();

    const handleEnterButtonClicked = () => {
        console.log('HOME -> File Upload');
        navigate('/file-upload');
    }

    return (
        <>
            <PagePreset>
                <div className="homeContainer">
                    <span className="welcomeText">
                        Hello and Welcome 👋
                    </span> 
                    <button 
                        className="
                            px-6 py-4 text-xl tracking-wide text-white transition-colors duration-300 transform 
                            bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 
                            focus:ring-opacity-80 enterButton"
                        onClick={handleEnterButtonClicked}
                    >
                        Enter and Begin
                    </button>
                </div>
            </PagePreset>
        </>
    );
};