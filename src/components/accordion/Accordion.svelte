<script lang="ts">
	import { setContext } from 'svelte';
	import type { Accordion } from './types';

	let { collapsable = true, children }: Accordion = $props();
	setContext('collapsable', collapsable);
</script>

<div class="accordions | span-3">
	{#if children}
		{@render children()}
	{/if}
</div>
