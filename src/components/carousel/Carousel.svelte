<script lang="ts">
	import { Indicator, Next, Previous } from '$components/carousel';
	import swipe from '$lib/helper-functions/swipe';
	import { time10, time5 } from '$lib/helper-functions/timing.svelte';
	import { getCarouselState, setCarouselState } from './functionality.svelte';
	import type { Carousel } from './types';
	let {
		autoscroll = false,
		indicator = true,
		controls = true,
		infinite = false,
		count,
		autoScrollDuration = time10,
		children
	}: Carousel = $props();

	setCarouselState();
	const currentState = getCarouselState();
	currentState.count = count;
	currentState.autoscrollDuration = autoScrollDuration;
	currentState.infinite = infinite;
	currentState.autoscroll = autoscroll;
</script>

<svelte:window
	onresize={() => {
		currentState.carouselPositions = [];
		currentState.calculatePositions();
	}}
/>

<div
	class="carousel__wrapper | relative"
	bind:clientWidth={currentState.carouselWidth}
	use:currentState.autoScrollFunc
	use:swipe={{
		leftFunction: currentState.nextSlide,
		rightFunction: currentState.previousSlide,
		throttleDuration: time5
	}}
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
