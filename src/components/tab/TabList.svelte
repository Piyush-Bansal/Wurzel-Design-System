<script lang="ts">
	import type { TabList } from './types';
	let { children }: TabList = $props();
</script>

<div class="tab-list | flex flex-row">
	{@render children()}
</div>
