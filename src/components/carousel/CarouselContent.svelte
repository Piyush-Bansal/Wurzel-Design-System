<script lang="ts">
	import { getCarouselState } from './functionality.svelte';
	import type { CarouselContent } from './types';

	let { size = { lg: 500, md: 300, sm: 300 }, children }: CarouselContent =
		$props();

	const state = getCarouselState();
	state.width.lg = size.lg;
	state.width.md = size.md;
	state.width.sm = size.sm;
</script>

<div class=" overflow-hidden-x | hide-scroll-bar">
	<div class="carousel__content | flex-row">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '$tokens/carousel' as *;
	@use '$sizes' as *;
	.carousel__content {
		gap: $carousel-gap;
		width: max-content;
	}
</style>
