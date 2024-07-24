<script lang="ts">
	import type { TabChildren } from './types';
	import { indicatorWidth, tabLeftPosition } from './functionality.svelte';
	let { children }: TabChildren = $props();
</script>

<div class="tab-list | flex flex-row relative">
	<div
		class="tab__indicator | absolute"
		style:width="{indicatorWidth.width}px"
		style:left="{tabLeftPosition.left}px"
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
