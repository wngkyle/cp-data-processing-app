import React, { useState, useEffect } from "react";
import PagePreset2 from "./component/SplinePagePreset.js";
import { useNavigate } from "react-router-dom";
import { animated, useTrail } from '@react-spring/web';
import { useStateCurrentStepContext  } from "./context/StepContext.js";
import "./css/SplineHome.css";

export default function Home() {
    const navigate = useNavigate();
    const setCurrStep = useStateCurrentStepContext();
    const [showTitle, setShowTitle] = useState(false);

    const Title = ({ children }) => {
        const items = React.Children.toArray(children)
        const trail = useTrail(items.length, {
          config: { mass: 5, tension: 500, friction: 300 },
          opacity: showTitle ? 1 : 0,
          x: showTitle ? 0 : 50,
          height: showTitle ? 110 : 0,
          from: { opacity: 0, x: 50, height: 0 },
        })
        return (
          <div>
            {trail.map(({ height, ...style }, index) => (
              <animated.div key={index} className="helloText" style={style}>
                <animated.div style={{ height }}>{items[index]}</animated.div>
              </animated.div>
            ))}
          </div>
        )
    }

    const handleEnterButtonClicked = () => {
        console.log('HOME -> File Upload');
        setCurrStep(0);
        navigate('/folder-selection');
    }

    useEffect(() => {
        setShowTitle(true);
        return () => {
            setShowTitle(false);
        }
    }, [])

    return (
        <>
            <PagePreset2>
                <div className="homeContainer">
                    {/* <div className="helloTextContainer">
                        <Title>
                            <span>Hello and</span>
                            <span>Welcome to CP App</span>
                            <span>To CP App</span>
                        </Title>
                    </div> */}
                </div>
            </PagePreset2>
        </>
    );
};


// <span className="header-1">
//    Hello and Welcome 👋
//    {/* <iframe title='hand-waving' src="https://giphy.com/embed/c1CLe6VoaMviQz0s6z" width="150" height="100" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
//    {/* <iframe src="https://giphy.com/embed/jKkqqRlfzajljKVV5p" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Adbros-jKkqqRlfzajljKVV5p">via GIPHY</a></p> */}
// </span> 
// <button 
//    className="
//        px-6 py-4 text-xl tracking-wide text-white transition-colors duration-300 transform 
//        bg-blue-500 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 
//        focus:ring-opacity-80 enterButton"
//    onClick={handleEnterButtonClicked}
// >
//    Enter and Begin
// </button>
