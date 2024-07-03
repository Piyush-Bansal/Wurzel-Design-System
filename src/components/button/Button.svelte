<script lang="ts">
	import type { Button } from './types';
	let {
		children,
		disabled = false,
		type = 'button',
		variant = 'primary',
		...props
	}: Button = $props();
</script>

{#snippet buttonContent()}
	{#if children}
		{@render children()}
	{:else}
		<p>Click Me</p>
	{/if}
{/snippet}

<button
	{type}
	{disabled}
	{...props}
	data-variant={variant}
	aria-disabled={disabled}
	tabindex={disabled ? -1 : 0}
	class="cursor-pointer border-none p-x-16 p-y-12 uppercase"
>
	{@render buttonContent()}</button
>

<style lang="scss">
	button {
		color: $color-text-on-action;
		background-color: $color-surface-action-1;
	}
</style>
