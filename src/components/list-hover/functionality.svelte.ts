import { getContext, setContext } from 'svelte';
import { Spring } from 'svelte/motion';
import type { HoverFunctionality } from './types';

class Hover implements HoverFunctionality {
	yAxis = new Spring(0, { stiffness: 0.1, damping: 0.4 });
	imageWrapperHeight = $state(0);
	isImgVisible = $state(false);
	hoverQueue = $state<number[]>([]);
}

const HOVER_KEY = Symbol('hover');
export const setHoverState = () => setContext(HOVER_KEY, new Hover());
export const getHoverState = () => getContext<Hover>(HOVER_KEY);
