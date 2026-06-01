<script lang="ts">
	import { getHoverState, setHoverState } from './functionality.svelte';

	let { children } = $props();

	setHoverState();
	const currentState = getHoverState();
</script>

<div
	role="presentation"
	class="list | relative"
	onmousemove={(e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		currentState.yAxis.target =
			e.clientY - rect.top - currentState.imageWrapperHeight / 2;
	}}
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
