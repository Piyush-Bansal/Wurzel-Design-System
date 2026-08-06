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

	const gridState = new GridState();
	new GridBehaviour(gridState);

	const gridLayoutState = new GridLayout(gridState);
</script>

<svelte:window
	bind:innerHeight={gridLayoutState.windowHeight}
	bind:innerWidth={gridLayoutState.windowWidth}
/>

<div class="container | overflow-hidden" bind:this={gridState.container}>
	<div
		class="grid"
		bind:this={gridState.gridEL}
		bind:offsetHeight={gridState.gridELHeight}
		bind:offsetWidth={gridState.gridELWidth}
		role="presentation"
		onpointerdown={() => gridState.drag.start()}
	>
		{#each items as item, i (item.id)}
			<div class="img-wrapper | center span-3 ar-1-1">
				<img
					src={item.src}
					alt=""
					class={[item.ar]}
					bind:offsetWidth={
						null,
						(width) => {
							if (i === 0 && typeof width === 'number') {
								gridLayoutState.cellWidth = width;
							}
						}
					}
					bind:offsetHeight={
						null,
						(height) => {
							if (i === 0 && typeof height === 'number') {
								gridLayoutState.cellHeight = height;
							}
						}
					}
				/>
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
		width: fluid-l(2000);
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
		}
	}
</style>
