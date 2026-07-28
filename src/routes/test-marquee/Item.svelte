<script lang="ts">
	import { MarqueeItem } from './state/item.state.svelte';
	import { getMarqueeState } from './state/marquee.state.svelte';
	import type { MarqueeItemType } from './types';

	let { index, onpointerdown }: MarqueeItemType = $props();

	const marqueeState = getMarqueeState();

	const marqueeItem = new MarqueeItem();

	$effect(() => {
		marqueeState.items[index] = marqueeItem;
	});
</script>

<div
	role="presentation"
	class="item"
	bind:this={marqueeItem.item}
	{onpointerdown}
>
	<div class="p-space">
		<p>Index: {index}</p>
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.item {
		flex-shrink: 0;
		aspect-ratio: 16/9;
		background-color: red;
		width: $col-wide-4;
		will-change: transform;

		div {
			padding-inline: $cntr-pad-x-1;
			padding-block: $cntr-pad-y-1;
		}
	}
</style>
