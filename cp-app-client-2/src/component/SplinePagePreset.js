import React, { useEffect, useRef, useState } from "react";
import { animated, useTrail } from '@react-spring/web';
import './css/SplinePagePreset.css';

export default function PagePreset2({ children }) {
    const lineRef = useRef(null);
    const [showTitle, setShowTitle] = useState(false);

    const Title = ({ children }) => {
        const items = React.Children.toArray(children)
        const trail = useTrail(items.length, {
          config: { mass: 5, tension: 500, friction: 300 },
          opacity: showTitle ? 1 : 0,
          x: showTitle ? 0 : 20,
          height: showTitle ? 110 : 0,
          from: { opacity: 0, x: 20, height: 0 },
        })
        return (
          <div>
            {trail.map(({ height, ...style }, index) => (
              <animated.div key={index} className="trailsText" style={style}>
                <animated.div style={{ height }}>{items[index]}</animated.div>
              </animated.div>
            ))}
          </div>
        )
    }


    useEffect(() => {
        lineRef.current.classList.add('stretch');
        setShowTitle(!showTitle);
        return () => {
            setShowTitle(false);
        }
    }, []);

    return (
        <div>
            <iframe 
                title='relay'
                className="spline-relay-background"
                src='https://my.spline.design/rotationrelaymousehover-3762f812a1cd7cd02cabc21e0ab50a4d/' 
                frameborder='0' 
                width='100%' 
                height='100%'
            >
            </iframe>
            <div className="container">
                <div className="header-container">
                    <div className="line-container">
                        <div ref={lineRef} className="vertical-line" />
                    </div>
                    <div className="titleContainer">
                        <Title>
                            <span>TOWARD</span>
                            <span>RELAY</span>
                        </Title>
                    </div>
                </div>
                <div>
                    { children }
                </div>
            </div>
        </div>
    );
}