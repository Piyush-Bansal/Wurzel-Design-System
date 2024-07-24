<script lang="ts">
	import {
		tabHandleClick,
		activeTab,
		indicatorWidth,
		tabLeftPosition
	} from './functionality.svelte';
	import type { TabValue } from './types';

	let { children, value }: TabValue = $props();

	let width = $state(0);
	let tab: HTMLDivElement | undefined = $state();

	$effect((): void => {
		if (activeTab.tabName === value && tab) {
			indicatorWidth.width = width;
			tabLeftPosition.left = tab.offsetLeft;
		}
	});
</script>

<div
	class="tab__trigger | cursor-pointer p-y-8 p-x-12"
	class:active={value === activeTab.tabName}
	bind:clientWidth={width}
	bind:this={tab}
	onclick={() => tabHandleClick(value)}
	role="tab"
	aria-selected={value === activeTab.tabName}
	tabindex="0"
	onkeydown={(event) => {
		if (event.key === 'Enter') {
			tabHandleClick(value);
		}
	}}
>
	<p>{@render children()}</p>
</div>

<style lang="scss">
	.active {
		cursor: default;
		pointer-events: none;
	}
</style>
