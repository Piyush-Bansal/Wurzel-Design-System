import { getContext, setContext } from 'svelte';
import type { HoverFunctionality } from './types';
import { Spring } from 'svelte/motion';
import { motionSpring } from '$lib/helper-functions/springAnimation';

class Hover implements HoverFunctionality {
	duration = motionSpring({ duration: 1000, bounce: 0.9 });
	yAxis = new Spring(0, this.duration);
	imageWrapperHeight = $state(0);
	imageIsVisible = $state(false);
	constructor() {
		console.log(this.duration);
	}
}

const HOVER_KEY = Symbol('hover');
export const setHoverState = () => setContext(HOVER_KEY, new Hover());
export const getHoverState = () => getContext<Hover>(HOVER_KEY);
