<script lang="ts">
	import {
		loadImages,
		useBounds,
		useDistanceTrigger,
		usePointer,
		useSpaces,
		useVelocity
	} from '$lib/interactions';

	import TrailingImage from './TrailingImage.svelte';
	import type { TrailItem } from './types';

	let images = [
		'https://picsum.photos/200/200.webp?random=1',
		'https://picsum.photos/200/200.webp?random=2',
		'https://picsum.photos/200/200.webp?random=3',
		'https://picsum.photos/200/200.webp?random=4',
		'https://picsum.photos/200/200.webp?random=5',
		'https://picsum.photos/200/200.webp?random=6',
		'https://picsum.photos/200/200.webp?random=7'
	];

	const loadedImages = await loadImages(images);

	const globalPointer = usePointer();
	let trailArea = $state<HTMLElement>();

	const bound = $derived.by(() => {
		if (!trailArea) return;
		return useBounds(trailArea);
	});

	const localPointer = $derived.by(() => {
		if (!bound) return;
		const spaces = useSpaces(globalPointer, bound);
		return spaces?.local;
	});

	let isHovering = $state(false);

	let zIndex = $state(0);
	let trail = $state<TrailItem[]>([]);

	let imageIndex = 0;
	let velocity = $derived(useVelocity(globalPointer));

	function spawnImage() {
		if (!localPointer) return;

		zIndex++;
		const targetIndex = imageIndex % loadedImages.loaded.length;

		const item = {
			id: crypto.randomUUID(),
			x: localPointer?.x,
			y: localPointer?.y,
			z: zIndex,
			src: loadedImages.loaded[targetIndex],
			speed: velocity.speed,
			angle: velocity.angleDegree
		};

		trail.push(item);

		imageIndex++;
	}

	$effect(() => {
		if (!localPointer) return;
		useDistanceTrigger(localPointer, spawnImage);
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
		<p>{localPointer?.x}</p>
		<p>{localPointer?.y}</p>
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
