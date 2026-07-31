import {
	useBounds,
	useDistance,
	usePointer,
	useProximity
} from '$lib/interactions';

export class ButtonState {
	button = $state<HTMLElement>();
	readonly pointer = usePointer();
	readonly bounds = $derived(this.button && useBounds(this.button));

	readonly distance = $derived(
		this.pointer && this.bounds && useDistance(this.pointer, this.bounds)
	);

	readonly proximity = $derived(
		this.distance && useProximity(this.distance, { radius: 160 })
	);
}
