import type { GridState } from '../state/grid.state.svelte';
import gsap from 'gsap';
import { onMount } from 'svelte';
import type { GridLayout } from '../state/gridLayout.state.svelte';

export class GridBehaviour {
	private _velocity = { x: 0, y: 0 };

	constructor(
		private readonly _grid: GridState,
		private readonly _layout: GridLayout
	) {
		onMount(() => {
			gsap.ticker.add(this._tick);
			return () => gsap.ticker.remove(this._tick);
		});
	}

	private _tick = (_: number, deltaTime: number) => {
		const dt = Math.min(deltaTime / 1000, 1 / 30);

		if (this._grid.drag.isDragging) {
			this._velocity.x = this._grid.drag.velocityX * 1000;
			this._velocity.y = this._grid.drag.velocityY * 1000;
		} else {
			this._velocity.x *= 0.95;
			this._velocity.y *= 0.95;
		}

		this._grid.camera.x += this._velocity.x * dt;
		this._grid.camera.y += this._velocity.y * dt;
		this._render();
	};

	private _render() {
		const offsetX = this._layout.originOffsetX; // GRID_ORIGIN_OFFSET * strideX
		const offsetY = this._layout.originOffsetY; // GRID_ORIGIN_OFFSET * strideY

		const matrix = new DOMMatrix().translateSelf(
			this._grid.camera.x - offsetX,
			this._grid.camera.y - offsetY
		);
		this._grid.gridEL &&
			(this._grid.gridEL.style.transform = matrix.toString());
	}
}
