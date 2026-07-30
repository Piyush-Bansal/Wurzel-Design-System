import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';

class Pointer {
	#subscriber;

	#x = 0;
	#y = 0;

	constructor() {
		this.#subscriber = createSubscriber((update) => {
			const off = on(window, 'pointermove', (e) => {
				this.#x = e.offsetX;
				this.#y = e.offsetY;
				update();
			});
			return () => off();
		});
	}

	get x() {
		this.#subscriber();
		return this.#x;
	}

	get y() {
		this.#subscriber();
		return this.#y;
	}
}

const pointer = new Pointer();

export const usePointer = () => pointer;
