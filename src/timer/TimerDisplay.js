import React, { useEffect, useRef, useState } from "react";
import "./TimerDisplay.css";

export default function TimerDisplay({ ...props }) {
    const { count, handleDelete } = props;

    let timerRef = useRef();

    const [displayValue, setDisplayValue] = useState(count);
    const [pause, setPause] = useState(false);

    // decrement timer from input till 0
    function startTimer() {
        setDisplayValue((displayValue) => {
            if (displayValue > 0) {
                return displayValue - 1;
            } else {
                return displayValue;
            }
        });
    }

    useEffect(() => {
        setPause(false);
        timerRef.current = setInterval(startTimer, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    // handle delete timer
    function _deleteTimer() {
        clearInterval(timerRef.current);
        handleDelete();
    }

    // handle play/pause timer
    function _handleToggle() {
        if (!pause) {
            clearInterval(timerRef.current);
        } else {
            timerRef.current = setInterval(startTimer, 1000);
        }
        setPause((prevValue) => !prevValue);
    }

    // handle reset timer
    function _handleReset() {
        setDisplayValue(count);
    }

    const disabled = displayValue === 0;

    return (
        <div className="timer-display">
            <div className="timer-display__value">{`${displayValue}s`}</div>

            <div className="button-group space-around">
                <button
                    disabled={disabled}
                    className="btn-secondary"
                    onClick={_handleToggle}
                >
                    {pause ? "Play" : "Pause"}
                </button>

                <button
                    disabled={disabled}
                    className="btn-custom-yellow"
                    onClick={_handleReset}
                >
                    {"Reset"}
                </button>

                <button
                    disabled={!disabled}
                    className="btn-custom-red"
                    onClick={_deleteTimer}
                >
                    {"Delete"}
                </button>
            </div>
        </div>
    );
}
