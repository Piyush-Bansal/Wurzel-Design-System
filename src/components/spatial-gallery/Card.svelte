<script lang="ts">
	import { onMount } from 'svelte';

	import { CardController } from './behaviour/card.behaviour.svelte';
	import {
		CardMotionState,
		IndividualCardState
	} from './state/card.state.svelte';
	import { getGalleryState } from './state/gallery.state.svelte';

	import type { Card } from './types';

	let { details, index }: Card = $props();

	const gallery = getGalleryState();

	const state = new IndividualCardState(details, index, gallery);
	const controller = new CardController(state, gallery);

	const gallerySelection = $derived(
		state.cardMotionState === CardMotionState.Selected
	);

	const isCardHovered = $derived(state.isSelected);

	const imgData = $derived(state.image);

	onMount(() => {
		gallery.ids[index] = details.id;
	});
</script>

<div
	class={['card-anchor', gallerySelection && 'gallery']}
	style:--x={details.x}
	style:--y={details.y}
	style:--z-index={isCardHovered ? gallery.ids.length : index}
	bind:this={state.flipTarget}
	role="presentation"
	onpointerenter={() => controller.pointerEnter()}
	onpointerleave={() => controller.pointerLeave()}
	onclick={() => controller.click()}
	data-flip-id="morph-card"
>
	<div class="card" bind:this={state.card} style:--brightness={1}>
		{#if imgData}
			<img src={imgData?.src} alt="" data-flip-id="morph-image" />
		{/if}
		{#if gallerySelection}
			<h3 class="invert">{details.title}</h3>
			<div
				class="close"
				onclick={(event) => controller.close(event)}
				role="presentation"
			>
				<img src="icons/close.svg" alt="close" />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;
	@use '$sizes' as *;

	.card-anchor {
		position: absolute;
		width: $col-wide-2;
		aspect-ratio: 3/4;

		top: calc(var(--y) * 1px);
		left: calc(var(--x) * 1px);
		transform: translate(-50%, -50%);
		z-index: var(--z-index);
		cursor: pointer;
		transform-style: preserve-3d;
	}

	.card {
		position: absolute;
		inset: 0;
		border-radius: $br-soft;
		overflow: hidden;
		filter: brightness(var(--brightness, 1));

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.gallery {
		width: $col-wide-8;
		aspect-ratio: 16/9;

		top: 50%;
		left: 50%;
		cursor: default;

		h3 {
			position: absolute;
			bottom: 5%;
			left: 5%;
			width: 100%;
		}

		.close {
			position: absolute;
			top: 5%;
			right: 5%;
			width: $ico-frame;
			height: $ico-frame;
			cursor: pointer;

			img {
				width: $ico-size-l;
				height: $ico-size-l;
				filter: invert(100%);
				transition: scale 0.2s ease;

				&:active {
					scale: 0.7;
				}
			}
		}
	}
</style>
