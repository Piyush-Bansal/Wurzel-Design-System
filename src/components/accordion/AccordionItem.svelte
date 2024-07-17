<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { AccordionItem } from './types';
	import { time4 } from '$lib/helper-functions/timing.svelte';
	import { expoInOut } from 'svelte/easing';
	import { getContext } from 'svelte';
	import { Accordion } from './functionality.svelte';

	let { heading, description, open = false }: AccordionItem = $props();

	let collapsable: boolean = getContext('collapsable');

	const accordion = new Accordion(open, collapsable);
</script>

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
