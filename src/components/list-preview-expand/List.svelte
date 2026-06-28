<script lang="ts">
	import {
		getListPreviewFunctionality,
		setListPreviewFunctionality
	} from './functionality.svelte';

	let { children } = $props();

	setListPreviewFunctionality();
	const functionality = getListPreviewFunctionality();
</script>

<div class="container">
	<div
		class="list | relative"
		role="presentation"
		bind:this={functionality.listArea}
		onpointerleave={() => {
			if (functionality.viewState === 'details') {
				return;
			} else {
				functionality.viewState = null;
				functionality.selected?.clear();
			}
		}}
	>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.container {
		margin: $sec-gap-xl 0;
	}
</style>
