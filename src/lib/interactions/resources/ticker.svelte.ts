import gsap from 'gsap';
import { onDestroy } from 'svelte';

export function useTicker(callback: (deltaTime: number) => void) {
	const tick = (_time: number, deltaTime: number) => {
		callback(deltaTime);
	};

	gsap.ticker.add(tick);
	onDestroy(() => {
		gsap.ticker.remove(tick);
	});
}
