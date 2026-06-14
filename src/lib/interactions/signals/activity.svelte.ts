import type { usePointer } from './pointer.svelte';

export function useActivity(position: ReturnType<typeof usePointer>) {
	const ACTIVITY_THRESHOLD = 5_000;

	const startedAt = Date.now();

	let now = $state(startedAt);
	let lastActivity = $state<number | null>(null);

	let initialised = false;

	$effect(() => {
		const timer = setInterval(() => {
			now = Date.now();
		}, 1000);

		return () => clearInterval(timer);
	});

	$effect(() => {
		position.x;
		position.y;

		if (!initialised) {
			initialised = true;
			return;
		}

		const timestamp = Date.now();

		now = timestamp;
		lastActivity = timestamp;
	});

	return {
		get isActive() {
			const idleTime =
				lastActivity === null ? now - startedAt : now - lastActivity;

			return idleTime < ACTIVITY_THRESHOLD;
		},

		get idleTime() {
			return lastActivity === null ? now - startedAt : now - lastActivity;
		},

		get lastActivity() {
			return lastActivity === null ? null : new Date(lastActivity);
		}
	};
}
