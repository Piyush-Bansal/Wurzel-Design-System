<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getHoverState, setHoverState } from './functionality.svelte';

	let { children } = $props();

	setHoverState();
	const currentState = getHoverState();

	//cleanup
	onDestroy(() => currentState.destroy());
</script>

<div
	role="presentation"
	class="list | relative"
	bind:this={currentState.listArea}
	onmouseleave={() => {
		currentState.isImgVisible = false;
	}}
	onmouseenter={() => {
		currentState.isImgVisible = true;
	}}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	@use '$tokens' as *;

	.list {
		margin-top: $sec-gap-xl;
	}
</style>
