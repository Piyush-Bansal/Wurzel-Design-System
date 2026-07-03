<script lang="ts">
	import { useCamera } from '$lib/interactions/signals/camera.svelte';
	import gsap from 'gsap';
	import { getSpatialGallery } from './functionality.svelte';
	import type { Card } from './types';

	let { details }: Card = $props();

	const functionality = getSpatialGallery();

	const camera = $derived.by(() => {
		if (!functionality.galleryWrapper) return;
		return useCamera(
			functionality.pointer,
			functionality.galleryWrapper,
			30,
			10
		);
	});

	let card = $state<HTMLDivElement>();

	const depthFactor = $derived(
		gsap.utils.mapRange(-500, 0, 0, 1, details.depth)
	);

	let xTo: gsap.QuickToFunc;
	let yTo: gsap.QuickToFunc;
	let rotateXTo: gsap.QuickToFunc;
	let rotateYTo: gsap.QuickToFunc;

	$effect(() => {
		if (!card) return;

		gsap.set(card, {
			rotationX: details.rotateX,
			rotationY: details.rotateY
		});

		xTo = gsap.quickTo(card, 'x', {
			duration: 0.2,
			ease: 'sine.out'
		});

		yTo = gsap.quickTo(card, 'y', {
			duration: 0.2,
			ease: 'sine.out'
		});

		rotateXTo = gsap.quickTo(card, 'rotationX', {
			duration: 0.2,
			ease: 'sine.out'
		});

		rotateYTo = gsap.quickTo(card, 'rotationY', {
			duration: 0.2,
			ease: 'sine.out'
		});
	});

	const pose = $state({
		idle: {
			y: 0,
			rotationX: 0,
			rotationY: 0
		},
		camera: {
			x: 0,
			y: 0,
			xRotation: 0,
			yRotation: 0
		}
	});

	$effect(() => {
		if (!camera) return;

		pose.camera = {
			x: camera.translateX * depthFactor,
			y: camera.translateY * depthFactor,
			xRotation: camera.rotateX + details.rotateX,
			yRotation: camera.rotateY + details.rotateY
		};
	});

	$effect(() => {
		const ctx = gsap.context(() => {
			gsap.to(pose.idle, {
				y: pose.camera.y + gsap.utils.random(-6, 6),
				rotationX: pose.camera.xRotation + gsap.utils.random(-1, 1),
				rotationY: pose.camera.yRotation + gsap.utils.random(-1, 1),
				duration: gsap.utils.random(3, 6),
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});
		}, card);

		return () => ctx.revert();
	});

	$effect(() => {
		xTo(pose.camera.x);
		yTo(pose.camera.y + pose.idle.y);
		rotateXTo(pose.camera.xRotation + pose.idle.rotationX);
		rotateYTo(pose.camera.yRotation + pose.idle.rotationY);
	});
</script>

<div
	class="card"
	style:--x={details.x}
	style:--y={details.y}
	style:--depth={details.depth}
	style:--rotate-x={details.rotateX}
	style:--rotate-y={details.rotateY}
	bind:this={card}
>
	<img src={details.image} alt="" />
</div>

<style lang="scss">
	@use '$tokens' as *;
	@use '$sizes' as *;

	.card {
		position: absolute;
		width: $col-wide-2;
		aspect-ratio: 3/4;
		border-radius: $br-soft;
		overflow: hidden;

		top: calc(var(--y) * 1px);
		left: calc(var(--x) * 1px);
		transform: translate(-50%, -50%) translateZ(calc(var(--depth) * 1px));

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
