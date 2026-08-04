<script lang="ts">
	import { GridBehaviour } from './behaviour/grid.behaviour.svelte';
	import data from './data.json';
	import { GridState } from './state/grid.state.svelte';

	const style = [
		{
			ar: 'ar-4-3',
			span: 'span-5'
		},
		{
			ar: 'ar-1-1',
			span: 'span-4'
		},
		{
			ar: 'ar-2-3',
			span: 'span-3'
		}
	];

	const items = data.map((img) => ({
		...img,
		...style[Math.floor(Math.random() * style.length)]
	}));

	const gridState = new GridState();
	new GridBehaviour(gridState);
</script>

<div class="container | overflow-hidden">
	<div
		class="grid"
		bind:this={gridState.gridEL}
		role="presentation"
		onpointerdown={() => gridState.drag.start()}
	>
		{#each items as item}
			<img src={item.src} alt="" class={[item.ar, item.span]} />
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$sizes' as *;

	.container {
		height: 100vh;
	}

	.grid {
		align-items: center;
		width: fluid-l(2000);
		// justify-content: stretch;
		will-change: transform;
		cursor: grab;

		&:active {
			cursor: grabbing;
			user-select: none;
		}

		img {
			object-fit: cover;
			width: 100%;
		}
	}
</style>
