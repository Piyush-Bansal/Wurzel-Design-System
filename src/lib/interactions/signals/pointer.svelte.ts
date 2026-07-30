import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';

class Pointer {
	#subscriber;

	#position = $state({
		x: 0,
		y: 0
	});

	constructor() {
		this.#subscriber = createSubscriber((update) => {
			const off = on(window, 'pointermove', (e) => {
				this.#position.x = e.offsetX;
				this.#position.y = e.offsetY;
			});
			return () => off();
		});
	}

	get x() {
		this.#subscriber();
		return this.#position.x;
	}

	get y() {
		this.#subscriber();
		return this.#position.y;
	}
}

const pointer = new Pointer();

export const usePointer = () => pointer;
