<script lang="ts">
	import {
		useBounds,
		useDistance,
		usePointer,
		useProximity
	} from '$lib/interactions';

	import gsap from 'gsap';

	let button = $state<HTMLElement>();
	const pointer = usePointer();

	let distance = $derived.by(() => {
		if (!button) return;
		const bound = useBounds(button);
		return useDistance(pointer, bound);
	});

	let proximity = $derived.by(() => {
		if (!distance) return;
		return useProximity(distance, { radius: 160 });
	});

	const xTo = $derived.by(() => {
		if (!button) return;
		return gsap.quickTo(button, 'x', { duration: 0.1, ease: 'power3' });
	});

	const yTo = $derived.by(() => {
		if (!button) return;
		return gsap.quickTo(button, 'y', { duration: 0.1, ease: 'power3' });
	});

	$effect(() => {
		if (
			proximity?.strength === undefined ||
			distance?.x === undefined ||
			distance?.y === undefined ||
			xTo === undefined ||
			yTo === undefined
		)
			return;
		if (proximity?.strength > 0.1) {
			xTo(distance?.x * proximity?.strength);
			yTo(distance?.y * proximity?.strength);
		} else {
			xTo(0);
			yTo(0);
		}
	});
</script>

<div class="container | grid">
	<div class="bg | span-12 place-col-3-12 ar-21-9 center">
		<div class="button" bind:this={button}></div>
	</div>
	<div>
		<p>{distance?.value}</p>
		<p>{proximity?.strength}</p>
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.bg {
		margin-top: 20vh;
		background-color: rgb(199, 198, 198);
	}

	.button {
		height: $comp-size-xl;
		width: $comp-size-xl;
		border-radius: $br-full;
		background-color: white;
		cursor: pointer;
	}
</style>
