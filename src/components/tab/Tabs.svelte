<script lang="ts">
	import { setContext } from 'svelte';
	import type { Tabs } from './types';

	let { activeTab, tabList, tabContent }: Tabs = $props();

	setContext('activeTab', activeTab ? activeTab : undefined);
</script>

<div class="tabs">
	<div class="tab-list">
		{@render tabList()}
	</div>
	<div class="tab-content">
		{@render tabContent()}
	</div>
</div>
