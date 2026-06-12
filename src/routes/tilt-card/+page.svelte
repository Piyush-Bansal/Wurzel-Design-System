<script lang="ts">
	import { usePointer, useSpaces } from '$lib/interactions';
	import { useBounds } from '$lib/interactions/spatial/bounds.svelte';
	import type { Attachment } from 'svelte/attachments';
	import gsap from 'gsap';

	let card = $state<HTMLElement>();
	const pointer = usePointer();
	let space = $state<ReturnType<typeof useSpaces>>();

	let isHovering = $state(false);

	const rotationAngle = $derived.by(() => ({
		x: isHovering ? (space?.centred.x ?? 0) * -15 : 0,
		y: isHovering ? (space?.centred.y ?? 0) * 15 : 0
	}));

	$effect(() => {
		if (!card) return;
		const bound = useBounds(card);
		space = useSpaces(pointer, bound);
	});

	const motion: Attachment = (card) => {
		const tween = gsap.to(card, {
			rotationX: rotationAngle.y,
			rotationY: rotationAngle.x,
			duration: 0.15,
			ease: 'power2.out',
			overwrite: true
		});

		return () => {
			return tween.kill();
		};
	};
</script>

<div class="container | grid">
	<div
		role="presentation"
		class="card | place-col-6-8 ar-3-4"
		bind:this={card}
		onmouseenter={() => {
			isHovering = true;
		}}
		onmouseleave={() => {
			isHovering = false;
		}}
		{@attach motion}
	></div>
	<div class="span-3">
		<p>X: {space?.centred.x.toFixed(2)}</p>
		<p>RotationX: {rotationAngle.x.toFixed(1)} deg</p>
	</div>
	<div class="span-3">
		<p>Y: {space?.centred.y.toFixed(2)}</p>
		<p>RotationY: {rotationAngle.y.toFixed(1)} deg</p>
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
