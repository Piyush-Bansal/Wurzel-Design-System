<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getCarouselState } from './functionality.svelte';
	import { time2, time3, time5 } from '$lib/helper-functions/timing.svelte';
	import { circIn, circOut } from 'svelte/easing';
	import throttle from '$lib/helper-functions/throttle';

	const state = getCarouselState();
	const throttledPreviousSlide = throttle(state.previousSlide, time5);
</script>

{#if state.active !== 0 || state.infinite}
	<div
		class="carousel__next | absolute cursor-pointer"
		in:fade={{ duration: time3, easing: circOut }}
		out:fade={{ duration: time2, easing: circIn }}
		onclick={throttledPreviousSlide}
		role="button"
		onkeydown={(e) => e.key === 'Enter' && state.previousSlide}
		tabindex={state.active !== 0 ? 0 : -1}
	>
		<img src="icons/chevron-left.svg" alt="" srcset="" />
	</div>
{/if}

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens/carousel' as *;
	@use '$breakpoints' as *;

	.carousel__next {
		left: $left-padding;
		top: 29%;
		z-index: 1;
		transform-origin: center;
	}

	img {
		width: fluid-l(24);
		height: fluid-l(24);

		@include mq('medium') {
			width: fluid-l(24);
			height: fluid-l(24);
		}

		@include mq('small') {
			width: fluid-s(24);
			height: fluid-s(24);
		}
	}
</style>
