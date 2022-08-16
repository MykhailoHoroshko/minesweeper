import { makeAutoObservable } from "mobx";

export class Timer {
  secondsPassed = 0;
  interval: NodeJS.Timer | null = null;
  startedAt: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed = (performance.now() - this.startedAt) / 1000;
  }

  start() {
    this.startedAt = performance.now();
    this.interval = setInterval(() => {
      this.increaseTimer();
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.increaseTimer();
    return this.secondsPassed;
  }
}
