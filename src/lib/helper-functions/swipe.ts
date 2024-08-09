import type { Action } from 'svelte/action';
import { onDestroy } from 'svelte';
import throttle from './throttle';

interface SwipeOptions {
	leftFunction?: () => void;
	rightFunction?: () => void;
	topFunction?: () => void;
	bottomFunction?: () => void;
	throttleDuration: number;
	threshold?: number;
}

interface TouchPosition {
	x: number;
	y: number;
}

class SwipeHandler {
	private startPos: TouchPosition;
	private endPos: TouchPosition;
	private options: SwipeOptions;

	constructor(options: SwipeOptions) {
		this.options = options;
		this.startPos = { x: 0, y: 0 };
		this.endPos = { x: 0, y: 0 };
		this.touchEnd = throttle(
			this.touchEnd.bind(this),
			this.options.throttleDuration
		);
	}

	private resetPositions(): void {
		this.startPos = { x: 0, y: 0 };
		this.endPos = { x: 0, y: 0 };
	}

	private getTouch(e: TouchEvent): Touch | null {
		return e.touches.item(0) || e.changedTouches.item(0);
	}

	public touchStart = (e: TouchEvent): void => {
		const touch = this.getTouch(e);
		if (touch) {
			this.startPos = { x: touch.clientX, y: touch.clientY };
		}
	};

	public touchEnd = (e: TouchEvent): void => {
		const touch = this.getTouch(e);
		if (touch) {
			this.endPos = { x: touch.clientX, y: touch.clientY };
			this.handleSwipe();
		}
		this.resetPositions();
	};

	private handleSwipe(): void {
		const deltaX = this.endPos.x - this.startPos.x;
		const deltaY = this.endPos.y - this.startPos.y;
		const threshold = this.options.threshold || 50; // Default threshold

		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
			if (deltaX > 0) {
				this.options.rightFunction?.();
			} else {
				this.options.leftFunction?.();
			}
		} else if (Math.abs(deltaY) > threshold) {
			if (deltaY > 0) {
				this.options.bottomFunction?.();
			} else {
				this.options.topFunction?.();
			}
		}
	}
}

const swipe: Action<HTMLElement, SwipeOptions> = (node, options) => {
	const handler = new SwipeHandler(options);

	node.addEventListener('touchstart', handler.touchStart);
	node.addEventListener('touchend', handler.touchEnd);

	onDestroy(() => {
		node.removeEventListener('touchstart', handler.touchStart);
		node.removeEventListener('touchend', handler.touchEnd);
	});
};

export default swipe;
