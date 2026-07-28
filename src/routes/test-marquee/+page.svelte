<script>
	import { MarqueeBehaviour } from './behaviour/marquee.behaviour.svelte';
	import Item from './Item.svelte';
	import {
		getMarqueeState,
		setMarqueeState
	} from './state/marquee.state.svelte';

	setMarqueeState();
	const marqueeState = getMarqueeState();
	const behaviour = new MarqueeBehaviour(marqueeState);
</script>

<div class="container">
	<div class="wrapper" bind:this={marqueeState.marqueeWrapper}>
		{#each { length: 5 }, index}
			<Item {index} onpointerdown={() => behaviour.drag?.start()} />
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.container {
		margin-block: 200vh;
	}
	.wrapper {
		overflow: hidden;
		display: flex;
		flex-direction: row;
		gap: $gutter;
		width: 100%;
		align-items: flex-start;
		cursor: grab;

		&:active {
			cursor: grabbing;
			user-select: none;
		}
	}
</style>
