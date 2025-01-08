<script lang="ts">
	import { Accordion, AccordionItem } from '$components/accordion';
	import Button from '$components/button/Button.svelte';
	import Countdown from '$components/countdown/Countdown.svelte';
	import { Tab, TabContent, TabList, TabTrigger } from '$components/tab';
	import {
		Carousel,
		CarouselContent,
		CarouselItem
	} from '$components/carousel';
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

<div class="container">
	<!-- <Countdown
		targetDate="2025-12-16T23:01:00"
		options={{ onComplete: () => console.log('YAY!') }}
	/> -->

	<!-- <Tab activeTab="tab1">
		{#snippet tabList()}
			<TabList label="tablist">
				<TabTrigger value="tab1">Tab 1</TabTrigger>
				<TabTrigger value="tab2">Tab 2</TabTrigger>
			</TabList>
		{/snippet}
		{#snippet tabContent()}
			<TabContent value="tab1"
				>im obcaecati natus explicabo expedita? Tenetur perspiciatis aliquam
				esse non culpa expedita possimus. Repudiandae corporis obcaecati aliquid
				eum molestias id delectus nihil provident accusantium excepturi quo nemo
				maxime dicta hic similique veritatis quod, vel aliquam! Labore
				reprehenderit blanditiis, est dolores illo quos dolor esse laudantium
				officia distinctio veritatis saepe totam qui voluptatem! Suscipit modi
				qui officia delectus maxime, nam sequi deleniti sapiente est omnis ad
				iure saepe quis. Similique, non!</TabContent
			>
			<TabContent value="tab2">Content for Tab 2</TabContent>
		{/snippet}
	</Tab> -->

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

<!-- <div class="container">
	<Button variant="primary" onclick={() => console.log('clicked')}
		><p>Primary</p></Button
	>
</div>

<div class="container" data-size="full">
	<Carousel
		autoscroll={false}
		indicator={true}
		controls={true}
		infinite={false}
		count={data.length}
	>
		<CarouselContent
			size={{ lg: 589, md: 344, sm: 324 }}
			leftPadding={{ lg: 64, md: 32, sm: 16 }}
		>
			{#each data as slide, number}
				<CarouselItem>
					<Slide number={number + 1}></Slide>
				</CarouselItem>
			{/each}
		</CarouselContent>
	</Carousel>
</div> -->
