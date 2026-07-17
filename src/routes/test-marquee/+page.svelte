<script>
	import { MarqueeBehaviour } from './behaviour/marquee.behaviour.svelte';
	import Item from './Item.svelte';
	import {
		getMarqueeState,
		setMarqueeState
	} from './state/marquee.state.svelte';

	setMarqueeState();
	const marqueeState = getMarqueeState();
	new MarqueeBehaviour(marqueeState);
</script>

<div class="container">
	<div class="wrapper" bind:this={marqueeState.marqueeWrapper}>
		{#each { length: 5 }, index}
			<Item {index} />
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.container {
		margin-top: $sec-gap-l;
	}
	.wrapper {
		overflow: hidden;
		display: flex;
		flex-direction: row;
		gap: $gutter;
		width: 100%;
		align-items: flex-start;
	}
</style>
