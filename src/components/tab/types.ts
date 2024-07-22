import type { Snippet } from 'svelte';

export interface Tabs {
	activeTab?: string | undefined;
	tabList: Snippet;
	tabContent: Snippet;
}

export interface TabList {
	children: Snippet;
}

export interface TabTrigger {
	value: string;
	children: Snippet;
}
export interface TabContext {
	value: string;
	children: Snippet;
}
