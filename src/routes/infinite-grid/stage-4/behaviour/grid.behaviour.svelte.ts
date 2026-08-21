import {
	clampDeltaTime,
	useDecay,
	useIntersection,
	useTicker
} from '$lib/interactions';
import { onMount } from 'svelte';
import type { GridState } from '../state/grid.state.svelte';
import type { GridLayout } from '../state/gridLayout.state.svelte';

export class GridBehaviour {
	private _velocity = { x: 0, y: 0 };
	private _intersection = useIntersection(() => this._grid.container);
	private _ticker;

	constructor(
		private readonly _grid: GridState,
		private readonly _layout: GridLayout
	) {
		this._ticker = useTicker((deltaTime) => {
			this._tick(deltaTime);
		});

		onMount(() => {
			this._render();
		});

		$effect(() => {
			if (
				this._intersection.isIntersecting &&
				this._ticker.isActive === false
			) {
				this._ticker.add();
			} else {
				this._ticker.remove();
			}

			return () => {
				this._intersection.disconnect();
			};
		});
	}

	private _tick(deltaTime: number) {
		const dt = clampDeltaTime(deltaTime);

		if (this._grid.drag.isDragging) {
			this._velocity.x = this._grid.drag.velocityX * 1000;
			this._velocity.y = this._grid.drag.velocityY * 1000;
			this._updateCamera(dt);
			this._render();
		} else {
			this._velocity.x = useDecay(this._velocity.x, 1000, deltaTime);
			this._velocity.y = useDecay(this._velocity.y, 1000, deltaTime);
			if (this._velocity.x || this._velocity.y) {
				this._updateCamera(dt);
				this._render();
			}
		}
	}

	private _updateCamera(dt: number) {
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
