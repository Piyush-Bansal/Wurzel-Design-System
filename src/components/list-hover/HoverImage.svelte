<script lang="ts">
	import { onMount } from 'svelte';
	import { getHoverState } from './functionality.svelte';
	import type { HoverImageProps } from './types';
	import gsap from 'gsap';

	let { urls, alt = '' }: HoverImageProps = $props();

	const currentState = getHoverState();

	let images: HTMLImageElement[] = $state([]);

	let currentZ = 1;

	onMount(() => {
		const interval = setInterval(() => {
			if (!currentState.hoverQueue.length) return;

			const index = currentState.hoverQueue.shift();

			if (index === undefined) return;

			const img = images[index];

			if (!img) return;

			currentZ++;

			gsap.set(img, {
				yPercent: -100,
				zIndex: currentZ
			});

			gsap.to(img, {
				yPercent: 0,
				duration: 0.5,
				ease: 'power2.out'
			});
		}, 200);

		return () => clearInterval(interval);
	});
</script>

<div
	class={[
		'image-wrapper | ar-2-3 overflow-hidden',
		!currentState.isImgVisible && 'fade'
	]}
	bind:clientHeight={currentState.imageWrapperHeight}
	style:transform={`translateY(${currentState.yAxis.current}px)`}
>
	{#each urls as src, i}
		<img bind:this={images[i]} {src} {alt} class="absolute" loading="lazy" />
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

			// transform: translateY(-100%);
		}
	}
</style>
