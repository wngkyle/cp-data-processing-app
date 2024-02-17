// Import utilities
import React, { useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SquircleLoader } from "react-awesome-loaders";

// Import components
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import Button from "./component/Button.js";

// Import context variables
import { useColumnStepContext } from "./context/ColumnStepContext.js";
import { useFastTrackContext } from "./context/FastTrackContext.js";
import { useStateCurrentStepContext } from "./context/StepContext.js";

// CSS
import './css/FolderProcessing.css'

export default function FolderProcessing() {
    // State variables
    const [runButtonPressed, setRunButtonPressed] = useState(false);

    // Context variables
    const columnStep = useColumnStepContext();
    const fastTrack = useFastTrackContext();
    const setCurrStep = useStateCurrentStepContext();
    const navigate = useNavigate();

    const handleRunButtonPressed = () => {
        if (!runButtonPressed) {
            console.log('Run Button Pressed');
            setRunButtonPressed(true);
        }
    }

    const renderSelectedColumns = Object.entries(columnStep).map(([key, value]) => {
        if (value !== 0 && key !== 'fast-track') {
            return (
                <span className='ms-8 text-lg font-medium text-gray-900 mt-2'>
                    {key + ' : '}
                    {value}
                </span>
            );
        }
        return (
            <></>
        );
    })

    return (
        <>
            <PagePreset>
                <NavBar />
                <div className='folderProcessingContainer'>
                    <div className='contentContainer flex flex-col'>
                        <span className="text">
                            Your Selections:
                        </span>
                        <div className='selectionContainer flex flex-col mt-3'>
                            { renderSelectedColumns }
                            <span className='ms-8 text-lg font-medium text-gray-900 mt-2'>
                                {'Fast-track : '}
                                {fastTrack === true ? 'Yes' : 'No'}
                            </span>
                        </div>
                        <div className='flex justify-center'>
                            <div className="flex mt-5">
                                <Button onClick={handleRunButtonPressed}>
                                    <div className='flex flex-row justify-center items-center -mr-2'>
                                        {
                                            runButtonPressed ? (
                                                <div>
                                                    <SquircleLoader />
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className='text mr-5'>
                                                        Start
                                                    </span>
                                                    <AiOutlineCaretRight size={25}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PagePreset>
        
        </>
    )
}