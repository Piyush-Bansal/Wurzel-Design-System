<script lang="ts">
	import { MenuItemBehaviour } from './behaviour/menuItem.behaviour.svelte';
	import { getMenuState } from './state/menu.state.svelte';
	import { MenuItemState } from './state/menuItem.state.svelte';
	import type { MenuItemProps } from './types';

	const { children, index }: MenuItemProps = $props();

	const menuState = getMenuState();
	const menuItemState = new MenuItemState(menuState, () => index);
	const menuBehaviour = new MenuItemBehaviour(
		menuState,
		menuItemState,
		() => index
	);
</script>

<div
	class="menu-item-wrapper"
	bind:this={menuItemState.menuItemWrapper}
	role="presentation"
	onpointerenter={() => menuBehaviour.pointerEnter()}
	onpointerleave={() => menuBehaviour.pointerLeave()}
>
	{@render children()}
</div>

<style lang="scss">
	.menu-item-wrapper {
		cursor: pointer;
	}
</style>
