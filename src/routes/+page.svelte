<script lang="ts">
	import { smooth } from '$lib/helper-functions/smooth-scroll';
	import { browser } from '$app/environment';
	import { Accordion, AccordionItem } from '$components/accordion';

	if (browser) {
		smooth();
	}

	const accordionData = [
		{
			heading: 'About Us',
			description:
				'We are a team of passionate developers dedicated to delivering high-quality software solutions.'
		},
		{
			heading: 'Services',
			description:
				'We offer a range of services including web development, mobile app development, and UI/UX design.'
		},
		{
			heading: 'Contact Us',
			description:
				'Feel free to reach out to us with any questions or inquiries. We will get back to you as soon as possible.'
		}
	];
</script>

<div class="container | flow grid">
	<Accordion collapsable={false}>
		{#each accordionData as data, i}
			<AccordionItem open={i === 1}>
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

<style lang="scss">
</style>
