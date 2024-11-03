import React, { useState, useEffect } from 'react';

export default function RadioButton({ name, id, buttonName='radio-button', buttonPressed, buttonClassName, labelClassName, isChecked }) {
    const [pressed, setPressed] = useState(false);

    const handleRadioButtonPressed = () => {
        setPressed(!pressed);
        if (buttonName === 'radio-button') {
            buttonPressed(id);
        } else {
            buttonPressed();
        }
    }

    useEffect(() => {
        setPressed(false);
    },[])

    return (
        <div className="flex items-center mb-4 ml-16">
            <input 
                className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${buttonClassName || ''}`}
                id={id}
                type="radio" 
                value=""
                name={buttonName}
                onChange={handleRadioButtonPressed}
                checked={isChecked}
            />
            <label htmlFor="default-radio-1" className={`ms-2 text-lg font-medium text-gray-900 ${labelClassName || ''}`}>{name}</label>
        </div>
    );
}