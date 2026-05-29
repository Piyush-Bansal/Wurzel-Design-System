<script lang="ts">
	import { getHoverState } from './functionality.svelte';
	import type { HoverImageProps } from './types';

	let { src, alt = '' }: HoverImageProps = $props();

	let imageWrapper: HTMLDivElement | undefined = $state();
	const currentState = getHoverState();
</script>

{#if currentState.imageIsVisible}
	<div
		class="image-wrapper | ar-2-3"
		bind:this={imageWrapper}
		bind:clientHeight={currentState.imageWrapperHeight}
		style:transform={`translateY(${currentState.yAxis.current}px)`}
	>
		<img {src} {alt} />
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

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
