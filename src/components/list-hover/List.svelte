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
		currentState.yAxis =
			e.clientY - rect.top - currentState.imageWrapperHeight / 2;
	}}
	onmouseleave={() => {
		currentState.imageIsVisible = false;
	}}
	onmouseenter={() => {
		currentState.imageIsVisible = true;
	}}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.list {
		margin-top: 30vh;
	}
</style>
