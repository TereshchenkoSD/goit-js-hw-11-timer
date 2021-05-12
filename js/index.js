const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  minutes: document.querySelector('[data-value="mins"]'),
  seconds: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.targetDate = targetDate;
    this.start();
    this.init();
  }

  init() {
    const { days, hours, mins, secs } = this.getTimeComponents(0);
    this.onTick({ days, hours, mins, secs });
  }

  start() {
    const startTime = this.targetDate;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('June 5, 2021'),
  onTick: upDateClockFace,
});

function upDateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${mins}`;
  refs.seconds.textContent = `${secs}`;
}
