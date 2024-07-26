import type { Snippet } from 'svelte';

export interface Tabs {
	activeTab: string;
	tabList: Snippet;
	tabContent: Snippet;
}

export interface TabChildren {
	children: Snippet;
	label?: string;
}

export interface TabValue extends TabChildren {
	value: string;
}

export interface ClassTabInterface {
	activeTab: string | undefined;
	contentHeight: number;
	indicatorWidth: number;
	tabLeftPosition: number;
	tabHandleClick: (value: string) => void;
}
