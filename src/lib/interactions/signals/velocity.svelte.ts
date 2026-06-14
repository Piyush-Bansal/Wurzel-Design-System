import type { usePointer } from '../signals/pointer.svelte';

export function useVelocity(pointer: ReturnType<typeof usePointer>) {
	const previousPosition = { x: 0, y: 0 };

	const dX = $derived.by(() => {
		const delta = pointer.x - previousPosition.x;
		previousPosition.x = pointer.x;
		return delta;
	});

	const dY = $derived.by(() => {
		const delta = pointer.y - previousPosition.y;
		previousPosition.y = pointer.y;
		return delta;
	});

	const speed = $derived(Math.hypot(dX, dY));
	const angleRadian = $derived(Math.atan2(dY, dX));
	const angleDegree = $derived(angleRadian * (180 / Math.PI));

	return {
		get dX() {
			return dX;
		},
		get dY() {
			return dY;
		},
		get speed() {
			return speed;
		},
		get angleRadian() {
			return angleRadian;
		},
		get angleDegree() {
			return angleDegree;
		}
	};
}
