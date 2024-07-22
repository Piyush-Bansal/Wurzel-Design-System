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

export class Tab {
	private _initialValue: string | undefined;
	constructor(initialValue: string) {
		this._initialValue = initialValue;
		if (this._initialValue === undefined) this._initialValue = 'tab1';
		activeTab.tabName = this._initialValue;
	}

	handleClick(value) {
		activeTab.tabName = value;
	}
}
