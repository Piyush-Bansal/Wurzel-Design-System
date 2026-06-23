<script lang="ts">
	import { getHoverState } from './functionality.svelte';
	import type { ListItemProps } from './types';

	let { index, content }: ListItemProps = $props();
	const currentState = getHoverState();
</script>

<div
	role="presentation"
	class="list-item"
	onmouseenter={() => {
		currentState.selection?.select(currentState.images[index]);
	}}
>
	<div class="list-item-content">
		<p>{index + 1}</p>
		<h3>{content}</h3>
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.list-item {
		display: flex;
		height: $comp-size-xl;
		align-items: center;
		border-top: $stroke-hairline solid $clr-bdr-default;
		cursor: pointer;
		transition: background-color 0.5s $easeOutExpo;

		&:last-of-type {
			border-bottom: $stroke-hairline solid $clr-bdr-default;
		}

		&-content {
			display: flex;
			flex-direction: row;
			align-items: baseline;
			column-gap: $h3-h-gap-default;
		}

		&:hover {
			background-color: $clr-sur-secondary;
			color: white;
		}
	}
</style>
