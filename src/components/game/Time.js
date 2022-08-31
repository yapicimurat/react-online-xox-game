
import {useState} from "react";
import {useEffect} from "react";

function Time(){

    useEffect(() => {
        setInterval(() => {
            setTime(prevState => prevState + 1);
        }, 1000);
    }, []);

    const [time, setTime] = useState(0);

    return (
        <div className="time">
            <small>{time} sn.</small>
        </div>
    );
}

export default Time;
