import { useState, useEffect } from 'react';

export default function Clock(props) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect will run once on mount and cleanup on unmount

    return (
        <h2>
            It is {time.toLocaleTimeString()}.
        </h2>
    );
}