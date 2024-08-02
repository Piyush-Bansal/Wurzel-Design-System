<script lang="ts">
	import { Indicator, Next, Previous } from '$components/carousel';
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

<div
	class="carousel__wrapper | relative"
	bind:clientWidth={state.carouselWidth}
>
	{#if controls}
		<Previous></Previous>
	{/if}
	{@render children()}
	{#if controls}
		<Next></Next>
	{/if}
</div>

{#if indicator}
	<Indicator></Indicator>
{/if}
