<script lang="ts">
	import { usePointer, useSpaces } from '$lib/interactions';
	import { useBounds } from '$lib/interactions/spatial/bounds.svelte';
	import { Spring } from 'svelte/motion';

	let card = $state<HTMLElement>();
	const pointer = usePointer();
	let space = $state<ReturnType<typeof useSpaces>>();

	const rotationAngle = new Spring(
		{ x: 0, y: 0 },
		{ stiffness: 0.2, damping: 0.5 }
	);

	$effect(() => {
		if (!card) return;
		const bound = useBounds(card);
		space = useSpaces(pointer, bound);
	});
</script>

<div class="container | grid">
	<div
		role="presentation"
		class="card | place-col-6-8 ar-3-4"
		bind:this={card}
		onmousemove={() => {
			rotationAngle.target = {
				x: (space?.centred.x ?? 0) * -15,
				y: (space?.centred.y ?? 0) * 15
			};
		}}
		onmouseleave={() => {
			rotationAngle.target = { x: 0, y: 0 };
		}}
		style:transform="rotateX({rotationAngle.current.x}deg) rotateY({rotationAngle
			.current.y}deg)"
	></div>
	<div class="span-3">
		<p>X: {space?.centred.x.toFixed(2)}</p>
		<p>RotationX: {rotationAngle.current.x.toFixed(2)} deg</p>
	</div>
	<div class="span-3">
		<p>Y: {space?.centred.y.toFixed(2)}</p>
		<p>RotationY: {rotationAngle.current.y.toFixed(2)} deg</p>
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.container {
		perspective: 1000px;
	}

	.card {
		margin-top: 20vh;
		background-color: rgb(201, 201, 201);
		border-radius: $br-large;
	}
</style>
