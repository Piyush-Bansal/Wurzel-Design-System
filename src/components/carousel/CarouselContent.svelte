<script lang="ts">
	import { getCarouselState } from './functionality.svelte';
	import type { CarouselContent } from './types';

	let {
		size = { lg: 500, md: 300, sm: 300 },
		gap = { lg: 16, md: 16, sm: 12 },
		children
	}: CarouselContent = $props();

	const carouselState = getCarouselState();

	//initiate the values in carouselState
	carouselState.width.lg = size.lg;
	carouselState.width.md = size.md;
	carouselState.width.sm = size.sm;

	carouselState.gap.lg = gap.lg;
	carouselState.gap.md = gap.md;
	carouselState.gap.sm = gap.sm;
</script>

<div class="overflow-hidden-x hide-scroll-bar">
	<div
		class="carousel__content | flex-row"
		style:gap={carouselState.getCarouselGap}
		bind:this={carouselState.carouselWrapper}
	>
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '$tokens/carousel' as *;
	@use '$sizes' as *;
	@use '$tokens/time' as *;
	.carousel__content {
		width: max-content;
		transform: translate($left-padding, 0);
		transition: transform $time-4 ease-in-out;
	}
</style>
