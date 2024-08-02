<script lang="ts">
	import { getCarouselState } from './functionality.svelte';
	import type { IndicatorDot } from './types';

	let { index }: IndicatorDot = $props();
	const currentState = getCarouselState();

	const changeActive = () => {
		currentState.active = index;
	};
</script>

<div
	class="indicator-dot | cursor-pointer"
	aria-label="Carousel indicator dot"
	aria-current={currentState.active === index ? 'true' : 'false'}
	role="button"
	tabindex="0"
	onclick={() => {
		changeActive();
		currentState.jumpToSlide(index);
	}}
	onkeydown={(event) => {
		if (event.key === 'Enter') {
			changeActive();
			currentState.jumpToSlide(index);
		}
	}}
	class:active={currentState.active === index}
></div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens/time' as *;
	.indicator-dot {
		width: fluid-l(12);
		height: fluid-l(12);
		background-color: black;
		border-radius: fluid-l(12);
		transition: width $time-2 ease-in-out;
	}
	.active {
		width: fluid-l(24);
		pointer-events: none;
	}
</style>
