import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface Button extends HTMLAttributes<HTMLButtonElement> {
	children?: Snippet;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
	leftIcon?: Snippet | undefined;
	rightIcon?: Snippet | undefined;
}

export type ButtonIcon = Snippet | undefined;
