import { getContext, setContext } from 'svelte';

class ScreenSize {
	width: number = $state(1920);
	height: number = $state(1080);
}

export const screenSize = new ScreenSize();
