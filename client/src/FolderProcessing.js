// Import utilities
import React, { 
    useState,
    useEffect,
} from "react";
import axios from 'axios';
import { AiOutlineCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'


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
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState([]);
    const [allDone, setAllDone] = useState(false);

    // Context variables
    const columnStep = useColumnStepContext();
    const fastTrack = useFastTrackContext();
    const setCurrStep = useStateCurrentStepContext();
    const navigate = useNavigate();

    const handleRunButtonPressed = async () => {
        if (!runButtonPressed) {
            setRunButtonPressed(true);
            const result = await axios.get('http://127.0.0.1:5000/exec', { withCredentials: false });
            console.log('Result: ', result.data);
            setAllDone(true);
        }
    }

    useEffect(() => {
        const getProgress = async () => {
            console.log('Get Progress Called')
            const retrievedProgress = await axios.get('http://127.0.0.1:5000/get-progress', { withCredentials: false });
            setCount(retrievedProgress.data[0]);
            setProgress(retrievedProgress.data[1]); 
        }

        const intervalID = setInterval(getProgress, 5000);
        return () => clearInterval(intervalID);
    },[])

    const renderSelectedColumns = Object.entries(columnStep).map(([key, value], index) => {
        if (value !== 0 && key !== 'fast-track') {
            return (
                <span key={index} className='ms-8 text-lg font-medium text-gray-900 mt-2'>
                    {key + ' : '}
                    {value}
                </span>
            );
        }
        return (
            <div key={index} />
        );
    });

    const renderProgress = progress.map((item, index) => {
        return (
            <span key={index} className='ms-8 text-lg font-medium text-gray-900 mt-2'>
                {item}
            </span>
        );
    });

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
                                    {
                                        runButtonPressed ? (
                                            <div className='flex flex-row justify-center items-center  -mr-5'>
                                                <span className='text mr-5'>
                                                    Cancel
                                                </span>
                                            </div>
                                        ) : (
                                            <div className='flex flex-row justify-center items-center -mr-2'>
                                                <span className='text mr-5'>
                                                    Start
                                                </span>
                                                <AiOutlineCaretRight size={25}/>
                                            </div>
                                        )
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                    { runButtonPressed && (
                        <div className='mt-5'>
                            <div className='contentContainer flex flex-col'>
                                <span className="text">
                                    Your Progress:
                                </span>
                                <div className='selectionContainer flex flex-col mt-3'>
                                    {renderProgress}
                                    {
                                        allDone ? (
                                            <span className='ms-8 text-lg font-medium text-gray-900 mt-2'>
                                                ALL DONE!
                                            </span>
                                        ) : (
                                            <div className='flex justify-center items-center'>
                                                <ThreeDots 
                                                    color='#433BFF'
                                                    width='65'
                                                    height='35'
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PagePreset>
        
        </>
    )
}