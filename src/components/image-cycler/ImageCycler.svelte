<script lang="ts">
	import {
		getImageCyclerFunctionality,
		setImageCyclerFunctionality
	} from './functionality.svelte';
	import type { ImageCycler } from './types';
	let { images, aspectRatio, interval = 200, active }: ImageCycler = $props();

	setImageCyclerFunctionality();
	const state = getImageCyclerFunctionality();

	//Pass state to the class
	$effect(() => {
		state.active = active;
		state.intervalDuration = interval;
		state.noOfImages = images.length;
	});
</script>

<div class="img-wrapper" style:aspect-ratio={aspectRatio}>
	{#each images as src, i (i)}
		<img
			{src}
			alt=""
			loading="lazy"
			class={[i !== state.currentIndex && 'invisible']}
		/>
	{/each}
</div>

<style lang="scss">
	.img-wrapper {
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		overflow: hidden;
		position: relative;

		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
