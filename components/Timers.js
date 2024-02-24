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
    <div style={{ textAlign: 'center', margin: '5px', border: 'solid' }}>
      <p>Focus (25min)</p>
      <div style={{ fontSize: '30px' }}>
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <Button onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 1500);
        restart(time);
      }}
      >Start
      </Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={resume}>Resume</Button>
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
    <div style={{ textAlign: 'center', margin: '5px', border: 'solid' }}>
      <p>Short Break (5min)</p>
      <div style={{ fontSize: '30px' }}>
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <Button onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time);
      }}
      >Start
      </Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={resume}>Resume</Button>
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
    <div style={{ textAlign: 'center', margin: '5px', border: 'solid' }}>
      <p>Long Break (30min)</p>
      <div style={{ fontSize: '30px' }}>
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <Button onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 1800);
        restart(time);
      }}
      >Start
      </Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={resume}>Resume</Button>
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
    <div>
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
