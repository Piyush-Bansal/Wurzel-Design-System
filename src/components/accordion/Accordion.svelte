<script lang="ts">
	import { setContext } from 'svelte';
	import type { Accordion } from './types';
	import { Accordion as AccordionLogic } from './currentID.svelte';

	let { collapsable = true, children }: Accordion = $props();

	setContext('collapsable', collapsable);
</script>

<div class="accordions | span-3">
	{#if children}
		{@render children()}
	{/if}
</div>
