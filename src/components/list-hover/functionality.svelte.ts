import { getContext, setContext } from 'svelte';
import type { HoverFunctionality } from './types';

class Hover implements HoverFunctionality {
	yAxis = $state(0);
	imageWrapperHeight = $state(0);
	imageIsVisible = $state(false);
}

const HOVER_KEY = Symbol('hover');
export const setHoverState = () => setContext(HOVER_KEY, new Hover());
export const getHoverState = () => getContext<Hover>(HOVER_KEY);
