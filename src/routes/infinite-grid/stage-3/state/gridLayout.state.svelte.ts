import { observeResize, useLoop } from '$lib/interactions';
import type { GridState } from './grid.state.svelte';

export class GridLayout {
	static readonly ORIGIN_OFFSET = 10_000;

	private readonly _cellWidth = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).gridAutoColumns);
	});

	private readonly _cellHeight = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).gridAutoRows);
	});

	private readonly _gridColGap = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).columnGap);
	});

	private readonly _gridRowGap = $derived.by(() => {
		if (!this._grid.gridEL) return;
		observeResize.track();
		return parseFloat(getComputedStyle(this._grid.gridEL).rowGap);
	});

	private readonly _firstColumn = $derived.by(() => {
		if (!this._gridColGap || !this._cellWidth) return;
		return Math.floor(
			-(this._grid.camera.x + this._cellWidth + this._gridColGap) /
				(this._cellWidth + this._gridColGap)
		);
	});

	private readonly _firstRow = $derived.by(() => {
		if (!this._gridRowGap || !this._cellHeight) return;
		return Math.floor(
			-(this._grid.camera.y + this._cellHeight + this._gridRowGap) /
				(this._cellHeight + this._gridRowGap)
		);
	});

	private readonly _lastColumn = $derived.by(() => {
		if (!this._grid.containerWidth || !this._gridColGap || !this._cellWidth)
			return;
		const stride = this._cellWidth + this._gridColGap;
		const rightEdge = -this._grid.camera.x + this._grid.containerWidth + stride;
		return Math.ceil(rightEdge / stride) - 1;
	});

	private readonly _lastRow = $derived.by(() => {
		if (!this._grid.containerHeight || !this._gridRowGap || !this._cellHeight)
			return;

		const stride = this._cellHeight + this._gridRowGap;
		const bottomEdge =
			-this._grid.camera.y + this._grid.containerHeight + stride;

		return Math.ceil(bottomEdge / stride) - 1;
	});

	private readonly _noOfColumns = $derived.by(() => {
		if (!this._grid.gridEL) return;
		const count = getComputedStyle(this._grid.gridEL).gridTemplateColumns.split(
			' '
		).length;

		return count;
	});

	private readonly _noOfRows = $derived.by(() => {
		if (!this._noOfColumns || !this._grid.items.length) return 0;
		return Math.ceil(this._grid.items.length / this._noOfColumns);
	});

	readonly totalWidth = $derived.by(() => {
		if (!this._cellWidth || !this._gridColGap || !this._noOfColumns) return 0;
		return (
			this._noOfColumns * this._cellWidth +
			(this._noOfColumns - 1) * this._gridColGap
		);
	});

	readonly totalHeight = $derived.by(() => {
		if (!this._cellHeight || !this._gridRowGap || !this._noOfRows) return 0;
		return (
			this._noOfRows * this._cellHeight +
			(this._noOfRows - 1) * this._gridRowGap
		);
	});

	readonly visibleCells = $derived.by(() => {
		if (
			this._firstRow === undefined ||
			this._lastRow === undefined ||
			this._firstColumn === undefined ||
			this._lastColumn === undefined ||
			!this._noOfColumns
		)
			return;

		const cells = [];

		for (let row = this._firstRow; row <= this._lastRow; row++) {
			for (
				let column: number = this._firstColumn;
				column <= this._lastColumn;
				column++
			) {
				const rawIndex: number = row * this._noOfColumns + column;

				const index = useLoop(rawIndex, this._grid.items.length);
				const item = this._grid.items[index];
				if (!item) continue;

				cells.push({ row, column, item });
			}
		}
		return cells;
	});

	readonly originOffsetX = $derived.by(() => {
		if (!this._cellWidth || !this._gridColGap) return 0;
		observeResize.track();
		return GridLayout.ORIGIN_OFFSET * (this._cellWidth + this._gridColGap);
	});

	readonly originOffsetY = $derived.by(() => {
		if (!this._cellHeight || !this._gridRowGap) return 0;
		observeResize.track();
		return GridLayout.ORIGIN_OFFSET * (this._cellHeight + this._gridRowGap);
	});

	constructor(private readonly _grid: GridState) {}
}
