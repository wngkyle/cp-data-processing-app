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
            {/* <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg> */}
            {children}
        </button>
    );
}