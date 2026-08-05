import { observeResize, useBounds } from '$lib/interactions';
import type { GridState } from './grid.state.svelte';

export class GridLayout {
	cellWidth = $state<number>();
	cellHeight = $state<number>();

	private readonly _bounds = $derived.by(
		() => this._grid.gridEL && useBounds(this._grid.gridEL)
	);

	private _gridHeight = $derived(this._bounds && this._bounds.rect.height);
	private _gridWidth = $derived(this._bounds && this._bounds.rect.width);

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

	private readonly firstCol = $derived(this._bounds?.rect.left);

	constructor(private readonly _grid: GridState) {
		$effect(() => {
			$inspect(this.firstCol);
		});
	}
}
