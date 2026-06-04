<script>
	import ImageCycler from '$components/image-cycler/ImageCycler.svelte';
	const images = [
		'https://picsum.photos/400/400.webp?random=1',
		'https://picsum.photos/400/400.webp?random=2',
		'https://picsum.photos/400/400.webp?random=3',
		'https://picsum.photos/400/400.webp?random=4',
		'https://picsum.photos/400/400.webp?random=5',
		'https://picsum.photos/400/400.webp?random=6',
		'https://picsum.photos/400/400.webp?random=7'
	];
</script>

{#snippet imageHover()}
	<div class="span-3">
		{let active = $state(false)}
		<div
			role="presentation"
			class="image-cycler"
			onmouseenter={() => (active = true)}
			onmouseleave={() => (active = false)}
		>
			<ImageCycler {images} {active} aspectRatio={'3/4'} interval={600} borderRadius="none"
			></ImageCycler>
		</div>
	</div>
{/snippet}

<div class="container | grid">
		{@render imageHover()}
		{@render imageHover()}
		{@render imageHover()}
		{@render imageHover()}
		{@render imageHover()}
</div>
