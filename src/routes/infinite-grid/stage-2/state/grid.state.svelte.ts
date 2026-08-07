import { useDrag, usePointer, useVelocity } from '$lib/interactions';

export type GridItems = {
	ar: string;
	id: number;
	src: string;
}[];

export class GridState {
	readonly pointer = usePointer();
	readonly velocity = useVelocity(this.pointer);
	readonly drag = useDrag(this.pointer, this.velocity);

	gridEL = $state<HTMLElement>();
	gridELHeight = $state<number>();
	gridELWidth = $state<number>();

	camera = $state({ x: 0, y: 0 });
	container = $state<HTMLDivElement>();

	containerWidth = $derived.by(() => {
		if (!this.container) return;
		const leftPadding = parseFloat(
			getComputedStyle(this.container).paddingInlineStart
		);
		const rightPadding = parseFloat(
			getComputedStyle(this.container).paddingInlineEnd
		);
		const width = this.container.clientWidth;

		return width - leftPadding - rightPadding;
	});

	containerHeight = $derived(this.container && this.container.clientHeight);

	constructor(public items: GridItems) {}
}
