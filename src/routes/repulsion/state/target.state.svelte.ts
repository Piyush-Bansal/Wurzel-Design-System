import {
	Bounds,
	useBounds,
	useClamp,
	useDistance,
	usePointer
} from '$lib/interactions';

export class RepulsionState {
	private _targetBounds: Bounds | undefined;
	private _targetDistance;
	private readonly _pointer = usePointer();

	constructor(readonly target: HTMLElement) {
		this._targetBounds = useBounds(target);
		this._targetDistance = $derived(
			useDistance(this._pointer, this._targetBounds)
		);

		$effect(() => {
			$inspect(this.strength);
		});
	}

	readonly direction = $derived.by(() => {
		if (!this._targetDistance) return;
		if (this._targetDistance.value === 0) return { x: 0, y: 0 };
		const x = this._targetDistance.x / this._targetDistance.value;
		const y = this._targetDistance.y / this._targetDistance.value;
		return { x, y };
	});

	readonly strength = $derived.by(() => {
		if (!this._targetDistance) return;
		const normalized = useClamp(this._targetDistance.value / 200, 0, 1);
		return 1 - normalized;
	});
}
