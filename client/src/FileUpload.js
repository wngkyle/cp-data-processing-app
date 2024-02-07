import React, { useState, useEffect } from "react";
import axios from 'axios';
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import { useNavigate } from "react-router-dom";
import './css/FileUpload.css'

export default function FolderSelection() {
    const [currWorkDirect, setCurrWorkDirect] = useState('')
    const [listOfDir, setListOfDir] = useState(['hello', 'hello', 'hello'])
    const navigate = useNavigate();

    const makePostRequest = async (test) => {
        console.log("Button clicked")
        try {
            const cwd = await axios.get('http://127.0.0.1:5000/get-current-working-directory', { withCredentials: false })
            setCurrWorkDirect(cwd.data);
            const listOfDir = await axios.get('http://127.0.0.1:5000/get-list-of-folders', { withCredentials: false })
            setListOfDir(listOfDir.data)
        } catch (error) {
            console.error(error);
        }
    }

    const renderListOfDir = listOfDir.map((item) => {
        return (
            <button>
                {item}
            </button>
        )
    })

    useEffect(() => {
        makePostRequest()
    }, [])
    // By passing an empty dependency array, the useEffect() will only run after initial render
    // Passing no dependency array at all, the useEffect() will run after every single render
    
    return (
        <>
            <PagePreset>
                <NavBar />
                <div className="fileUploadContainer">
                    <span className="text1">
                        Current Working Directory:
                        {''}
                    </span>
                    <div className="currWorkDirectContainer">
                        <span className="text2">
                            {currWorkDirect}
                        </span>
                    </div>
                    <div className="arrowButtonGroup">
                        <button 
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                            text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28 justify-center"
                        >
                            <svg 
                                class="w-5 h-5 rotate-180" 
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 14 10"
                            >
                                <path 
                                    stroke="currentColor" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                        <button 
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                            text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28 justify-center"
                            onClick={makePostRequest}
                        >
                            <svg 
                                class="w-5 h-5" 
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 14 10"
                            >
                                <path 
                                    stroke="currentColor" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </div>
                    <span className="text1 mt-5">
                        Select a folder:
                        {''}
                    </span>
                    {renderListOfDir}
                </div>

            </PagePreset>
        </>
    );
};