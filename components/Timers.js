import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Timer25({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div style={{ textAlign: 'center', margin: '5px', border: 'solid' }}>
      <p>25 min</p>
      <div style={{ fontSize: '30px' }}>
        <span>{String(days).padStart(2, '0')}</span>:
        <span>{String(hours).padStart(2, '0')}</span>:
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={resume}>Resume</Button>
      <Button onClick={() => {
        // Restarts to 25 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 1500);
        restart(time);
      }}
      >Restart
      </Button>
    </div>
  );
}

function Timer5({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div style={{ textAlign: 'center', margin: '5px', border: 'solid' }}>
      <p>5 min</p>
      <div style={{ fontSize: '30px' }}>
        <span>{String(days).padStart(2, '0')}</span>:
        <span>{String(hours).padStart(2, '0')}</span>:
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={resume}>Resume</Button>
      <Button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time);
      }}
      >Restart
      </Button>
    </div>
  );
}

function Timer30({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div style={{ textAlign: 'center', margin: '5px', border: 'solid' }}>
      <p>30 min</p>
      <div style={{ fontSize: '30px' }}>
        <span>{String(days).padStart(2, '0')}</span>:
        <span>{String(hours).padStart(2, '0')}</span>:
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={resume}>Resume</Button>
      <Button onClick={() => {
        // Restarts to 30 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 1800);
        restart(time);
      }}
      >Restart
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
