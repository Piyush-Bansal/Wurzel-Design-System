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

<div class="test"><h3>a</h3></div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$breakpoints' as *;

	.test {
		border: 1px solid red;
		display: flex;
		justify-content: center;
		width: fluid-l(589);
		@include mq(medium) {
			width: fluid-m(344);
		}

		@include mq(small) {
			width: fluid-s(324);
		}
	}
</style>
