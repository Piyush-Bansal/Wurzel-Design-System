import { MenuState } from './menu.state.svelte';

export class MenuItemState {
	menuItemWrapper = $state<HTMLElement>();

	private readonly _normalGap = 18;
	private readonly _maxGap = 24;

	constructor(
		private readonly _menuState: MenuState,
		private readonly _index: () => number
	) {}

	private _getGap(gapIndex: number, hoverIndex: number) {
		const lastGapIndex = this._menuState.noOfItems - 2;

		const isLeft = gapIndex < hoverIndex;

		const distance = isLeft ? hoverIndex - gapIndex - 1 : gapIndex - hoverIndex;

		const taperDistance = isLeft ? hoverIndex : lastGapIndex - hoverIndex;

		if (taperDistance === 0) {
			return this._maxGap;
		}

		const t = Math.max(0, 1 - distance / taperDistance);

		return this._normalGap + (this._maxGap - this._normalGap) * t;
	}

	readonly displacement = $derived.by(() => {
		const hoverIndex = this._menuState.hoverIndex;
		const index = this._index();

		if (hoverIndex === null || index === hoverIndex) {
			return 0;
		}

		let displacement = 0;

		if (index > hoverIndex) {
			// Move items to the right of the hovered item right.
			for (let gapIndex = hoverIndex; gapIndex < index; gapIndex++) {
				const gap = this._getGap(gapIndex, hoverIndex);

				displacement += gap - this._normalGap;
			}
		} else {
			// Move items to the left of the hovered item left.
			for (let gapIndex = index; gapIndex < hoverIndex; gapIndex++) {
				const gap = this._getGap(gapIndex, hoverIndex);

				displacement -= gap - this._normalGap;
			}
		}

		return displacement;
	});
}
