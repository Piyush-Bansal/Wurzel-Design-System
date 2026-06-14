import type { usePointer } from './pointer.svelte';

export function useActivity(position: ReturnType<typeof usePointer>) {
	const ACTIVITY_THRESHOLD = 5_000;
	const TICK_INTERVAL = 50;

	let lastActivityTime = $state(Date.now());
	let tick = $state(0);

	$effect(() => {
		position.x;
		position.y;

		lastActivityTime = Date.now();
	});

	$effect(() => {
		const interval = setInterval(() => {
			tick++;
		}, TICK_INTERVAL);

		return () => clearInterval(interval);
	});

	const idleTime = $derived.by(() => {
		tick;
		return Date.now() - lastActivityTime;
	});

	const isActive = $derived(idleTime < ACTIVITY_THRESHOLD);

	return {
		get isActive() {
			return isActive;
		},

		get idleTime() {
			return idleTime;
		},

		get lastActivity() {
			return lastActivityTime;
		}
	};
}
