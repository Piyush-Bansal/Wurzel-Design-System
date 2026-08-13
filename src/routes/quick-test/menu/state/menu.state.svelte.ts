import { getContext, setContext } from 'svelte';

export class MenuState {
	hoverIndex = $state<null | number>(null);
	readonly noOfItems = 5;
}

const key = Symbol('MenuState');
export const setMenuState = () => setContext(key, new MenuState());
export const getMenuState = () => getContext<MenuState>(key);
