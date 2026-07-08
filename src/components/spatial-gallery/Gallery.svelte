<script lang="ts">
	import { getSpatialGallery, setSpatialGallery } from './functionality.svelte';
	import type { GalleryProps } from './types';

	let { data, children }: GalleryProps = $props();

	setSpatialGallery();

	const functionality = getSpatialGallery();

	$effect(() => {
		functionality.data = data;
	});
</script>

<div class="container" bind:this={functionality.galleryWrapper}>
	{@render children()}
</div>

<style lang="scss">
	.container {
		perspective: 2000px;
		transform-style: preserve-3d;
		position: relative;
		overflow: hidden;
		height: 100vh;
	}
</style>
