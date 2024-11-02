// Import utilities
import React, { 
    useState,
    useEffect,
    useRef,
} from "react";
import axios from 'axios';
import { AiOutlineCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";


// Import components
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import Button from "./component/Button.js";
import LoadingSpinner from "./component/LoadingSpinner.js";

// Import context variables
import { useColumnStepContext, useSetColumnStepContext } from "./context/ColumnStepContext.js";
import { useFastTrackContext, useSetFastTrackContext } from "./context/FastTrackContext.js";
import { useStateCurrentStepContext } from "./context/StepContext.js";
import { useColumnRangeContext, useSetColumnRangeContext } from "./context/ColumnRangeContext.js";

// CSS
import './css/FolderProcessing.css'

export default function FolderProcessing() {
    // State variables
    const [processButtonPressed, setProcessButtonPressed] = useState(false);
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState([]);
    const [allDone, setAllDone] = useState(false);

    // Reference variable
    const cancelToken = useRef(null);

    // Context variables
    const columnStep = useColumnStepContext();
    const setColumnStep = useSetColumnStepContext();
    const columnRange = useColumnRangeContext();
    const setColumnRange = useSetColumnRangeContext();
    const fastTrack = useFastTrackContext();
    const setFastTrack = useSetFastTrackContext();
    const setCurrStep = useStateCurrentStepContext();
    const navigate = useNavigate();

    // Handle Process Button Pressed
    const handleProcessButtonPressed = async () => {
        setProcessButtonPressed(!processButtonPressed);
    }

    // Called Everytime processButtonPressed change value
    useEffect(() => {
        const exec = async () => {
            cancelToken.current = axios.CancelToken.source();
            try {
                const result = await axios.get('http://127.0.0.1:5000/exec', { 
                    withCredentials: false,
                    cancelToken: cancelToken.current.token
                })
                console.log('Result:', result.data);
            } catch(thrown) {
                if (axios.isCancel(thrown)) {
                    console.log('Request Cancelled:', thrown.message);
                } else {
                    console.log('Error during cancellation');
                }
            }
            setAllDone(true);
        }

        const cancel = async () => {
            try {
                await axios.get('http://127.0.0.1:5000//remove-processed-folder-content', { withCredentials: false });
                setProcessButtonPressed(false);
                setProgress([]);
                setCount(0);
                setAllDone(false);
            } catch(error) {
                console.log('Error during cancellation:', error);
            }
        }

        if (processButtonPressed) { 
            exec();
        } else {
            cancel();
        }

        return () => {
            if (cancelToken.current) {
                cancelToken.current.cancel('Component unmounted or effect re-run');
                cancelToken.current = null;
                setProgress([]);
                setCount(0);
                setAllDone(false);
            }
        }
    }, [processButtonPressed]);

    // Next button
    const handleNextButtonPressed = () => {
        console.log('Process Detail -> Done');
        setCurrStep(3);
        setProgress([]);
        navigate('/complete');
    }

    // Back button
    const handleBackButtonPressed = async () => {
        if (cancelToken.current) {
            cancelToken.current.cancel('Back Button Pressed');
            cancelToken.current = null;
        }
        console.log('Process Detail <- Folder Processing');
        setCurrStep(1);
        // Reset column step
        setColumnStep({
            'Isc_20mA': [0.15, false],
            'Turn_off_80mA_': [2, false],
            'Turn_off_80mA_HL': [0.5, false],
            'Rf': [0.2, false],
            'Rr': [0.2, false],
        });
        // Reset column range
        setColumnRange({
            'Isc_20mA': [2, 10],
            'Turn_off_80mA_': [0, 150],
            'Turn_off_80mA_HL': [-20, 20],
            'Rf': [10, 20],
            'Rr': [10, 20],
        })
        // Reset fast track
        setFastTrack(null);
        setProgress([]);
        setAllDone(false);
        // If back button is pressed, everything in the folder is deleted
        const result = await axios.get('http://127.0.0.1:5000//remove-processed-folder-content', { withCredentials: false });
        console.log('Back Button Pressed : folder content deleted', result.data);
        navigate('/process-detail');
    }

    // Fetch progress from backend every 3 seconds
    useEffect(() => {
        const getProgress = async () => {
            console.log('Get Progress Called')
            // Fetch current progress from backend
            const retrievedProgress = await axios.get('http://127.0.0.1:5000/get-progress', { withCredentials: false });
            setCount(retrievedProgress.data[0]);
            setProgress(retrievedProgress.data[1]); 
        }
        getProgress();
        const intervalID = setInterval(getProgress, 3000);
        return () =>{
            // Reset everything 
            setCount(0);
            setProgress([]);
            clearInterval(intervalID);
        }
    },[]);

    // Render selection confirmation
    const renderSelectedColumns = Object.entries(columnStep).map(([key, value], index) => {
        if (value[1] && key !== 'fast-track') {
            return (
                <div key={index}  className='selectionContainer flex flex-col mt-3'>
                    <span className='text-lg font-semibold text-gray-900 my-2 ml-6'>
                        {key}
                    </span>
                    <div style={{
                        height: '2px',
                        backgroundColor: 'black',
                        marginBottom: '12px',
                        marginLeft: '22px',
                        marginRight: '22px',
                    }} />
                    <span className="test-base font-semibold ml-12 leading-7">
                        Step Size : {value[0]} <br/>
                        Range : {columnRange[key][0]} to {columnRange[key][1]}
                    </span>
                </div>
            );
        }
        return (
            <div key={index} />
        );
    });

    // Render current progress
    const renderFullProgress = progress.map((item, index) => {
        return (
            <span key={index} className='ms-8 text-lg font-medium text-gray-900 mt-2'>
                {item}
            </span>
        );
    });

    const renderProgressCount = () => {
        return (
            <div className="flex flex-col justify-center items-center mt-4">
                <LoadingSpinner />
                <span className="test-base font-semibold leading-7 mt-3">
                    {count} files processed...
                </span>
            </div>
        )
    }

    const renderProgressComplete = () => {
        return (
            <div className="flex flex-col justify-center items-center mt-4">
                <FaCircleCheck size={65} color='#736DFF'/>
                <span className="text-xl font-semibold mt-3">
                    {count} files processed
                </span>
            </div>
        )
    }

    return (
        <>
            <PagePreset>
                <NavBar />
                <div className='folderProcessingContainer'>
                    <div className='contentContainer flex flex-col'>
                        <span className="text">
                            Your Selections:
                        </span>
                        { renderSelectedColumns }
                        <div className='selectionContainer flex flex-col mt-3'>
                            <span className='ms-8 text-lg font-semibold text-gray-900 mt-2'>
                                {'Fast-track : '}
                                {fastTrack === true ? 'Yes' : 'No'}
                            </span>
                        </div>
                        <div className='flex justify-center'>
                            <div className="flex mt-5">
                                <Button onClick={handleProcessButtonPressed}>
                                    {
                                        processButtonPressed ? (
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
                    { processButtonPressed && (
                        <div className='mt-5'>
                            <div className='contentContainer flex flex-col'>
                                <span className="text">
                                    Your Progress:
                                </span>
                                <div className='selectionContainer flex flex-col mt-3'>
                                    {
                                        allDone ? (
                                            renderProgressComplete()
                                        ) : (
                                            renderProgressCount()
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )}
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
    )
}