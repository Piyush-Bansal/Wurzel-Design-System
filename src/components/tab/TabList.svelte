<script lang="ts">
	import type { TabChildren } from './types';
	let { children }: TabChildren = $props();
</script>

<div class="tab-list | flex flex-row">
	{@render children()}
</div>
