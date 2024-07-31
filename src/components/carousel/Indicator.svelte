<script>
	import { getCarouselState } from './functionality.svelte';
	import IndicatorDot from './IndicatorDot.svelte';
	const state = getCarouselState();
</script>

<div class="indicator__wrapper | m-t-64">
	{#each Array(state.count) as item, index}
		<IndicatorDot index={index + 1}></IndicatorDot>
	{/each}
</div>

<style lang="scss">
	@use '$sizes' as *;
	.indicator__wrapper {
		display: flex;
		justify-content: center;
		gap: fluid-l(12);
	}
</style>
