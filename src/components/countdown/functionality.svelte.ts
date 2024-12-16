import { getContext, setContext } from 'svelte';
import type { CountDownState, DateFormat } from './types';
class Countdown implements CountDownState {
	interval: undefined | number;
	diff: number = $state(0);
	days: number = $state(0);
	hr: number = $state(0);
	min: number = $state(0);
	sec: number = $state(0);
	targetDate: DateFormat = '2025-01-01T00:00:00';

	calculateTimeLeft(): void {
		const target = new Date(this.targetDate);
		const now = new Date();
		this.diff = target.getTime() - now.getTime();

		if (this.diff <= 0) {
			this.clearInterval();
			this.resetTimeLeft();
			return;
		}

		this.computeTime();
		this.interval = setInterval(this.calculateTimeLeft.bind(this), 1000); // setInterval
	}

	resetTimeLeft(): void {
		this.days = 0;
		this.hr = 0;
		this.min = 0;
		this.sec = 0;
	}

	clearInterval(): void {
		clearInterval(this.interval);
	}

	computeTime(): void {
		this.days = Math.floor(this.diff / (1000 * 60 * 60 * 24));
		this.hr = Math.floor((this.diff / (1000 * 60 * 60)) % 24);
		this.min = Math.floor((this.diff / (1000 * 60)) % 60);
		this.sec = Math.floor((this.diff / 1000) % 60);
	}
}

const COUNTDOWN_KEY = Symbol('COUNTDOWN');

export const setCountDownState = () =>
	setContext(COUNTDOWN_KEY, new Countdown());
export const getCountDownState = () =>
	getContext<CountDownState>(COUNTDOWN_KEY);
