import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from './../assets/bright-toward-logo.png';
import './css/PagePreset.css';

export default function PagePreset({ children }) {
    const navigate = useNavigate();

    const handleLogoPressed = async () => {
        console.log(" -> Home");
        const result = await axios.get('http://127.0.0.1:5000///reset-variable-processed-and-remove-all-processed-folder', { withCredentials: false });
        console.log("Logo Pressed:", result.data);
        navigate('/');
    }

    return ( 
        <div className="container">
            <div className="topBar">
                <button
                    onClick={handleLogoPressed}
                >
                    <img className="logo" src={logo} alt='Bright-Toward-Logo' />
                </button>
                <div className="versionTextBox">
                    <span className="versionText">
                        CP App
                    </span>
                    <span className="versionText">
                        Beta Version V.1.X
                    </span>
                </div>
            </div>
            <div className="bottomContent">
                {children}
            </div>
        </div>
    )
}