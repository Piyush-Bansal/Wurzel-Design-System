<script lang="ts">
	import { getListPreviewFunctionality } from './functionality.svelte';
	import type { ListItem } from './types';

	let { index, id, location }: ListItem = $props();
	const incrementalIndex = $derived(index + 1);

	const functionality = getListPreviewFunctionality();

	$effect(() => {
		functionality.ids[index] = id;
	});
</script>

<div
	role="presentation"
	class={[
		'list-item',
		functionality.selected?.current &&
			id !== functionality.selected?.current &&
			'unselected'
	]}
	onpointerenter={() => {
		if (functionality.hover === 'details') return;
		functionality.hover = 'preview';
		functionality.selected?.select(id);
	}}
	onclick={() => {
		functionality.selected?.select(id);
		functionality.hover = 'details';
	}}
>
	<p>{incrementalIndex < 10 ? `0${incrementalIndex}` : incrementalIndex}</p>
	<p>{location}</p>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.list-item {
		display: flex;
		gap: $body-h-gap-default;
		cursor: pointer;
		border-top: $stroke-hairline solid $clr-bdr-default;
		height: $comp-size-l;
		align-items: center;

		& > p {
			margin-bottom: 0;
		}

		&:last-of-type {
			border-bottom: $stroke-hairline solid $clr-bdr-default;
		}
	}

	.unselected.list-item {
		color: $clr-text-disabled;
		border-color: $clr-bdr-subtle;
	}

	:global(.list-item:not(.unselected) + .list-item) {
		border-top-color: $clr-bdr-default;
	}
</style>
