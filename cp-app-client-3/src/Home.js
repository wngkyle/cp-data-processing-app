import React from "react";
import PagePreset from "./component/PagePreset.js";
import { useNavigate } from "react-router-dom";
import { useStateCurrentStepContext  } from "./context/StepContext.js";
import "./css/Home.css";

export default function Home() {
    const navigate = useNavigate();
    const setCurrStep = useStateCurrentStepContext();

    const handleEnterButtonClicked = () => {
        console.log('HOME -> File Upload');
        setCurrStep(0);
        navigate('/folder-selection');
    }

    return (
        <>
            <PagePreset>
                <div className="homeContainer">
                    <span className="welcomeText">
                        Hello and Welcome 👋
                        {/* <iframe title='hand-waving' src="https://giphy.com/embed/c1CLe6VoaMviQz0s6z" width="150" height="100" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
                        {/* <iframe src="https://giphy.com/embed/jKkqqRlfzajljKVV5p" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Adbros-jKkqqRlfzajljKVV5p">via GIPHY</a></p> */}
                    </span> 
                    <button 
                        className="
                            px-6 py-4 text-xl tracking-wide text-white transition-colors duration-300 transform 
                            bg-blue-500 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 
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