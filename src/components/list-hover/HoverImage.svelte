<script lang="ts">
	import { getHoverState } from './functionality.svelte';
	import type { HoverImageProps } from './types';

	let { urls, alt = '' }: HoverImageProps = $props();

	const currentState = getHoverState();

	//bind urls to class
	$effect(() => {
		currentState.imageUrls = urls;
	});
</script>

<div
	class={[
		'image-wrapper | ar-2-3 overflow-hidden',
		!currentState.isImgVisible && 'fade'
	]}
	bind:clientHeight={currentState.imageWrapperHeight}
	bind:this={currentState.imgWrapper}
>
	{#each currentState.loadedImages.loaded as src, i}
		<img bind:this={currentState.images[i]} {src} {alt} class="absolute" />
	{/each}
</div>

<style lang="scss">
	@use '$tokens' as *;
	@use '$sizes' as *;

	.image-wrapper {
		position: absolute;
		width: $col-wide-2;
		left: fluid-l(900);
		z-index: 10;
		opacity: 1;
		transition: opacity $dur-quick-1 ease;

		&.fade {
			opacity: 0;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			inset: 0;

			transform: translateY(-100%);
			will-change: transform;
		}
	}
</style>
