<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ListBehaviour } from './behaviour/list.behaviour.svelte';
	import {
		getHoverImageState,
		setHoverImageState
	} from './state/hoverImage.state.svelte';
	import { getListState, setListState } from './state/list.state.svelte';

	let { children } = $props();

	setListState();
	const listState = getListState();
	setHoverImageState(listState);
	const hoverImageState = getHoverImageState();
	const listBehaviour = new ListBehaviour(listState, hoverImageState);

	//cleanup
	onDestroy(() => listBehaviour.destroy());
</script>

<div
	role="presentation"
	class="list | relative"
	bind:this={listState.listArea}
	onmouseleave={() => {
		listState.isImgVisible = false;
	}}
	onmouseenter={() => {
		listState.isImgVisible = true;
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
