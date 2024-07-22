import type { CurrentTab } from './types';

/**
 * Returns the current active tab state.
 *
 * @return {CurrentTab} The current active tab state.
 */
function activeTabState(): CurrentTab {
	let currentTab: CurrentTab = $state({
		tabName: undefined
	});
	return currentTab;
}

export let activeTab: CurrentTab = activeTabState();

/**
 * Updates the active tab state with the given value.
 *
 * @param {string} value - The new value for the active tab.
 * @return {void} This function does not return anything.
 */
export function tabHandleClick(value: string): void {
	activeTab.tabName = value;
}
