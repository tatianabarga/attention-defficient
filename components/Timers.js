import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TimerEndedModal from './TimerEndedModal';

function Timer25({ expiryTimestamp }) {
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
      <p style={{ color: '#FE4A4A', margin: '5px' }}>Focus (25min)</p>
      <div className="timer-digits">
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#FE4A4A' }}
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 1500);
          restart(time);
        }}
      >START
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#FE4A4A' }}
        onClick={pause}
      >
        PAUSE
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#FE4A4A' }}
        onClick={resume}
      >
        RESUME
      </Button>
    </div>
  );
}

function Timer5({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div
      className="timer-div"
    >
      <p style={{ color: '#3E9F95', margin: '5px' }}>Short Break (5min)</p>
      <div className="timer-digits">
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#3E9F95' }}
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >START
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#3E9F95' }}
        onClick={pause}
      >
        PAUSE
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#3E9F95' }}
        onClick={resume}
      >
        RESUME
      </Button>
    </div>
  );
}

function Timer30({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div
      className="timer-div"
    >
      <p style={{ color: '#AF60FF', margin: '5px' }}>Long Break (30min)</p>
      <div className="timer-digits">
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#AF60FF' }}
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 1800);
          restart(time);
        }}
      >START
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#AF60FF' }}
        onClick={pause}
      >
        PAUSE
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#AF60FF' }}
        onClick={resume}
      >
        RESUME
      </Button>
    </div>
  );
}

Timer25.propTypes = {
  expiryTimestamp: PropTypes.instanceOf(Date).isRequired,
};

Timer5.propTypes = {
  expiryTimestamp: PropTypes.instanceOf(Date).isRequired,
};

Timer30.propTypes = {
  expiryTimestamp: PropTypes.instanceOf(Date).isRequired,
};

function Timers() {
  const time = new Date();
  const time25 = time.setSeconds(time.getSeconds() + 1500); // 25 minutes timer
  const time5 = time.setSeconds(time.getSeconds() + 300); // 5 minutes timer
  const time30 = time.setSeconds(time.getSeconds() + 1800); // 30 minutes timer

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Timer25 expiryTimestamp25={time25} />
      <Timer5 expiryTimestamp5={time5} />
      <Timer30 expiryTimestamp30={time30} />
    </div>
  );
}

export {
  Timer25,
  Timer5,
  Timer30,
  Timers,
};
