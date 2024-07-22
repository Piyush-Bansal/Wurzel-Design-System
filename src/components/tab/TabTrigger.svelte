<script lang="ts">
	import { getContext } from 'svelte';
	import type { TabTrigger } from './types';
	import { Tab } from './functionality.svelte';

	let { children, value }: TabTrigger = $props();

	const tab = new Tab(getContext('activeTab'));

	function handleClick() {
		tab.handleClick(value);
	}
</script>

<div
	class="tab__trigger | cursor-pointer p-y-8 p-x-12"
	onclick={handleClick}
	role="button"
	tabindex="0"
	onkeydown={(event) => {
		if (event.key === 'Enter') {
			tab.handleClick(value);
		}
	}}
>
	<p>{@render children()}</p>
</div>
