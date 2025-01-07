<script lang="ts">
	import type { Button, ButtonIcon } from './types';

	let {
		children,
		disabled = false,
		type = 'button',
		variant = 'primary',
		leftIcon,
		rightIcon,
		...props
	}: Button = $props();
</script>

<!-- 
@component

Button component
---------------

### Props

- `props {Button}` - The props for the button component
  - `children {Snippet}` - The content of the button
  - `disabled {boolean} = false` - Whether the button is disabled
  - `type {('button' | 'submit' | 'reset')} = 'button'` - The type of button
  - `variant {('primary' | 'secondary' | 'ghost' | 'danger')} = 'primary'` - The style variant of the button
  - `leftIcon {Snippet}` - The icon to display on the left side of the button
  - `rightIcon {Snippet}` - The icon to display on the right side of the button
  - `...props {HTMLAttributes}` - Additional props to pass to the button element

-->

{#snippet label()}
	{#if children}
		{@render children()}
	{:else}
		<p>Click Me</p>
	{/if}
{/snippet}

{#snippet icon(side: ButtonIcon)}
	{#if side}
		{@render side()}
	{/if}
{/snippet}

<button
	{type}
	{disabled}
	{...props}
	data-variant={variant}
	aria-disabled={disabled}
	tabindex={disabled ? -1 : 0}
	class="cursor-pointer border-none p-x-16 p-y-12"
	class:right-icon-padding={rightIcon}
	class:left-icon-padding={leftIcon}
	class:no-padding={variant === 'ghost'}
>
	<div class="button__content | flex align-items-center">
		{@render icon(leftIcon)}
		{@render label()}
		{@render icon(rightIcon)}
	</div>
</button>

<style lang="scss">
	@use '$tokens/colors' as *;
	@use '$styles/abstract/border/border-radius' as *;
	@use '$sizes' as *;
	@use '$breakpoints' as *;

	button {
		color: $color-text-on-action;
		background-color: $color-surface-action-1;
		border-radius: $border-radius-md;

		&[data-variant='secondary'] {
			// background-color: red;
		}

		.#{&}__content {
			gap: fluid-l(8);
		}

		&:focus {
			outline-color: pink;
			outline-width: fluid-l(1);
			outline-offset: fluid-l(2);
		}
	}

	.right-icon-padding {
		padding-inline: fluid-l(16) fluid-l(10);
	}
	.left-icon-padding {
		padding-inline: fluid-l(10) fluid-l(16);
	}

	.no-padding {
		padding: 0;
	}
</style>
