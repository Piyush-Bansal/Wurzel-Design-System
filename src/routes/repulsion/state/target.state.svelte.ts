import {
	Bounds,
	useBounds,
	useClamp,
	useDistance,
	usePointer
} from '$lib/interactions';

export class RepulsionState {
	private _targetBounds: Bounds | undefined;
	targetDistance;
	private readonly _pointer = usePointer();

	constructor(readonly target: HTMLElement) {
		this._targetBounds = useBounds(target);
		this.targetDistance = $derived(
			useDistance(this._pointer, this._targetBounds)
		);
	}

	readonly direction = $derived.by(() => {
		if (!this.targetDistance) return;
		if (this.targetDistance.value === 0) return { x: 0, y: 0 };
		const x = this.targetDistance.x / this.targetDistance.value;
		const y = this.targetDistance.y / this.targetDistance.value;
		return { x, y };
	});

	readonly strength = $derived.by(() => {
		if (!this.targetDistance) return;
		const normalized = useClamp(this.targetDistance.value / 200, 0, 1);
		return (1 - normalized) ** 2;
	});
}
