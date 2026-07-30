import { browser } from '$app/environment';

export function useIntersection(
	element: () => HTMLElement | undefined,
	options: IntersectionObserverInit = {}
) {
	if (!browser) {
		return {
			get isIntersecting() {
				return false;
			},
			get ratio() {
				return 0;
			},
			get entry() {
				return null;
			},
			disconnect() {}
		};
	}

	const node = $derived(element());
	let isIntersecting = $state(false);
	let ratio = $state(0);
	let entry = $state<IntersectionObserverEntry | null>(null);

	const observer = new IntersectionObserver((entries) => {
		const current = entries[0];
		if (!current) return;

		isIntersecting = current.isIntersecting;
		ratio = current.intersectionRatio;
		entry = current;
	}, options);

	$effect(() => {
		if (!node) return;
		observer.observe(node);

		return () => observer.disconnect();
	});

	return {
		get isIntersecting() {
			return isIntersecting;
		},
		get ratio() {
			return ratio;
		},
		get entry() {
			return entry;
		},
		disconnect() {
			observer.disconnect();
		}
	};
}
