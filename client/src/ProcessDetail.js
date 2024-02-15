import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import RadioButton from "./component/RadioButton.js";
import Button from "./component/Button.js";
import './css/ProcessDetail.css';
import { useStateCurrentStepContext } from './context/StepContext.js';

const columns = [
    'Isc_20mA',
    'Turn_off_80mA_',
    'Turn_off_80mA_HL',
    'Rf',
    'Rr',
]

export default function ProcessDetail() {
    const [columnIndex, setColumnIndex] = useState(-1);
    const setCurrStep = useStateCurrentStepContext();
    const navigate = useNavigate();

    const handleColumnSelected = (index) => {
        setColumnIndex(index);
        console.log(columnIndex);
    }

    const handleNextButtonPressed = () => {
        setCurrStep(2);
        navigate('/folder-processing');
    }

    const handleBackButtonPressed = () => {
        setCurrStep(0);
        navigate('/folder-selection');
    }

    const renderColumnButtons = columns.map((item, id) => {
        const index = id;
        return (
            <RadioButton name={item} id={index} key={index} dirSelected={handleColumnSelected} />
        )
    })

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
                            {renderColumnButtons}
                        </div>
                    </div>
                    <div className="contentContainer mt-6">
                        <span className="text1">
                            Is this a fast-track or nah:
                        </span>
                        <div className="columnContainer mt-6 flex flex-row">
                            <RadioButton name='Si' id={0} key={0} />
                            <RadioButton name='Ño' id={0} key={0} />
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