import { getContext, setContext } from 'svelte';
import type { ListState } from './list.state.svelte';

type Images = {
	id: number | string;
	node: Element;
}[];

export class HoverImageState {
	imgWrapper = $state<HTMLElement>();
	imageWrapperHeight = $state(0);

	yPosition = $derived.by(() => {
		if (!this._listState.localPointer) return;
		return (
			this._listState?.localPointer?.local?.y - this.imageWrapperHeight / 2
		);
	});

	images = $state<Images>([]);
	constructor(private readonly _listState: ListState) {}
}

const KEY = Symbol('HoverImageState');
export const setHoverImageState = (listState: ListState) =>
	setContext(KEY, new HoverImageState(listState));
export const getHoverImageState = () => getContext<HoverImageState>(KEY);
