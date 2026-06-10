<script lang="ts">
	import {
		getImageCyclerFunctionality,
		setImageCyclerFunctionality
	} from './functionality.svelte';

	interface Props {
		images: string[];
		active: boolean;
		aspectRatio?: string;
		interval?: number;
	}

	let {
		images,
		active,
		aspectRatio = '1 / 1',
		interval = 200
	}: Props = $props();

	setImageCyclerFunctionality();
	const state = getImageCyclerFunctionality();

	$effect(() => {
		state.images = images;
		state.intervalDuration = interval;

		if (!state.currentSrc && images.length) {
			state.currentSrc = images[0];
		}
	});

	$effect(() => {
		state.active = active;
	});
</script>

<div class="img-wrapper" style:aspect-ratio={aspectRatio}>
	<img src={state.currentSrc} alt="" loading="eager" draggable="false" />
</div>

<style lang="scss">
	.img-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
