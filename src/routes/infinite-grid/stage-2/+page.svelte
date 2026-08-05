<script lang="ts">
	import { GridBehaviour } from './behaviour/grid.behaviour.svelte';
	import data from './data.json';
	import { GridState } from './state/grid.state.svelte';

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
</script>

<div class="container | overflow-hidden">
	<div
		class="grid"
		bind:this={gridState.gridEL}
		role="presentation"
		onpointerdown={() => gridState.drag.start()}
	>
		{#each items as item}
			<div class="img-wrapper | center span-3 ar-1-1">
				<img src={item.src} alt="" class={[item.ar]} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens' as *;

	.container {
		height: 100vh;
	}

	.grid {
		// align-items: center;
		width: fluid-l(2000);
		will-change: transform;
		cursor: grab;
		gap: $size-4;

		&:active {
			cursor: grabbing;
			user-select: none;
		}

		// .img-wrapper {
		// 	height: $col-wide-3;
		// 	width: $col-wide-3;
		// }

		img {
			object-fit: cover;
			pointer-events: none;
			max-width: $col-wide-3;
			max-height: $col-wide-3;
		}
	}
</style>
