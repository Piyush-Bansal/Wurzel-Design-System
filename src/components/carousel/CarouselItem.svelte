<script lang="ts">
	import { getCarouselState } from './functionality.svelte';
	import type { CarouselItem } from './types';

	let { children }: CarouselItem = $props();
	const state = getCarouselState();
	const carouselWidth = state.getCarouselWidth;
	$inspect(state.getCarouselWidth);
</script>

<div class="carousel__item" style:width={carouselWidth}>
	{@render children()}
</div>

<style lang="scss">
</style>
