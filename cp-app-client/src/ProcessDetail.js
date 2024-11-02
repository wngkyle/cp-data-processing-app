// Import utilities
import React from "react";
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Import components
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import RadioButton from "./component/RadioButton.js";
import RadioButton2 from "./component/RadioButton2.js";
import Button from "./component/Button.js";

// Import context variables
import { useStateCurrentStepContext } from './context/StepContext.js';
import { useColumnStepContext, useSetColumnStepContext } from "./context/ColumnStepContext.js";
import { useFastTrackContext, useSetFastTrackContext } from "./context/FastTrackContext.js";
import { useColumnRangeContext, useSetColumnRangeContext } from "./context/ColumnRangeContext.js";

// CSS
import './css/ProcessDetail.css';

export default function ProcessDetail() {
    // React navigate item
    const navigate = useNavigate();

    // Context Variables
    const setCurrStep = useStateCurrentStepContext();
    const columnStep = useColumnStepContext();
    const setColumnStep = useSetColumnStepContext();
    const fastTrack = useFastTrackContext();
    const setFastTrack = useSetFastTrackContext();
    const columnRange = useColumnRangeContext();
    const setColumnRange = useSetColumnRangeContext();

    // Helper function : check if string contains only digits
    // Returns true if contains only digits, return false if contains characters
    function containsOnlyDigits(str) {
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    // Helper function : alert user when non-digits are entered
    function alertUserDigitsOnly(str) {
        if (str !== '' && !containsOnlyDigits(str)) {
            alert('Please Enter Numbers Only!');
        }
    }

    // Handle column select variables
    const handleIsc20mAPressed = () => {
        const temp = !columnStep['Isc_20mA'][1];
        setColumnStep({
            ...columnStep,
            'Isc_20mA': [0.15, temp]
        });
    }
    const handleTurnOff80mAPressed = () => {
        const temp = !columnStep['Turn_off_80mA_'][1];
        setColumnStep({
            ...columnStep,
            'Turn_off_80mA_': [2, temp]
        });
    }
    const handleTurnOff80mAHLPressed = () => {
        const temp = !columnStep['Turn_off_80mA_HL'][1];
        setColumnStep({
            ...columnStep,
            'Turn_off_80mA_HL': [0.5, temp]
        });
    }
    const handleRfPressed = () => {
        const temp = !columnStep['Rf'][1];
        setColumnStep({
            ...columnStep,
            'Rf': [0.2, temp]
        });
    }
    const handleRrPressed = () => {
        const temp = !columnStep['Rr'][1];
        setColumnStep({
            ...columnStep,
            'Rr': [0.2, temp]
        });
    }

    // Handle fast track variable
    const handleFastTrackPressed = () => {
        setFastTrack(true);
    }
    const handleNoFastTrackPressed = () => {
        setFastTrack(false);
    }

    // Handle next and back button
    const handleNextButtonPressed = async () => {
        console.log('Step:', columnStep);
        console.log('Range:', columnRange);
        // Alert the user if no column is selected
        if (!(columnStep['Isc_20mA'][1] || columnStep['Turn_off_80mA_'][1] || columnStep['Turn_off_80mA_HL'][1] || columnStep['Rf'][1] || columnStep['Rr'][1])) {
            alert('Please select a column to process');
        // Alert the user if fast track option is not selected
        } else if (fastTrack === null) {
            alert('Please select a fast-track option');
        } else {
            // Send selected columns to backend
            const tempColumnStep = await axios.post('http://127.0.0.1:5000/set-selected-columns', {
                'selectedColumns': columnStep
            }, { 
                withCredentials: false
            });
            console.log('Returned from backend (step size): ', tempColumnStep.data);
            // Set fast track option 
            // For some reasons, wasn't able to pass boolean value to backend, so setting string values here
            let tempFastTrack;
            if (fastTrack) {
                tempFastTrack = 'true';
            } else {
                tempFastTrack = 'false';
            }
            // Send fast track option to backend
            const rush = await axios.post('http://127.0.0.1:5000/set-fast-track', {
                'fastTrack': tempFastTrack
            }, { 
                withCredentials: false
            });
            // Send selected column range to backend
            const tempColumnRange = await axios.post('http://127.0.0.1:5000/set-selected-range', {
                'selectedRange': columnRange
            }, {
                withCredentials: false
            })
            console.log('Returned from backend (range): ', tempColumnRange.data);
            console.log('Returned from backend (fast track): ', rush.data);
            console.log('Process Detail -> Folder Processing');
            setCurrStep(2);
            navigate('/folder-processing');
        }
    }
    const handleBackButtonPressed = async () => {
        console.log('File Upload <- Process Detail');
        // Remove the created folder if user return to previous step of selecting folder
        const result = await axios.get('http://127.0.0.1:5000/remove-folder', { withCredentials: false });
        console.log('Back Button Pressed: ', result.data);
        setCurrStep(0);
        navigate('/folder-selection');
    }

    // Handle step input, update the variable with user input
    const isc20mAUpdateText = (data) => {
        const step = data.target.value;
        alertUserDigitsOnly(step);
        if (step.trim().length !== 0) {
            let temp = columnStep['Isc_20mA'];
            temp[0] = step;
            setColumnStep({...columnStep, 
                'Isc_20mA': temp
            });
        }
    }
    const turnOff80mAUpdateText = (data) => {
        const step = data.target.value;
        alertUserDigitsOnly(step);
        if (step.trim().length !== 0 && containsOnlyDigits(step)) {
            let temp = columnStep['Turn_off_80mA_'];
            temp[0] = step;
            setColumnStep({...columnStep, 
                'Turn_off_80mA_': temp
            });
        }
    }
    const turnOff80mAHLUpdateText = (data) => {
        const step = data.target.value;
        alertUserDigitsOnly(step);
        if (step.trim().length !== 0 && containsOnlyDigits(step)) {
            let temp = columnStep['Turn_off_80mA_HL'];
            temp[0] = step;
            setColumnStep({...columnStep,
                'Turn_off_80mA_HL': temp
            });
        }
    }
    const rfUpdateText = (data) => {
        const step = data.target.value;
        alertUserDigitsOnly(step);
        if (step.trim().length !== 0 && containsOnlyDigits(step)) {
            let temp = columnStep['Rf'];
            temp[0] = step;
            setColumnStep({...columnStep,
                'Rf': temp
            });
        }
    }
    const rrUpdateText = (data) => {
        const step = data.target.value;
        alertUserDigitsOnly(step);
        if (step.trim().length !== 0 && containsOnlyDigits(step)) {
            let temp = columnStep['Rr'];
            temp[0] = step;
            setColumnStep({...columnStep,
                'Rr': temp
            });
        }
    }

    // Step Selection
    const renderStepSelection = () => {
        return (
            <div className="stepContainer mt-6">
                { columnStep['Isc_20mA'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Isc_20mA Step Size (default to 0.15) : <input name='isc_20mA step size' className='rounded-lg pl-2' onChange={isc20mAUpdateText} />
                        </label>
                    )
                } 
                { columnStep['Turn_off_80mA_'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Turn_off_80mA_ Step Size (default to 2)  : <input name='turn_off_80mA_ step size' className='rounded-lg pl-2' onChange={turnOff80mAUpdateText} required='require'/>
                        </label>
                    )
                }
                { columnStep['Turn_off_80mA_HL'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Turn_off_80mA_HL Step Size (default to 0.5) : <input name='turn_off_80mA_hl step size' className='rounded-lg pl-2' onChange={turnOff80mAHLUpdateText} />
                        </label>
                    )
                }
                { columnStep['Rf'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Rf Step Size (default to 0.2) : <input name='rf step size' className='rounded-lg pl-2' onChange={rfUpdateText} />
                        </label>
                    )
                }
                { columnStep['Rr'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Rr Step Size (default to 0.2) : <input name='rr step size' className='rounded-lg pl-2' onChange={rrUpdateText} />
                        </label>
                    )
                }
            </div>
        );
    }

    // Handle Range Input, update the variable with user input
    const isc20mAUpdateRange = (data, index) => {
        alertUserDigitsOnly(data);
        if (data.trim().length !== 0 && containsOnlyDigits(data)) {
            let temp = columnRange['Isc_20mA'];
            temp[index] = data;
            setColumnRange({ ...columnRange,
                'Isc_20mA': temp,
            });
        }
    }
    const turnOff80mAUpdateRange = (data, index) => {
        alertUserDigitsOnly(data);
        if (data.trim().length !== 0 && containsOnlyDigits(data)) {
            let temp = columnRange['Turn_off_80mA_'];
            temp[index] = data;
            setColumnRange({ ...columnRange,
                'Turn_off_80mA_': temp,
            });
        }
    }
    const turnOff80mAHLUpdateRange = (data, index) => {
        alertUserDigitsOnly(data);
        if (data.trim().length !== 0 && containsOnlyDigits(data)) {
            let temp = columnRange['Turn_off_80mA_HL'];
            temp[index] = data;
            setColumnRange({ ...columnRange,
                'Turn_off_80mA_HL': temp,
            });
        }
    }
    const rfUpdateRange = (data, index) => {
        alertUserDigitsOnly(data);
        if (data.trim().length !== 0 && containsOnlyDigits(data)) {
            let temp = columnRange['Rf'];
            temp[index] = data;
            setColumnRange({ ...columnRange,
                'Rf': temp,
            });
        }
    }
    const rrUpdateRange = (data, index) => {
        alertUserDigitsOnly(data);
        if (data.trim().length !== 0 && containsOnlyDigits(data)) {
            let temp = columnRange['Rr'];
            temp[index] = data;
            setColumnRange({ ...columnRange,
                'Rr': temp,
            });
        }
    }

    // Range Selection
    const renderRangeSelection = () => {
        return (
            <div className="stepContainer mt-6">
                { columnStep['Isc_20mA'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Isc_20mA Range (default from 2 to 10) : <input name='isc_20mA Lower Range Limit' className='rounded-lg pl-2 w-16 mr-2' onChange={(data) => {
                                isc20mAUpdateRange(data.target.value, 0);
                            }} />
                            to 
                            <input name='isc_20mA Upper Range Limit' className='rounded-lg pl-2 w-16 ml-2' onChange={(data) => {
                                isc20mAUpdateRange(data.target.value, 1);
                            }} />
                        </label>
                    )
                }
                { columnStep['Turn_off_80mA_'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Turn_off_80mA_ Range (default from 0 to 150) : <input name='turn_off_80mA Lower Range Limit' className='rounded-lg pl-2 w-16 mr-2' onChange={(data) => {
                                turnOff80mAUpdateRange(data.target.value, 0);
                            }} />
                            to 
                            <input name='turn_off_80mA Upper Range Limit' className='rounded-lg pl-2 w-16 ml-2' onChange={(data) => {
                                turnOff80mAUpdateRange(data.target.value, 1);
                            }} />
                        </label>
                    )
                }
                { columnStep['Turn_off_80mA_HL'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Turn_off_80mA_HL Range (default from -20 to 20) : <input name='turn_off_80mA_HL Lower Range Limit' className='rounded-lg pl-2 w-16 mr-2' onChange={(data) => {
                                turnOff80mAHLUpdateRange(data.target.value, 0);
                            }} />
                            to 
                            <input name='turn_off_80mA_HL Upper Range Limit' className='rounded-lg pl-2 w-16 ml-2' onChange={(data) => {
                                turnOff80mAHLUpdateRange(data.target.value, 1);
                            }} />
                        </label>
                    )
                }
                { columnStep['Rf'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Rf Range (default from 10 to 20) : <input name='Rf Lower Range Limit' className='rounded-lg pl-2 w-16 mr-2' onChange={(data) => {
                                rfUpdateRange(data.target.value, 0);
                            }} />
                            to 
                            <input name='Rf Upper Range Limit' className='rounded-lg pl-2 w-16 ml-2' onChange={(data) => {
                                rfUpdateRange(data.target.value, 1);
                            }} />
                        </label>
                    )
                }
                { columnStep['Rr'][1] === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Rr Range (default from 10 to 20) : <input name='Rr Lower Range Limit' className='rounded-lg pl-2 w-16 mr-2' onChange={(data) => {
                                rrUpdateRange(data.target.value, 0);
                            }} />
                            to 
                            <input name='Rr Upper Range Limit' className='rounded-lg pl-2 w-16 ml-2' onChange={(data) => {
                                rrUpdateRange(data.target.value, 1);
                            }} />
                        </label>
                    )
                }
            </div>
        )
    }
    
    return (
        <>
            <PagePreset>
                <NavBar />
                <div className="processDetailContainer">
                    <div className="contentContainer">
                        <span className="text1">
                            Select Column{'(s)'} to Process:
                        </span>
                        <div className="columnContainer mt-6">
                            <div className='subColumnContainer'>
                                {
                                    columnStep['Isc_20mA'][1] === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleIsc20mAPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Isc_20mA' buttonName='Isc_20mA' id={0} checked={columnStep['Isc_20mA'][1]} buttonPressed={handleIsc20mAPressed}/>
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    columnStep['Turn_off_80mA_'][1] === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleTurnOff80mAPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Turn_off_20mA_' buttonName='Turn_off_20mA_' id={1} checked={columnStep['Turn_off_80mA_'][1]} buttonPressed={handleTurnOff80mAPressed} />
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    columnStep['Turn_off_80mA_HL'][1] === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleTurnOff80mAHLPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Turn_off_20mA_HL' buttonName='Turn_off_20mA_HL' id={2} checked={columnStep['Turn_off_80mA_HL'][1]} buttonPressed={handleTurnOff80mAHLPressed}/>
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    columnStep['Rf'][1] === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleRfPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Rf' buttonName='Rf' id={3} checked={columnStep['Rf'][1]} buttonPressed={handleRfPressed}/>
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    columnStep['Rr'][1] === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleRrPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Rr' buttonName='Rr' id={4} checked={columnStep['Rr'][1]} buttonPressed={handleRrPressed}/>
                            </div>
                        </div>
                    </div>
                    <div className="contentContainer mt-6">
                        <span className="text1">
                            Fast-track or nahhhhh:
                        </span>
                        <div className="columnContainer mt-6 flex flex-row">
                            <RadioButton name='Si' id={0} buttonName='fastrack' buttonPressed={handleFastTrackPressed} buttonClassName='-mb-2' labelClassName='-mb-2'/>
                            <RadioButton name='Ño' id={0} buttonName='fastrack' buttonPressed={handleNoFastTrackPressed} buttonClassName='-mb-2' labelClassName='-mb-2'/>
                        </div>
                    </div>
                    <div className="contentContainer mt-6">
                        <span className="text1">
                            Step Size Selection:
                        </span>
                        {renderStepSelection()}
                    </div>
                    <div className="contentContainer mt-6">
                        <span className="text1">
                            Data Range Selection:
                        </span>
                        {renderRangeSelection()}
                    </div>
                    <div className="contentContainer mt-6 flex flex-col">
                        <span className="text1">
                            NOTES!!!
                        </span>
                        <span className='text-lg font-normal ml-6 mt-2'>
                            • Make sure you have combined all separate files
                            <br/>
                            • Double check the process details including column{'(s)'} to process and step size
                            <br/>
                            • Ensure your fast track choice, normal process time and fast track can differ up to 
                            10 minutes of process time, and THATS A LOT OF TIME!!!
                        </span>
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