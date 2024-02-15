import React, {
    useState,
} from 'react';

export default function RadioButton({ name, id, dirSelected }) {
    const [pressed, setPressed] = useState(false);

    const handleRadioButtonPressed = () => {
        setPressed(!pressed);
        dirSelected(id);
    }

    return (
        <div class="flex items-center mb-4 ml-16">
            <input 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600
                dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                id={id}
                type="radio" 
                value=""
                name="radio-button"
                onChange={handleRadioButtonPressed}
            />
            <label for="default-radio-1" class="ms-2 text-lg font-medium text-gray-900">{name}</label>
        </div>
    );
}