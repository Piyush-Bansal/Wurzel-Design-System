import { observeResize, useBounds } from '$lib/interactions';
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

	constructor(private readonly _grid: GridState) {
		$effect(() => {
			$inspect(this._grid.gridELHeight);
		});
	}
}
