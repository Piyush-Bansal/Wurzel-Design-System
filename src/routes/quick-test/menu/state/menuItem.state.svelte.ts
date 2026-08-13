import { MenuState } from './menu.state.svelte';
import gsap from 'gsap';

export class MenuItemState {
	menuItemWrapper = $state<HTMLElement>();

	private readonly _gap = $derived.by(() => {
		if (this._menuState.hoverIndex === null) return 0;
		return this._index() - this._menuState.hoverIndex;
	});

	private readonly _normalisedGap = $derived.by(() => {
		const totalItems = this._menuState.noOfItems - 1;
		return Math.abs(this._gap) / totalItems;
	});

	readonly displacement = $derived.by(() => {
		if (this._normalisedGap === 0) return 0;

		const interpolatedValue = gsap.utils.mapRange(
			1,
			this._menuState.noOfItems - 1,
			25,
			18,
			Math.abs(this._gap)
		);
		return interpolatedValue * Math.sign(this._gap);
	});

	constructor(
		private readonly _menuState: MenuState,
		private readonly _index: () => number
	) {}
}
