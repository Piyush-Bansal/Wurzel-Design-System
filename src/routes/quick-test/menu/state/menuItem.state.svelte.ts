import { MenuState } from './menu.state.svelte';

export class MenuItemState {
	menuItemWrapper = $state<HTMLElement>();

	private readonly _normalGap = 18;
	private readonly _maxGap = 24;

	constructor(
		private readonly _menuState: MenuState,
		private readonly _index: () => number
	) {}

	private _gap(gapIndex: number, hoverIndex: number) {
		const isLeft = gapIndex < hoverIndex;

		const distance = isLeft ? hoverIndex - gapIndex - 1 : gapIndex - hoverIndex;

		const taperDistance = isLeft
			? hoverIndex
			: this._menuState.noOfItems - 1 - hoverIndex;

		const progress = taperDistance
			? Math.max(0, 1 - distance / taperDistance)
			: 1;

		return this._normalGap + (this._maxGap - this._normalGap) * progress;
	}

	readonly displacement = $derived.by(() => {
		const hoverIndex = this._menuState.hoverIndex;
		const index = this._index();

		if (hoverIndex === null || index === hoverIndex) {
			return 0;
		}

		const direction = Math.sign(index - hoverIndex);
		const start = Math.min(index, hoverIndex);
		const end = Math.max(index, hoverIndex);

		let displacement = 0;

		for (let gap = start; gap < end; gap++) {
			displacement += this._gap(gap, hoverIndex) - this._normalGap;
		}

		return direction * displacement;
	});
}
