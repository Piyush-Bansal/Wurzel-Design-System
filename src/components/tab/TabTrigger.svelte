<script lang="ts">
	import { tabHandleClick, activeTab } from './functionality.svelte';
	import type { TabValue } from './types';

	let { children, value }: TabValue = $props();
</script>

<div
	class="tab__trigger | cursor-pointer p-y-8 p-x-12"
	class:active={value === activeTab.tabName}
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
