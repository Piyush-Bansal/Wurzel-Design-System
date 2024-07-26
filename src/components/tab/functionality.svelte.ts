import { getContext, setContext } from 'svelte';
import type { ClassTabInterface } from './types';

class Tab implements ClassTabInterface {
	activeTab: string | undefined = $state(undefined);
	contentHeight = $state(0);
	indicatorWidth = $state(0);
	tabLeftPosition = $state(0);
	tabHandleClick(value: string) {
		this.activeTab = value;
	}
}

const TAB_KEY = Symbol('TAB');

export function setTabState() {
	return setContext(TAB_KEY, new Tab());
}

export function getTabState() {
	return getContext<ReturnType<typeof setTabState>>(TAB_KEY);
}
