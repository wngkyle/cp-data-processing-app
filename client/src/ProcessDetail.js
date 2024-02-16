import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import RadioButton from "./component/RadioButton.js";
import RadioButton2 from "./component/RadioButton2.js";
import Button from "./component/Button.js";
import './css/ProcessDetail.css';
import { useStateCurrentStepContext } from './context/StepContext.js';
import { useColumnStepContext, useSetColumnStepContext } from "./context/ColumnStepContext.js";
import { AiOutlineClose } from "react-icons/ai";



export default function ProcessDetail() {
    const columnStep = useColumnStepContext();
    const setCurrStep = useStateCurrentStepContext();
    const setColumnStep = useSetColumnStepContext();
    const navigate = useNavigate();

    // Column select variables 
    const [isc20mA, setIsc20mA] = useState(false);
    const [turnOff80mA, setTurnOff80mA] = useState(false);
    const [turnOff80mAHL, setTurnOff80mAHL] = useState(false);
    const [rf, setRf] = useState(false);
    const [rr, setRr] = useState(false);

    // Fast track variables
    const [fastTrack, setFastTrack] = useState(false);

    // // Step variables 
    // const [isc20mAStep, setIsc20mAStep] = useState();
    // const [turnOff80mAStep, setTurnOff80mAStep] = useState();
    // const [turnOff80mAHLStep, setTurnOff80mAHLStep] = useState();
    // const [rfStep, setRfStep] = useState();
    // const [rrStep, setRrStep] = useState();

    // Handle column select variables
    const handleIsc20mAPressed = () => {
        setIsc20mA(!isc20mA);
    }
    const handleTurnOff80mAPressed = () => {
        setTurnOff80mA(!turnOff80mA);
    }
    const handleTurnOff80mAHLPressed = () => {
        setTurnOff80mAHL(!turnOff80mAHL);
    }
    const handleRfPressed = () => {
        setRf(!rf);
    }
    const handleRrPressed = () => {
        setRr(!rr);
    }

    // Handle fast track variable
    const handleFastTrackPressed = () => {
        setFastTrack(true);
        setColumnStep({...columnStep, 
            'fast-track': true
        });
    }
    const handleNoFastTrackPressed = () => {
        setFastTrack(false);
        setColumnStep({...columnStep, 
            'fast-track': false
        });
    }

    // Handle next and back button
    const handleNextButtonPressed = () => {
        console.log(columnStep);
        setCurrStep(2);
        navigate('/folder-processing');
    }
    const handleBackButtonPressed = () => {
        setCurrStep(0);
        navigate('/folder-selection');
    }

    // Handle step input
    const isc20mAUpdateText = (data) => {
        setColumnStep({...columnStep, 
            'Isc_20mA': data.target.value
        });
    }
    const turnOff80mAUpdateText = (data) => {
        setColumnStep({...columnStep, 
            'Turn_off_80mA_': data.target.value
        });
    }
    const turnOff80mAHLUpdateText = (data) => {
        setColumnStep({...columnStep,
            'Turn_off_80mA_HL': data.target.value
        });
    }
    const rfUpdateText = (data) => {
        setColumnStep({...columnStep,
            'Rf': data.target.value
        });
    }
    const rrUpdateText = (data) => {
        setColumnStep({...columnStep,
            'Rr': data.target.value
        });
    }

    // Render step input 
    const renderStepSelection = () => {
        return (
            <div className="stepContainer mt-6">
                { isc20mA === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Isc_20mA Step Size : <input name='isc_20mA step size' className='rounded-lg pl-2' onChange={isc20mAUpdateText} />
                        </label>
                    )
                } 
                { turnOff80mA === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Turn_off_80mA_ Step Size : <input name='turn_off_80mA_ step size' className='rounded-lg pl-2' onChange={turnOff80mAUpdateText} required='require'/>
                        </label>
                    )
                }
                { turnOff80mAHL === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Turn_off_80mA_HL Step Size : <input name='turn_off_80mA_hl step size' className='rounded-lg pl-2' onChange={turnOff80mAHLUpdateText} />
                        </label>
                    )
                }
                { rf === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Rf Step Size : <input name='rf step size' className='rounded-lg pl-2' onChange={rfUpdateText} />
                        </label>
                    )
                }
                { rr === true && (
                        <label className='ms-2 text-lg font-medium text-gray-900 ml-14'>
                            Rr Step Size : <input name='rr step size' className='rounded-lg pl-2' onChange={rrUpdateText} />
                        </label>
                    )
                }
            </div>
        );
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
                                    isc20mA === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleIsc20mAPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Isc_20mA' buttonName='Isc_20mA' id={0} checked={isc20mA} buttonPressed={handleIsc20mAPressed}/>
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    turnOff80mA === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleTurnOff80mAPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Turn_off_20mA_' buttonName='Turn_off_20mA_' id={1} checked={turnOff80mA} buttonPressed={handleTurnOff80mAPressed} />
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    turnOff80mAHL === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleTurnOff80mAHLPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Turn_off_20mA_HL' buttonName='Turn_off_20mA_HL' id={2} checked={turnOff80mAHL} buttonPressed={handleTurnOff80mAHLPressed}/>
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    rf === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleRfPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Rf' buttonName='Rf' id={3} checked={rf} buttonPressed={handleRfPressed}/>
                            </div>
                            <div className='subColumnContainer'>
                                {
                                    rr === true && (
                                        <button className='mb-4 ml-6 -mr-10' onClick={handleRrPressed}>
                                            <AiOutlineClose size={16} />
                                        </button>
                                    )
                                }
                                <RadioButton2 name='Rr' buttonName='Rr' id={4} checked={rr} buttonPressed={handleRrPressed}/>
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