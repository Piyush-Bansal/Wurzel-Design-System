<script lang="ts">
	let { children } = $props();
</script>

<div class="list">
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
