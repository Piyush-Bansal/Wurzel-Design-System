<script>
	import { time2, time3, time5 } from '$lib/helper-functions/timing.svelte';
	import { circIn, circOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { getCarouselState } from './functionality.svelte';
	import throttle from '$lib/helper-functions/throttle';

	const state = getCarouselState();

	const throttledNextSlide = throttle(state.nextSlide, time5);
</script>

{#if state.active !== state.count - 1 || state.infinite}
	<div
		class="carousel__next | absolute cursor-pointer"
		in:fade={{ duration: time3, easing: circOut }}
		out:fade={{ duration: time2, easing: circIn }}
		onclick={throttledNextSlide}
		role="button"
		onkeydown={(e) => e.key === 'Enter' && state.nextSlide}
		tabindex={state.active !== state.count - 1 ? -1 : 0}
	>
		<img src="icons/chevron-right.svg" alt="" srcset="" />
	</div>
{/if}

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens/carousel' as *;
	@use '$breakpoints' as *;

	.carousel__next {
		right: $right-padding;
		top: 29%;
		z-index: 1;
		transform-origin: center;
	}

	img {
		width: fluid-l(24);
		height: fluid-l(24);

		@include mq('md') {
			width: fluid-l(24);
			height: fluid-l(24);
		}

		@include mq('sm') {
			width: fluid-s(24);
			height: fluid-s(24);
		}
	}
</style>
