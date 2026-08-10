import gsap from 'gsap';
import { onMount } from 'svelte';

export function useTicker(callback: (deltaTime: number) => void) {
	onMount(() => {
		const tick = (_time: number, deltaTime: number) => {
			callback(deltaTime);
		};

		gsap.ticker.add(tick);

		return () => {
			gsap.ticker.remove(tick);
		};
	});
}
