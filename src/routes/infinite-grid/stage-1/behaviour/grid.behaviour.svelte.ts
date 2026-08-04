import type { GridState } from '../state/grid.state.svelte';

export class GridBehaviour {
	private _camera = $state({
		x: 0,
		y: 0
	});

	constructor(private readonly _grid: GridState) {
		$effect(() => {
			if (!this._grid.drag.isDragging || !this._grid.gridEL) return;
			this._camera.x += this._grid.drag.deltaX;
			this._camera.y += this._grid.drag.deltaY;

			const matrix = new DOMMatrix().translateSelf(
				this._camera.x,
				this._camera.y
			);

			this._grid.gridEL.style.transform = matrix.toString();
		});
	}
}
