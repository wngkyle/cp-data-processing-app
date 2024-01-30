import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStepsContext, useStepsDispatchContext } from "../Context.js";
import "./NavBar.css";


export default function NavBar() {
    const steps = useStepsContext();
    const stepsDispatch = useStepsDispatchContext();
    const navigate = useNavigate();

    const handleFileUploadStepPressed = () => {
        stepsDispatch({
            type: 'nextStep',
            payload: {
                step: 0,
            }
        });
        navigate('/file-upload');
    }

    const handleProcessDetailStepPrcessed = () => {
        stepsDispatch({
            type: 'nextStep',
            payload: {
                step: 1,
            }
        });
        navigate('/input-detail');
    }

    const handleFileDownloadStepPressed = () => {
        stepsDispatch({
            type: 'nextStep',
            payload: {
                step: 2,
            }
        });
        navigate('/complete');
    }

    return (
        <div className="navBarContainer">
            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                <li className="dark:text-blue-500 flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b dark:after:border-gray-400">
                    <button onClick={handleFileUploadStepPressed}>
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 progressBarStepHeader"> 
                            {steps[0] === 1 && <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>}
                            File <span className="hidden sm:inline-flex sm:ms-2">Upload</span>
                        </span>
                    </button>
                </li>
                <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b dark:after:border-gray-400">
                    <button onClick={handleProcessDetailStepPrcessed}> 
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 progressBarStepHeader">
                            <span className="me-2">2</span>
                            Process<span className="hidden sm:inline-flex sm:ms-2">Detail</span>
                        </span>
                    </button>
                </li>
                <li className="flex items-center">
                    <button onClick={handleFileDownloadStepPressed}>
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 progressBarStepHeader">
                            <span className="me-2">3</span>
                            File <span className="hidden sm:inline-flex sm:ms-2">Download</span>
                        </span>
                    </button>
                </li>
            </ol>
            <button onClick={() => {console.log(steps)}}>
                PRINT STEPS
            </button>
        </div>
    );
};


// import { NavLink } from "react-router-dom";

/* <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/file-upload'>File Upload</NavLink>
    <NavLink to='/input-detail'>Input Detail</NavLink>
    <NavLink to='/complete'>Complete</NavLink>
</nav> */

// {/* <nav id='navBar'>
    // <ul>
    //     <li>
    //         <NavLink to="/">Home</NavLink>
    //     </li>
    //     <li>
    //         <NavLink to="/file-upload">About</NavLink>
    //     </li>
    //     <li>
    //         <NavLink to="/input-detail">Product</NavLink>
    //     </li>
    //     <li>
    //         <NavLink to="/blank">Blank</NavLink>
    //     </li>
    // </ul>
// </nav> */}