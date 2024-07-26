<script lang="ts">
	import type { TabChildren } from './types';
	import { getTabState } from './functionality.svelte';
	let { children }: TabChildren = $props();
	const tabState = getTabState();
</script>

<div class="tab-list | flex flex-row relative">
	<div
		class="tab__indicator | absolute"
		style:width="{tabState.indicatorWidth}px"
		style:left="{tabState.tabLeftPosition}px"
	></div>
	{@render children()}
</div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens/time' as *;
	.tab-list {
		width: max-content;
	}
	.tab__indicator {
		height: fluid-l(2);
		background-color: red;
		bottom: 0;
		z-index: -1;
		left: 0;
		transition:
			width $time-2 ease-in-out,
			left $time-3 ease-in-out;
	}
</style>
