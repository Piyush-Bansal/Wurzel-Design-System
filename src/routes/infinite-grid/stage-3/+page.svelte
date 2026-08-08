<script lang="ts">
	import data from './data.json';
	import { GridState } from './state/grid.state.svelte';
	import { GridLayout } from './state/gridLayout.state.svelte';
	import { GridBehaviour } from './behaviour/grid.behaviour.svelte';

	const style = [
		{
			ar: 'ar-4-3'
		},
		{
			ar: 'ar-1-1'
		},
		{
			ar: 'ar-2-3'
		}
	];

	const items = data.map((img) => ({
		...img,
		...style[Math.floor(Math.random() * style.length)]
	}));

	const gridState = new GridState(items);

	const gridLayoutState = new GridLayout(gridState);
	new GridBehaviour(gridState, gridLayoutState);

	const GRID_ORIGIN_OFFSET = 10_000;
</script>

<div class="container | overflow-hidden" bind:this={gridState.container}>
	<div
		class="grid"
		bind:this={gridState.gridEL}
		bind:offsetHeight={gridState.gridELHeight}
		bind:offsetWidth={gridState.gridELWidth}
		role="presentation"
		onpointerdown={() => gridState.drag.start()}
	>
		{#each gridLayoutState.visibleCells as cell (cell.row + '-' + cell.column)}
			<div
				class="img-wrapper | center ar-1-1"
				style="grid-column: {cell.column + GRID_ORIGIN_OFFSET + 1} / span 1; 
				grid-row: {cell.row + GRID_ORIGIN_OFFSET + 1} / span 1;"
			>
				<img src={cell.item.src} alt="" class={[cell.item.ar]} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens' as *;

	.container {
		height: 100vh;
		overflow-x: hidden !important;
		overflow-y: hidden;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(5, fluid-l(400));
		grid-auto-columns: fluid-l(400);
		grid-auto-rows: fluid-l(400);

		will-change: transform;
		cursor: grab;
		gap: $size-4;

		&:active {
			cursor: grabbing;
			user-select: none;
		}

		img {
			object-fit: cover;
			pointer-events: none;
			max-width: $col-wide-3;
			max-height: $col-wide-3;
			user-select: none;
		}
	}
</style>
