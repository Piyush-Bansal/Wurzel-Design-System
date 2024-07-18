<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { AccordionItem } from './types';
	import { time4 } from '$lib/helper-functions/timing.svelte';
	import { expoInOut } from 'svelte/easing';
	import { getContext } from 'svelte';
	import { Accordion } from './functionality.svelte';

	let { heading, description, open = false, group }: AccordionItem = $props();

	let collapsable: boolean = getContext('collapsable');

	const accordion = new Accordion(open, collapsable, group);
</script>

<!-- 
@component
## AccordionItem Component 

### Description
AccordionItem is a component that represents an item within an accordion. It typically consists of a heading and a description that can be expanded or collapsed.

### Props
- `heading` (optional): The heading content of the AccordionItem.
- `description` (optional): The description content of the AccordionItem.
- `open` (boolean): Determines whether the AccordionItem is initially open or closed.
- `group` (string): Group identifier for grouping multiple AccordionItems together.

### Usage
```svelte
<AccordionItem open={i === 0} group="b">
	{#snippet heading()}
		{data.heading}
	{/snippet}
	{#snippet description()}
		{data.description}
	{/snippet}
</AccordionItem>
```

### Features
- Clicking on the AccordionItem toggles its open/closed state.
- Supports dynamic heading and description content.
- Accessibility features like keyboard interaction for opening/closing the item.

### Styles
- The heading and description have specific styling defined within the component.
- The icon next to the heading rotates to indicate the open/closed state.

### Transitions
- Uses the `slide` transition for smooth opening/closing animations.

### Dependencies
- Imports `slide` from `svelte/transition`.
- Imports `expoInOut` from `svelte/easing`.
- Imports `getContext` from `svelte`.
- Imports `Accordion` from `./functionality.svelte`.

-->

<div
	class="accordion-item | flex-column align-items-stretch cursor-pointer"
	onclick={accordion.handleClick}
	aria-expanded={accordion.isOpen}
	aria-controls="accordion-{accordion.id}"
	role="button"
	tabindex="0"
	onkeydown={(event) => {
		if (event.key === 'Enter') {
			accordion.handleClick();
		}
	}}
>
	<div class="accordion-item__headline | flex justify-content-between p-8">
		<div class="headline">
			{#if heading}
				<p>
					{@render heading()}
				</p>
			{/if}
		</div>
		<div class="icon | center">
			<img
				src="/icons/chevron.svg"
				alt=""
				srcset=""
				class:closed={!accordion.isOpen}
			/>
		</div>
	</div>
	{#if accordion.isOpen}
		<div
			class="accordion-item__description | p-8"
			transition:slide|local={{
				duration: time4,
				easing: expoInOut
			}}
			role="region"
			aria-labelledby="accordion-{accordion.id}"
		>
			{#if description}
				<p>
					{@render description()}
				</p>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens/time' as *;

	.accordion-item {
		&__headline {
			gap: fluid-l(16);
		}
	}
	.icon {
		img {
			transition: transform $time-3 ease-in-out;
			height: fluid-l(20);
			width: fluid-l(20);

			&.closed {
				transform: rotate(180deg);
			}
		}
	}
</style>
