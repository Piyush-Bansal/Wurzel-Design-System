<script lang="ts">
	import { getListPreviewFunctionality } from './functionality.svelte';
	import type { DetailsCollection } from './types';

	let { details }: DetailsCollection = $props();
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
</script>

{#if functionality.viewState === 'details'}
	<div class="details" data-flip-id="morph-container">
		<div
			class="dismiss | center"
			role="button"
			onclick={() => (functionality.viewState = null)}
			tabindex="1"
			bind:this={functionality.closeButton}
		>
			<img src="icons/close.svg" alt="" />
		</div>
		<img
			data-flip-id="morph-image"
			src={selectedItem?.image}
			alt={selectedItem?.location}
		/>
		<h3 data-flip-id="morph-location">{selectedItem?.location}</h3>
		<p data-flip-id="morph-country">{selectedItem?.country}</p>
		<p bind:this={functionality.details}>{selectedItem?.details}</p>
	</div>
{/if}

<style lang="scss">
	@use '$tokens' as *;

	.details {
		position: absolute;
		top: 50%;
		left: 50%;
		padding: $cntr-pad-y-1 $cntr-pad-x-1;
		background-color: $clr-sur-action-2;
		border: $stroke-hairline solid $clr-bdr-default;
		width: $col-wide-6;
		transform: translate(-50%, -50%);

		& > img {
			aspect-ratio: 16/9;
			object-fit: cover;
			width: 100%;
			margin-bottom: $ts-h3-spaced;
		}

		h3 {
			margin-bottom: $ts-h3-default;
		}

		h3 + p {
			margin-bottom: $ts-body-default;
		}

		.dismiss {
			width: $ico-frame;
			height: $ico-frame;
			position: absolute;
			top: $cntr-pad-y-1;
			right: $cntr-pad-x-1;
			cursor: pointer;
			background-color: $clr-sur-action-2;
			border-radius: $br-full;

			img {
				width: $ico-size-s;
				height: $ico-size-s;
			}
		}
	}
</style>
