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
		if (!this._gridRowGap || !this.cellHeight) return;
		return Math.floor(
			Math.abs(this._grid.camera.y) / (this.cellHeight + this._gridRowGap)
		);
	});

	lastColumn = $derived.by(() => {
		if (!this._grid.containerWidth || !this._gridColGap || !this.cellWidth)
			return;

		const stride = this.cellWidth + this._gridColGap;
		const rightEdge = Math.abs(this._grid.camera.x) + this._grid.containerWidth;

		return Math.ceil(rightEdge / stride) - 1;
	});

	lastRow = $derived.by(() => {
		if (!this._grid.containerHeight || !this._gridRowGap || !this.cellHeight)
			return;

		const stride = this.cellHeight + this._gridRowGap;
		const bottomEdge =
			Math.abs(this._grid.camera.y) + this._grid.containerHeight;

		return Math.ceil(bottomEdge / stride) - 1;
	});

	noOfColumns = $derived.by(() => {
		if (!this.cellWidth || !this._gridColGap || !this._grid.gridELWidth) return;
		const combinedWidth = this.cellWidth + this._gridColGap;
		return Math.floor(
			(this._grid.gridELWidth + this._gridColGap) / combinedWidth
		);
	});

	visibleCells = $derived.by(() => {
		if (
			this.firstRow === undefined ||
			this.lastRow === undefined ||
			this.firstColumn === undefined ||
			this.lastColumn === undefined ||
			!this.noOfColumns
		)
			return;

		const cells = [];

		for (let row = this.firstRow; row <= this.lastRow; row++) {
			for (let column = this.firstColumn; column <= this.lastColumn; column++) {
				const index = row * this.noOfColumns + column;
				const item = this._grid.items[index];
				if (!item) continue;

				cells.push({ row, column, item });
			}
		}
		return cells;
	});

	constructor(private readonly _grid: GridState) {}
}
