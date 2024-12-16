<script lang="ts">
	import {
		Carousel,
		CarouselContent,
		CarouselItem
	} from '$components/carousel';
	import Header from '$components/seo-header/Header.svelte';

	import Slide from '$components/tab/Slide.svelte';

	const data = [Slide, Slide, Slide, Slide, Slide, Slide, Slide, Slide];
</script>

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
			leftPadding={{ lg: 364, md: 32, sm: 16 }}
		>
			{#each data as slide, number}
				<CarouselItem>
					<svelte:component this={Slide} number={number + 1} />
				</CarouselItem>
			{/each}
		</CarouselContent>
	</Carousel>
</div>
