import { browser } from '$app/env';
import { onDestroy } from 'svelte';

const state = $state({
	x: 0,
	y: 0
});

let consumers = 0;

const pointer = {
	get x() {
		return state.x;
	},

	get y() {
		return state.y;
	}
};

function handlePointerMove(e: PointerEvent) {
	state.x = e.clientX;
	state.y = e.clientY;
}

function attach() {
	window.addEventListener('pointermove', handlePointerMove);
}

function detach() {
	window.removeEventListener('pointermove', handlePointerMove);
}

export function usePointer() {
	if (!browser) {
		return pointer;
	}

	consumers++;

	if (consumers === 1) {
		attach();
	}

	onDestroy(() => {
		consumers--;

		if (consumers === 0) {
			detach();
		}
	});

	return pointer;
}
