import React, { useState } from "react";
import TimerDisplay from "./TimerDisplay";

import "./Timer.css";

export default function Timer() {
    const [inputValue, setinputValue] = useState("");
    const [timerList, setTimerList] = useState([]);
    const ErrorMsg =
        "Only 10 timers can be added! Delete existing ones to add new.";

    function _handleChange(event) {
        let value = event.target.value;
        setinputValue(value);
    }

    // add timer to the list
    function _handleAddTimer() {
        if (timerList.length < 10) {
            setinputValue("");
            let list = [...timerList];
            list.push({
                id: timerList.length,
                value: Number(inputValue)
            });
            setTimerList([...list]);
        }
    }

    // handle timer delete from list
    function _handleTimerDelete(index) {
        let list = [...timerList];
        let found = list.findIndex((_f) => _f.id === index);
        if (found > -1) {
            list.splice(found, 1);
        }
        setTimerList([...list]);
    }

    return (
        <div>
            <h1>Timer Value :</h1>
            <div className="timer-view">
                <input
                    type="number"
                    value={inputValue}
                    placeholder="Enter time"
                    onChange={_handleChange}
                />
                <div className="add-timer-btn">
                    <button
                        className="btn-primary"
                        disabled={!inputValue}
                        onClick={_handleAddTimer}
                    >
                        Add timer
          </button>
                </div>

                {timerList.length === 10 && <div className="error-msg">{ErrorMsg}</div>}

                <div className="timer-display-wrapper">
                    {timerList.length > 0 &&
                        timerList.map((item) => {
                            return (
                                <TimerDisplay
                                    key={item.id}
                                    count={item.value}
                                    handleDelete={() => _handleTimerDelete(item.id)}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
