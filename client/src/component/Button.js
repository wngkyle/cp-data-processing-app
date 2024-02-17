import React from 'react';

export default function Button({ children, onClick }) {
    const handleButtonPressed = () => {
        onClick();
    }

    return (
        <button 
            type="button" 
            className="px-8 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
            onClick={handleButtonPressed}
        >
            {children}
        </button>
    );
}