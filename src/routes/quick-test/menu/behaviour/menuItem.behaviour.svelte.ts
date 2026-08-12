import type { MenuState } from '../state/menu.state.svelte';
import { MenuItemState } from '../state/menuItem.state.svelte';
import gsap from 'gsap';

export class MenuItemBehaviour {
	private readonly _xTo = $derived.by(() => {
		if (!this._menuItemState.menuItemWrapper) return;
		return gsap.quickTo(this._menuItemState.menuItemWrapper, 'x', {
			duration: 0.2,
			ease: 'power2.out'
		});
	});

	constructor(
		private _menuState: MenuState,
		private readonly _menuItemState: MenuItemState,
		private readonly index: () => number
	) {
		$effect(() => {
			if (!this._xTo) return;
			this._xTo(this._menuItemState.displacement);
		});
	}

	pointerEnter() {
		this._menuState.hoverIndex = this.index();
	}

	pointerLeave() {
		this._menuState.hoverIndex = null;
	}
}
