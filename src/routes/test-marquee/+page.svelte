<script>
	import { MarqueeBehaviour } from './behaviour/marquee.behaviour.svelte';
	import Item from './Item.svelte';
	import {
		getMarqueeState,
		setMarqueeState
	} from './state/marquee.state.svelte';

	setMarqueeState();
	const marqueeState = getMarqueeState();
	// new MarqueeBehaviour(marqueeState);
</script>

<div class="container">
	<div class="wrapper | relative" bind:this={marqueeState.marqueeWrapper}>
		{#each { length: 5 }, index}
			<Item {index} />
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.container {
		overflow: hidden;
		margin-top: $sec-gap-l;
		height: 500px;
	}
	.wrapper {
		display: flex;
		flex-direction: row;
		gap: $gutter;
		width: fit-content;
		align-items: flex-start;
	}
</style>
