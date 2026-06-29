<script lang="ts">
	import { getListPreviewFunctionality } from './functionality.svelte';
	import type { HoverDetailsCollection } from './types';

	let { details }: HoverDetailsCollection = $props();

	const functionality = getListPreviewFunctionality();

	const selectedItem = $derived.by(() => {
		if (functionality.loadedImages.loaded.length === 0) return;

		const current = functionality.selected?.current;
		if (!current) return;

		const index = details.findIndex((v) => v.id === current);
		const hoverDetails = details[index];
		hoverDetails.image = functionality.loadedImages.loaded[index];

		return hoverDetails;
	});

	$effect(() => {
		details.map((item, i) => (functionality.images[i] = item.image));
	});
</script>

{#if functionality.viewState === 'preview'}
	<div
		class="hover-details"
		bind:this={functionality.hoveredDetails}
		bind:clientHeight={functionality.hoveredDetailsHeight}
		data-flip-id="morph-container"
	>
		<img
			data-flip-id="morph-image"
			src={selectedItem?.image}
			alt={selectedItem?.location}
		/>
		<p data-flip-id="morph-location">{selectedItem?.location}</p>
		<p data-flip-id="morph-country">{selectedItem?.country}</p>
	</div>
{/if}

<style lang="scss">
	@use '$tokens' as *;
	@use '$sizes' as *;

	.hover-details {
		position: absolute;
		left: fluid-l(990);
		padding: $half-gutter;
		width: $col-wide-3;
		border: $stroke-hairline solid $clr-bdr-default;
		background-color: $clr-sur-action-2;
		will-change: transform;

		img {
			aspect-ratio: 3/4;
			object-fit: cover;
			margin-bottom: $ts-body-spaced;

			& + p {
				margin-bottom: $ts-body-default;
			}
		}
	}
</style>
