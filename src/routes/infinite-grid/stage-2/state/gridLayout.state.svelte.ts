import { observeResize } from '$lib/interactions';
import type { GridState } from './grid.state.svelte';

export class GridLayout {
	cellWidth = $state<number>();
	cellHeight = $state<number>();

	private _gridColGap = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).columnGap);
	});

	private _gridRowGap = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).rowGap);
	});

	windowWidth = $state<number>();
	windowHeight = $state<number>();

	firstColumn = $derived.by(() => {
		if (!this._gridColGap || !this.cellWidth) return;
		return Math.floor(
			Math.abs(this._grid.camera.x) / (this.cellWidth + this._gridColGap)
		);
	});

	firstRow = $derived.by(() => {
		if (!this._gridRowGap || !this.cellWidth) return;
		return Math.floor(
			Math.abs(this._grid.camera.y) / (this.cellWidth + this._gridRowGap)
		);
	});

	lastColumn = $derived.by(() => {
		if (
			!this._grid.containerDimensions?.rect.width ||
			!this._gridRowGap ||
			!this.cellWidth
		)
			return;
		return Math.floor(
			(Math.abs(this._grid.camera.x) +
				this._grid.containerDimensions?.rect.width) /
				(this.cellWidth + this._gridRowGap)
		);
	});

	constructor(private readonly _grid: GridState) {
		$effect(() => {
			$inspect(this.lastColumn);
		});
	}
}
