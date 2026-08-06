import { useBounds, useDrag, usePointer, useVelocity } from '$lib/interactions';

export class GridState {
	readonly pointer = usePointer();
	readonly velocity = useVelocity(this.pointer);
	readonly drag = useDrag(this.pointer, this.velocity);

	gridEL = $state<HTMLElement>();
	gridELHeight = $state<number>();
	gridELWidth = $state<number>();

	camera = $state({ x: 0, y: 0 });
	container = $state<HTMLDivElement>();
	containerDimensions = $derived(this.container && useBounds(this.container));
}
