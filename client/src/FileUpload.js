import React, { useState, useEffect } from "react";
import axios from 'axios';
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import RadioButton from "./component/RadioButton.js";
import Button from "./component/Button.js";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useStateCurrentStepContext } from "./context/StepContext.js";
import { useSetDirIndexContext, useSetListOfDirContext, useDirIndexContext, useListOfDirContext } from "./context/DirectoryContext.js";
import './css/FileUpload.css';

export default function FolderSelection() {
    const [currWorkDirect, setCurrWorkDirect] = useState('');
    const listOfDir = useListOfDirContext();
    const setListOfDir = useSetListOfDirContext();
    const dirIndex = useDirIndexContext();
    const setDirIndex = useSetDirIndexContext();

    const setCurrStep = useStateCurrentStepContext();
    const navigate = useNavigate();

    const handleNextButtonPressed = () => {
        if (dirIndex === -1) {
            alert("Please Select a Folder")
        } else {
            setCurrStep(1);
            navigate('/process-detail');
        }
    }

    const handleBackButtonPressed = () => {
        setCurrStep(0);
        navigate('/');
    }

    const handleDirectoryBackward = async () => {
        if (currWorkDirect !== '/') {
            try {
                const cwd = await axios.get('http://127.0.0.1:5000/directory-backward', { withCredentials: false});
                setCurrWorkDirect(cwd.data);
                const updatedListOfDir = await axios.get('http://127.0.0.1:5000/get-list-of-folders', { withCredentials: false });
                setListOfDir(updatedListOfDir.data);
                setDirIndex(-1);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDirectoryForward = async () => {
        if (dirIndex === -1) {
            alert("Please Select a Folder")
        } else {
            const folder = listOfDir[dirIndex];
            try {
                const cwd = await axios.post('http://127.0.0.1:5000/directory-forward', {
                    selectedFolder: folder,
                }, {
                    withCredentials: false
                });
                setCurrWorkDirect(cwd.data);
                const updatedListOfDir = await axios.get('http://127.0.0.1:5000/get-list-of-folders', { withCredentials: false });
                setListOfDir(updatedListOfDir.data);
            } catch (err) {
                console.log(err)
            }
        }
    }

    const makePostRequest = async (test) => {
        try {
            const cwd = await axios.get('http://127.0.0.1:5000/get-current-working-directory', { withCredentials: false });
            setCurrWorkDirect(cwd.data);
            const listOfDir = await axios.get('http://127.0.0.1:5000/get-list-of-folders', { withCredentials: false });
            setListOfDir(listOfDir.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDirIndexSelected = (index) => {
        setDirIndex(index);
    }

    const renderListOfDir = listOfDir.map((item, id) => {
        const index = id;
        return (
            <RadioButton name={item} key={index} id={index} dirSelected={handleDirIndexSelected} />
        )
    })

    useEffect(() => {
        makePostRequest();
        setCurrStep(0);
    }, [])
    // By passing an empty dependency array, the useEffect() will only run after initial render
    // Passing no dependency array at all, the useEffect() will run after every single render
    
    return (
        <>
            <PagePreset>
                <NavBar />
                <div className="fileUploadContainer">
                    <div className="contentContainer">
                        <span className="text1">
                            Current Working Directory:
                            {''}
                        </span>
                        <div className="currWorkDirectContainer">
                            <span className="text2 text-md">
                                {currWorkDirect}
                            </span>
                        </div>
                        <div className="arrowButtonGroup">
                            <Button onClick={handleDirectoryBackward}>
                                <FaArrowLeft size={20}/>
                            </Button>
                            <Button onClick={handleDirectoryForward}>
                                <FaArrowRight size={20}/>
                            </Button>   
                        </div>
                    </div>
                    <div className="contentContainer mt-6">
                        <span className="text1 mt-5">
                            Select a folder:
                        </span>
                        <div className="mt-4 dirContainer">
                            {renderListOfDir}
                        </div>
                    </div>
                    <div className="buttonGroup">
                        <Button onClick={handleBackButtonPressed}>
                            <span className="text-xl text2">
                                BACK
                            </span>
                        </Button>
                        <Button onClick={handleNextButtonPressed}>
                            <span className="text-xl text2">
                                NEXT
                            </span>
                        </Button>
                    </div>
                </div>
            </PagePreset>
        </>
    );
};