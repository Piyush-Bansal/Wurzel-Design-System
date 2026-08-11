<script lang="ts">
	import {
		useBounds,
		useDistance,
		usePointer,
		useProximity
	} from '$lib/interactions';

	import gsap from 'gsap';

	const { children } = $props();

	let menuItemWrapper = $state<HTMLElement>();

	const pointer = usePointer();
	const bounds = $derived(menuItemWrapper && useBounds(menuItemWrapper));
	const distance = $derived(bounds && useDistance(pointer, bounds));
	const proximity = $derived(
		distance && useProximity(distance, { radius: 200 })
	);

	const xTo = $derived(
		menuItemWrapper &&
			gsap.quickTo(menuItemWrapper, 'x', {
				duration: 0.2,
				ease: 'power2.out'
			})
	);

	$effect(() => {
		if (!xTo || !proximity || !distance) return;

		if (proximity?.strength > 0.1) {
			xTo(-distance?.x * proximity.strength);
		} else {
			xTo(0);
		}
	});
</script>

<div class="menu-item-wrapper" bind:this={menuItemWrapper}>
	{@render children()}
</div>

<style lang="scss">
	.menu-item-wrapper {
		cursor: pointer;
	}
</style>
