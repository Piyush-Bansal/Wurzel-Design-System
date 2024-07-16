import type { Snippet } from 'svelte';

export interface Accordion {
	children?: Snippet;
	collapsable?: boolean;
}

export interface AccordionItem {
	heading?: Snippet;
	description?: Snippet;
	open?: boolean;
}

export type ActiveID = {
	activeID: string | null;
};
