<script lang="ts">
	import ImageCyclerOptimised from '$components/image-cycler-optimised/ImageCyclerOptimised.svelte';

	let hovered = $state(false);

	const images = [
		'https://picsum.photos/400/400.webp?random=1',
		'https://picsum.photos/400/400.webp?random=2',
		'https://picsum.photos/400/400.webp?random=3',
		'https://picsum.photos/400/400.webp?random=4',
		'https://picsum.photos/400/400.webp?random=5'
	];
</script>

<div class="container | grid">
	<div
		class="span-3"
		role="presentation"
		onmouseenter={() => (hovered = true)}
		onmouseleave={() => (hovered = false)}
	>
		<ImageCyclerOptimised {images} active={hovered} interval={250} />
	</div>
</div>
