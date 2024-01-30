import React, { useState } from "react";
import axios from 'axios';
import PagePreset from "./component/PagePreset.js";
import NavBar from "./component/NavBar.js";
import { useNavigate } from "react-router-dom";


export default function FileUpload({ onChange }) {
    const [data, setData] = useState('N/A');
    const navigate = useNavigate();

    const makePostRequest = async (test) => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/test', test, { withCredentials: true });
            console.log(test);
            console.log('It says: ', response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
            setData(error);
        }
    }
       

    return (
        <>
            <PagePreset>
                <NavBar />
                <span>
                    File Upload Page
                </span>
                <br />
                <button onClick={makePostRequest}>
                    TESTESTESTEST
                </button>
                <br />
                <span>
                    {data}
                </span>
                <button
                    onClick={() => { navigate('/input-detail') }}
                >
                    NEXT
                </button>

            </PagePreset>
        </>
    );
};