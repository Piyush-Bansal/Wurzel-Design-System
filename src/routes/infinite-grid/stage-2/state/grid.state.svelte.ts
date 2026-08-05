import { useDrag, usePointer, useVelocity } from '$lib/interactions';

export class GridState {
	readonly pointer = usePointer();
	readonly velocity = useVelocity(this.pointer);
	readonly drag = useDrag(this.pointer, this.velocity);

	gridEL = $state<HTMLElement>();

	camera = $state({ x: 0, y: 0 });
}
