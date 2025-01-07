<script lang="ts">
	import { Accordion, AccordionItem } from '$components/accordion';
	import Button from '$components/button/Button.svelte';
	import Countdown from '$components/countdown/Countdown.svelte';

	const accordionData = [
		{
			heading: 'Accordion Heading 1',
			description: 'Accordion Description 1'
		},
		{
			heading: 'Accordion Heading 2',
			description: 'Accordion Description 2'
		},
		{
			heading: 'Accordion Heading 3',
			description: 'Accordion Description 3'
		}
	];
</script>

<div class="container">
	<Countdown
		targetDate="2025-12-16T23:01:00"
		options={{ onComplete: () => console.log('YAY!') }}
	/>

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
</div>

<div class="container">
	<Button variant="primary" onclick={() => console.log('clicked')}
		><p>Primary</p></Button
	>
</div>
