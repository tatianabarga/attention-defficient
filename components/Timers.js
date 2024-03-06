import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TimerEndedModal from './TimerEndedModal';

function TimerGen({
  expiryTimestamp,
  plusSeconds,
  btnColor,
  timerName,
}) {
  const {
    seconds,
    minutes,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => TimerEndedModal('Focus') });

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
        }}
      >START
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: btnColor }}
        onClick={pause}
      >
        PAUSE
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: btnColor }}
        onClick={resume}
      >
        RESUME
      </Button>
    </div>
  );
}

TimerGen.propTypes = {
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
      <TimerGen expiryTimestamp={time} plusSeconds={1500} btnColor="#FE4A4A" timerName="Focus (25min)" />
      <TimerGen expiryTimestamp={time} plusSeconds={300} btnColor="#3E9F95" timerName="Short Break (5min)" />
      <TimerGen expiryTimestamp={time} plusSeconds={1800} btnColor="#AF60FF" timerName="Long Break (30min)" />
    </div>
  );
}
