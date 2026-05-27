<script lang="ts">
	import type { ListItemProps } from './types';

	let { index, content }: ListItemProps = $props();
</script>

<div class="list-item">
	<div class="list-item-content">
		<p>{index}</p>
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

		&:last-of-type {
			border-bottom: $stroke-hairline solid $clr-bdr-default;
		}

		&-content {
			display: flex;
			flex-direction: row;
			align-items: baseline;
			column-gap: $h3-h-gap-default;
		}
	}
</style>
