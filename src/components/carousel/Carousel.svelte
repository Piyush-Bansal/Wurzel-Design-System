<script lang="ts">
	import { Next, Previous, Indicator } from '$components/carousel';
	import { getCarouselState, setCarouselState } from './functionality.svelte';
	import type { Carousel } from './types';
	let {
		autoscroll = false,
		indicator = true,
		controls = true,
		reverse = false,
		count,
		children
	}: Carousel = $props();

	setCarouselState();
	const state = getCarouselState();

	state.count = count;
</script>

<div class="carousel__wrapper" bind:clientWidth={state.carouselWidth}>
	{@render children()}
</div>

{#if indicator}
	<Indicator></Indicator>
{/if}
