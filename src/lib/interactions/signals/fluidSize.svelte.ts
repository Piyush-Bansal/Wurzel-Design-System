import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import {
	artBoardLarge,
	artBoardMedium,
	artBoardSmall,
	ssLargeHigh,
	ssLargeLow,
	ssMediumLow,
	ssSmallLow
} from '../../../global-state/screenSize.svelte';
import { browser } from '$app/env';
import { useClamp } from '../resources/clampValues.svelte';

interface Size {
	lg: number;
	md: number;
	sm: number;
}

class FluidSize {
	#subscribe;
	#innerWidth: number = 0;
	#screenSize: 'lg' | 'md' | 'sm' = 'lg';
	#fluidSize: number = 0;

	constructor(private readonly size: Size) {
		this.#currentBreakPoint();
		this.#calculateSize();

		this.#subscribe = createSubscriber(() => {
			const off = on(window, 'resize', () => {
				this.#currentBreakPoint();
				this.#calculateSize();
			});
			return () => off();
		});
	}

	#currentBreakPoint() {
		if (!browser) {
			this.#innerWidth = 0;
			return;
		}
		this.#innerWidth = useClamp(window.innerWidth, ssSmallLow, ssLargeHigh);
		innerWidth >= ssLargeLow
			? (this.#screenSize = 'lg')
			: this.#innerWidth >= ssMediumLow
				? (this.#screenSize = 'md')
				: (this.#screenSize = 'sm');
	}

	#calculateSize() {
		switch (this.#screenSize) {
			case 'lg': {
				this.#fluidSize = (this.size.lg / artBoardLarge) * this.#innerWidth;
				break;
			}
			case 'md': {
				this.#fluidSize = (this.size.md / artBoardMedium) * this.#innerWidth;
				break;
			}
			case 'sm': {
				this.#fluidSize = (this.size.sm / artBoardSmall) * this.#innerWidth;
				break;
			}
		}
	}

	get currentValue() {
		this.#subscribe();
		return this.#fluidSize;
	}
}

export function useFluidSize(size: Size) {
	return new FluidSize(size);
}
