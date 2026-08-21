import gsap from 'gsap';
import { onMount } from 'svelte';

let tick: (_time: number, deltaTime: number) => void;

let isActive = $state(false);

export function useTicker(callback: (deltaTime: number) => void) {
	onMount(() => {
		tick = (_time: number, deltaTime: number) => {
			callback(deltaTime);
		};

		return () => {
			gsap.ticker.remove(tick);
			isActive = false;
		};
	});

	return {
		add() {
			gsap.ticker.add(tick);
			isActive = true;
		},
		remove() {
			gsap.ticker.remove(tick);
			isActive = false;
		},
		get isActive() {
			return isActive;
		}
	};
}
