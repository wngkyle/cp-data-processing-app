import React, {
    useState,
} from 'react';

export default function RadioButton2({name, buttonName, id, checked, buttonPressed, buttonClassName, labelClassName}) {
    const [pressed, setPressed] = useState(false);

    const handleRadioButtonPressed = () => {
        setPressed(!pressed);
        if (buttonName === 'radio-button') {
            buttonPressed(id);
        } else {
            buttonPressed();
        }
    }

    return (
        <div className="flex items-center mb-4 ml-16">
            <input 
                className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${buttonClassName || ''}`}
                name={buttonName}
                id={id}
                onChange={handleRadioButtonPressed}
                checked={checked}
                type="radio" 
                value=""
            />
            <label htmlFor="default-radio-1" className={`ms-2 text-lg font-medium text-gray-900 ${labelClassName || ''}`}>{name}</label>
        </div>
    )
}
