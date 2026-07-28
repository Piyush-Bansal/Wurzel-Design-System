import { getContext, setContext } from 'svelte';
import type { MarqueeItem } from './item.state.svelte';
import { usePointer, useVelocity } from '$lib/interactions';

class MarqueeState {
	items = $state<MarqueeItem[]>([]);
	marqueeWrapper = $state<HTMLDivElement>();

	readonly pointer = usePointer();
	readonly velocity = useVelocity(this.pointer);

	offset = $state(0);

	readonly gap = $derived.by(() => {
		if (this.items.length < 2) return 0;
		return this.items[1].startX - (this.items[0].startX + this.items[0].width);
	});

	readonly trackWidth = $derived.by(() => {
		if (!this.marqueeWrapper) return 0;
		return this.marqueeWrapper.scrollWidth + this.gap;
	});
}

const key = Symbol('MarqueeState');
export const getMarqueeState = () => getContext<MarqueeState>(key);
export const setMarqueeState = () => setContext(key, new MarqueeState());

export default MarqueeState;
