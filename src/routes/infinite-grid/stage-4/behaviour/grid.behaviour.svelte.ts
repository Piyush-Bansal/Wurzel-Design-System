import { clampDeltaTime, useDecay, useTicker } from '$lib/interactions';
import type { GridState } from '../state/grid.state.svelte';
import type { GridLayout } from '../state/gridLayout.state.svelte';

export class GridBehaviour {
	private _velocity = { x: 0, y: 0 };

	constructor(
		private readonly _grid: GridState,
		private readonly _layout: GridLayout
	) {
		useTicker((deltaTime) => {
			this._tick(deltaTime);
			this._render();
		});
	}

	private _tick(deltaTime: number) {
		const dt = clampDeltaTime(deltaTime);

		if (this._grid.drag.isDragging) {
			this._velocity.x = this._grid.drag.velocityX * 1000;
			this._velocity.y = this._grid.drag.velocityY * 1000;
		} else {
			this._velocity.x = useDecay(this._velocity.x, 0, 0.95);
			this._velocity.y = useDecay(this._velocity.y, 0, 0.95);
		}

		this._grid.camera.x += this._velocity.x * dt;
		this._grid.camera.y += this._velocity.y * dt;
	}

	private _render() {
		const matrix = new DOMMatrix().translateSelf(
			this._grid.camera.x - this._layout.originOffsetX,
			this._grid.camera.y - this._layout.originOffsetY
		);
		this._grid.gridEL &&
			(this._grid.gridEL.style.transform = matrix.toString());
	}
}
