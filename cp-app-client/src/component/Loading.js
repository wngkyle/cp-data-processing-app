import React from 'react';
import PagePreset from './PagePreset.js';
import { ThreeDots } from 'react-loader-spinner';

export default function Loading({ children }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <PagePreset>
                <div className='flex justify-center items-center mt-64'>
                    <ThreeDots 
                        color='#433BFF'
                        width='65'
                        height='35'
                    />
                </div>
            </PagePreset>
        </div>
    )
}