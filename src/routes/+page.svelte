<script lang="ts">
	import { Accordion, AccordionItem } from '$components/accordion';
	import Slide from '$components/tab/Slide.svelte';
	const data = [Slide, Slide, Slide, Slide, Slide, Slide, Slide, Slide];

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

<div class="container paragraph-indent grid-col-3">
	<p>
		im obcaecati natus explicabo expedita? Tenetur perspiciatis aliquam esse non
		culpa expedita possimus. Repudiandae corporis obcaecati aliquid eum
		molestias id delectus nihil provident accusantium excepturi quo nemo maxime
		dicta hic similique veritatis quod, vel aliquam! Labore reprehenderit
		blanditiis, est dolores illo quos dolor esse laudantium officia distinctio
		veritatis saepe totam qui voluptatem! Suscipit modi qui officia delectus
		maxime, nam sequi deleniti sapiente est omnis ad iure saepe quis. Similique,
		non!
	</p>
	<p>
		Im obcaecati natus explicabo expedita? Tenetur perspiciatis aliquam esse non
		culpa expedita possimus. Repudiandae corporis obcaecati aliquid eum
		molestias id delectus nihil provident accusantium excepturi quo nemo maxime
		dicta hic similique veritatis quod, vel aliquam! Labore reprehenderit
		blanditiis, est dolores illo quos dolor esse laudantium officia distinctio
		veritatis saepe totam qui voluptatem! Suscipit modi qui officia delectus
		maxime, nam sequi deleniti sapiente est omnis ad iure saepe quis. Similique,
		non!
	</p>
	<a href="/">Hello</a>

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
