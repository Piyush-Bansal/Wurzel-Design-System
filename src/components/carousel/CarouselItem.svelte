<script lang="ts">
	import { getCarouselState } from './functionality.svelte';
	import type { CarouselItem } from './types';

	let { children }: CarouselItem = $props();
	const state = getCarouselState();
</script>

<div class="carousel__item" style:width={state.getCarouselWidth}>
	{@render children()}
</div>

<style lang="scss">
</style>
