<script lang="ts">
	import { browser } from '$app/env';
	import {
		useBounds,
		usePointer,
		useSpaces,
		useVelocity
	} from '$lib/interactions';
	import { loadImages } from '$lib/interactions/resources/image-loader.svelte';
	import TrailingImage from './TrailingImage.svelte';
	import type { TrailItem } from './types';

	const globalPointer = usePointer();
	let trailArea = $state<HTMLElement>();

	let images = [
		'https://picsum.photos/200/200.webp?random=1',
		'https://picsum.photos/200/200.webp?random=2',
		'https://picsum.photos/200/200.webp?random=3',
		'https://picsum.photos/200/200.webp?random=4',
		'https://picsum.photos/200/200.webp?random=5',
		'https://picsum.photos/200/200.webp?random=6',
		'https://picsum.photos/200/200.webp?random=7'
	];

	// if (browser) {
	// 	Promise.all(
	// 		images.map(
	// 			(src) =>
	// 				new Promise<string>((resolve) => {
	// 					const img = new Image();
	// 					img.onload = () => resolve(src);
	// 					img.onerror = () => resolve(src);
	// 					img.src = src;
	// 				})
	// 		)
	// 	).then((urls) => {
	// 		images = urls;
	// 	});
	// }

	const loadedImages = await loadImages(images);

	const bound = $derived.by(() => {
		if (!trailArea) return;
		return useBounds(trailArea);
	});

	const localPointer = $derived.by(() => {
		if (!trailArea || !bound) return;
		return useSpaces(globalPointer, bound);
	});

	let isHovering = $state(false);

	let zIndex = $state(0);

	let trail = $state<TrailItem[]>([]);

	const lastSpawn = {
		x: 0,
		y: 0
	};

	const SPAWN_DISTANCE = 150;

	let imageIndex = 0;

	let velocity = $derived(useVelocity(globalPointer));

	$effect(() => {
		if (!localPointer || !isHovering) return;

		const dX = localPointer?.local.x - lastSpawn.x;
		const dY = localPointer?.local.y - lastSpawn.y;

		const distance = Math.hypot(dX, dY);

		if (distance < SPAWN_DISTANCE) return;

		lastSpawn.x = localPointer?.local.x;
		lastSpawn.y = localPointer?.local.y;

		zIndex++;
		const targetIndex = imageIndex % images.length;

		const item = {
			id: crypto.randomUUID(),
			x: localPointer?.local.x,
			y: localPointer?.local.y,
			z: zIndex,
			src: loadedImages.loaded[targetIndex],
			speed: velocity.speed,
			angle: velocity.angleDegree
		};

		trail.push(item);

		imageIndex++;
	});

	$effect(() => {
		if (trail.length === 0) zIndex = 0;
	});

	function handleExit(id: ReturnType<typeof crypto.randomUUID>) {
		trail = trail.filter((entry) => entry.id !== id);
	}
</script>

<div
	class="trail-area"
	bind:this={trailArea}
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => (isHovering = false)}
	role="region"
>
	{#if isHovering}
		<p>{localPointer?.local.x}</p>
		<p>{localPointer?.local.y}</p>
		<p>{trail.length} images</p>
	{/if}

	{#each trail as img (img.id)}
		<TrailingImage details={{ ...img, onExit: handleExit }} />
	{/each}
</div>

<style lang="scss">
	.trail-area {
		width: 100%;
		height: 100vh;
		background-color: rgb(214, 214, 214);
		overflow: hidden;
		position: relative;
	}
</style>
