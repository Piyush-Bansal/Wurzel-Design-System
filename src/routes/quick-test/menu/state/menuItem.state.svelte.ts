import type { MenuState } from './menu.state.svelte';

export class MenuItemState {
	menuItemWrapper = $state<HTMLElement>();

	private readonly _gap = $derived.by(() => {
		if (this._menuState.hoverIndex === null) return 0;
		return this._index() - this._menuState.hoverIndex;
	});

	private readonly _strength = $derived(
		Math.max(0, 1 - Math.abs(this._gap) * 0.4)
	);

	readonly displacement = $derived(this._gap * this._strength * 40);

	constructor(
		private readonly _menuState: MenuState,
		private readonly _index: () => number
	) {}
}
