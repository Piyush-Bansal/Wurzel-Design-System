<script lang="ts">
	import {
		getImageTrailFunctionality,
		setImageTrailFunctionality
	} from './functionality.svelte';

	import TrailingImage from './TrailingImage.svelte';

	let images = [
		'https://picsum.photos/200/200.webp?random=1',
		'https://picsum.photos/200/200.webp?random=2',
		'https://picsum.photos/200/200.webp?random=3',
		'https://picsum.photos/200/200.webp?random=4',
		'https://picsum.photos/200/200.webp?random=5',
		'https://picsum.photos/200/200.webp?random=6',
		'https://picsum.photos/200/200.webp?random=7'
	];

	setImageTrailFunctionality(images);
	const functionality = getImageTrailFunctionality();
</script>

<div
	class="trail-area"
	bind:this={functionality.trailArea}
	onmouseenter={() => (functionality.isHovering = true)}
	onmouseleave={() => (functionality.isHovering = false)}
	role="region"
>
	{#if functionality.isHovering}
		<p>{functionality.localPointer?.x}</p>
		<p>{functionality.localPointer?.y}</p>
		<p>{functionality.trail.length} images</p>
	{/if}

	{#each functionality.trail as img (img.id)}
		<TrailingImage details={img} />
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
