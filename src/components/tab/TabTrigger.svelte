<script lang="ts">
	import { getTabState } from './functionality.svelte';
	import type { TabValue } from './types';

	let { children, value }: TabValue = $props();

	let width = $state(0);
	let tab: HTMLDivElement | undefined = $state();
	const tabState = getTabState();

	$effect((): void => {
		if (tabState.activeTab === value && tab) {
			tabState.indicatorWidth = width;
			tabState.tabLeftPosition = tab.offsetLeft;
		}
	});
</script>

<div
	class="tab__trigger | cursor-pointer p-y-8 p-x-12"
	class:active={value === tabState.activeTab}
	bind:clientWidth={width}
	bind:this={tab}
	onclick={() => tabState.tabHandleClick(value)}
	role="tab"
	aria-selected={value === tabState.activeTab}
	tabindex={value === tabState.activeTab ? 0 : -1}
	aria-controls={`tabpannel-${value}`}
	onkeydown={(event) => {
		if (event.key === 'Enter') {
			tabState.tabHandleClick(value);
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
