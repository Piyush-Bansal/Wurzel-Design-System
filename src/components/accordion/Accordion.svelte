<script lang="ts">
	import { setContext } from 'svelte';
	import type { Accordion } from './types';

	let { collapsable = true, children }: Accordion = $props();
	setContext('collapsable', collapsable);
</script>

<!-- 
@component
## Accordion Component

### Overview
The Accordion component is a collapsible container that allows multiple sections of content to be displayed in a stacked format, with only one section visible at a time.

### Props
- `collapsable` (boolean): Determines if the accordion sections can be collapsed. Default is `true`.

### Example Usage
```svelte
<Accordion collapsable={true}>
	    {#each accordionData as data, i}
	        <AccordionItem open={i === 0} group="b">
	            {#snippet heading()}
	                {data.heading}
	            {/snippet}
	            {#snippet description()}
	                {data.description}
	            {/snippet}
	          </AccordionItem>
	          {/each}
</Accordion>
```
 -->

<div class="accordions | span-3">
	{#if children}
		{@render children()}
	{/if}
</div>
