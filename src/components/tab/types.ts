import type { Snippet } from 'svelte';

export interface Tabs {
	activeTab: string;
	tabList: Snippet;
	tabContent: Snippet;
}

export interface TabChildren {
	children: Snippet;
}

export interface TabValue extends TabChildren {
	value: string;
}

export type CurrentTab = { tabName: string | undefined };
