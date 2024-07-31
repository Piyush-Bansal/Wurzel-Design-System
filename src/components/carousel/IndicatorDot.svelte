<script lang="ts">
	import { getCarouselState } from './functionality.svelte';

	let { index } = $props();
	const state = getCarouselState();
</script>

<div
	class="indicator-dot | cursor-pointer"
	onclick={() => {
		state.active = index;
	}}
	class:active={state.active === index}
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
	}
</style>
