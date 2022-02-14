import React from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import "./SkillExamTimerStyle.css";

const renderTime = ({remainingTime}) => {

    if (remainingTime === 0) {
        window.location.href = "/skill/exam/save";
    }

    localStorage.setItem('time', Math.round(remainingTime / 60));

    return (
        <div className="timer">
            <div className="text">เวลาคงเหลือ</div>
            {
                localStorage.getItem('time') === 0 ?
                    <p>5555555555</p>
                    :
                    remainingTime / 60 <= 3 ?
                        <div className="value-red">{Math.round(remainingTime / 60)}</div>
                        :
                        <div className="value">{Math.round(remainingTime / 60)}</div>

            }
            <div className="text">นาที</div>
        </div>
    );
};

export default function SkillExamTimer(props) {

    return (
        <div className="timer-wrapper">
            <CountdownCircleTimer isPlaying duration={props.skillTime * 60} colors={"#2ECC71"}
                                  colorsTime={[10, 6, 3, 0]} size={110}
                                  onComplete={() => ({
                                      shouldRepeat: true,
                                      delay: 1
                                  })}>
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
}