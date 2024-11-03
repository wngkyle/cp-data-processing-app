import React, { useState, useEffect } from "react"
import axios from 'axios';
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import Button from "./component/Button.js";
import './css/Complete.css';
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { useStateCurrentStepContext  } from "./context/StepContext.js";


export default function Complete() {
    const [newFolderPath, setNewFolderPath] = useState('');
    const navigate = useNavigate();
    const setCurrentStep = useStateCurrentStepContext();

    const handleProcessNextFileButtonPressed = async () => {
        setCurrentStep(1);
        const response = await axios.get('http://127.0.0.1:5000//reset-all-data', { withCredentials: false });
        console.log(response.data);
        navigate('/folder-selection');
    }

    const getNewFolderPath = async () => {
        const fdpath = await axios.get('http://127.0.0.1:5000/get-new-folder-path', { withCredentials: false }); 
        setNewFolderPath(fdpath.data);
    }

    useEffect(() => {
        getNewFolderPath();
    },[]);

    return (
        <>
            <PagePreset>
                <NavBar />
                <div className='completeContainer'>
                    <span className='completeHeader'>
                        Done!
                    </span>
                    <FaCircleCheck size={75} color='#736DFF'/>
                    <div className='contentContainer mt-8 mx-20'>
                        <span className='text1'>
                            New Folder Path: {newFolderPath}
                        </span>
                    </div>
                    <div className='mt-8' />
                    <Button onClick={handleProcessNextFileButtonPressed}>
                        <span className='text-xl text2'>
                            Process Next Folder
                        </span>
                    </Button>
                </div>
            </PagePreset>
        </>
    );
};