import { observeResize } from '$lib/interactions';
import type { GridState } from './grid.state.svelte';

export class GridLayout {
	cellWidth = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).gridAutoColumns);
	});

	cellHeight = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).gridAutoRows);
	});

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
		return Math.max(
			0,
			Math.floor(-this._grid.camera.x / (this.cellWidth + this._gridColGap))
		);
	});

	firstRow = $derived.by(() => {
		if (!this._gridRowGap || !this.cellHeight) return;
		return Math.max(
			0,
			Math.floor(-this._grid.camera.y / (this.cellHeight + this._gridRowGap))
		);
	});

	lastColumn = $derived.by(() => {
		if (!this._grid.containerWidth || !this._gridColGap || !this.cellWidth)
			return;
		const stride = this.cellWidth + this._gridColGap;
		const rightEdge = -this._grid.camera.x + this._grid.containerWidth;
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
		if (!this._grid.gridEL) return;
		const count = getComputedStyle(this._grid.gridEL).gridTemplateColumns.split(
			' '
		).length;

		return count;
	});

	noOfRows = $derived.by(() => {
		if (!this.noOfColumns || !this._grid.items.length) return 0;
		return Math.ceil(this._grid.items.length / this.noOfColumns);
	});

	totalWidth = $derived.by(() => {
		if (!this.cellWidth || !this._gridColGap || !this.noOfColumns) return 0;
		return (
			this.noOfColumns * this.cellWidth +
			(this.noOfColumns - 1) * this._gridColGap
		);
	});

	totalHeight = $derived.by(() => {
		if (!this.cellHeight || !this._gridRowGap || !this.noOfRows) return 0;
		return (
			this.noOfRows * this.cellHeight + (this.noOfRows - 1) * this._gridRowGap
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
