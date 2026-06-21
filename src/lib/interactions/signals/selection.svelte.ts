import { browser } from '$app/environment';

export function useSelection<T>(getSelection: () => T[]) {
	if (!browser) return;

	const items = $derived(getSelection());

	let currentIndex = $state<number | null>(null);
	let previousIndex = $state<number | null>(null);

	const current = $derived(currentIndex === null ? null : items[currentIndex]);

	const previous = $derived(
		previousIndex === null ? null : items[previousIndex]
	);

	return {
		get current(): T | null {
			return current;
		},

		get previous(): T | null {
			return previous;
		},

		get currentIndex() {
			return currentIndex;
		},

		get previousIndex() {
			return previousIndex;
		},

		get direction(): -1 | 0 | 1 {
			if (currentIndex === null || previousIndex === null) {
				return 0;
			}

			return currentIndex > previousIndex ? 1 : -1;
		},

		select(value: T) {
			const index = items.indexOf(value);

			if (index === -1) return;

			previousIndex = currentIndex;
			currentIndex = index;
		},

		clear() {
			currentIndex = null;
			previousIndex = null;
		},

		next() {
			if (currentIndex === null) return;

			if (currentIndex >= items.length - 1) return;

			previousIndex = currentIndex;
			currentIndex += 1;
		},

		back() {
			if (currentIndex === null) return;

			if (currentIndex <= 0) return;

			previousIndex = currentIndex;
			currentIndex -= 1;
		},

		loopNext() {
			if (items.length === 0) return;
			if (currentIndex === null) return;
			previousIndex = currentIndex;
			currentIndex = (currentIndex + 1) % items.length;
		},

		loopBack() {
			if (items.length === 0) return;
			if (currentIndex === null) return;
			previousIndex = currentIndex;
			currentIndex = (currentIndex - 1 + items.length) % items.length;
		},

		first() {
			if (items.length === 0) return;
			previousIndex = currentIndex;
			currentIndex = 0;
		},

		last() {
			if (items.length === 0) return;
			previousIndex = currentIndex;
			currentIndex = items.length - 1;
		},
		isSelected(value: T) {
			const index = items.indexOf(value);
			if (index === -1) return;
			return currentIndex === index;
		}
	};
}
