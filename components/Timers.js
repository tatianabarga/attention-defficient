import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from 'use-sound';
import woodSfx from '../utils/sounds/wood.mp3';
import dingSfx from '../utils/sounds/ding.mp3';

function Timer({
  expiryTimestamp,
  plusSeconds,
  btnColor,
  timerName,
}) {
  const [soundWood] = useSound(woodSfx);
  const [alert] = useSound(dingSfx);
  const [btnPush, setBtnPush] = useState(false);
  const {
    seconds,
    minutes,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => btnPush && alert() });

  return (
    <div
      className="timer-div"
    >
      <p style={{ color: btnColor, margin: '5px' }}>{timerName}</p>
      <div className="timer-digits">
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <Button
        className="btns-gen"
        style={{ backgroundColor: btnColor }}
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + plusSeconds);
          restart(time);
          soundWood();
          setBtnPush(true);
        }}
      >Start
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: btnColor }}
        onClick={() => {
          pause();
          soundWood();
        }}
      >
        Pause
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: btnColor }}
        onClick={() => {
          resume();
          soundWood();
        }}
      >
        Resume
      </Button>
    </div>
  );
}

Timer.propTypes = {
  expiryTimestamp: PropTypes.instanceOf(Date).isRequired,
  plusSeconds: PropTypes.number.isRequired,
  btnColor: PropTypes.string.isRequired,
  timerName: PropTypes.string.isRequired,
};

export default function Timers() {
  const time = new Date();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Timer expiryTimestamp={time} plusSeconds={1500} btnColor="#6dd6d3" timerName="Focus (25min)" />
      <Timer expiryTimestamp={time} plusSeconds={300} btnColor="#6dd6d3" timerName="Short Break (5min)" />
      <Timer expiryTimestamp={time} plusSeconds={1800} btnColor="#6dd6d3" timerName="Long Break (30min)" />
    </div>
  );
}
