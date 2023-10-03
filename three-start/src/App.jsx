import React, { useEffect, useRef } from 'react';
import Sketch from '../three/app.js';
import "./style.css";

function App() {
    const containerRef = useRef(null);

    useEffect(() => {
        const sketchInstance = new Sketch(containerRef.current);

        return () => {
            sketchInstance.stop();
        };
    }, []);

    return (
        <div className={"container"} ref={containerRef}>
        </div>
    );
}

export default App;

