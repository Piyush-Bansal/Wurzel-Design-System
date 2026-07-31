<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getHoverImageState } from './state/hoverImage.state.svelte';
	import { getListState } from './state/list.state.svelte';
	import type { HoverImageProps } from './types';

	let { imageData }: HoverImageProps = $props();

	// Add images to the state
	const listState = getListState();

	$effect(() => {
		listState.imageUrls = imageData;
	});

	const hoverImageState = getHoverImageState();

	function bindImage(id: number | string): Attachment {
		return (element) => {
			hoverImageState.images.push({ id, node: element });

			return () => {
				const idx = hoverImageState.images.findIndex((img) => img.id === id);
				if (idx !== -1) hoverImageState.images.splice(idx, 1);
			};
		};
	}
</script>

{#if listState.images.loaded.length === imageData.length}
	<div
		class={[
			'image-wrapper | ar-2-3 overflow-hidden',
			!listState.isImgVisible && 'fade'
		]}
		bind:clientHeight={hoverImageState.imageWrapperHeight}
		bind:this={hoverImageState.imgWrapper}
	>
		{#each listState.images.loaded as data, i (i)}
			<img
				src={data.src}
				alt=""
				class="absolute"
				{@attach bindImage(data.id)}
			/>
		{/each}
	</div>
{/if}

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
