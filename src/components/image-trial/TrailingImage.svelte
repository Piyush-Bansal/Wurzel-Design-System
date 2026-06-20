<script lang="ts">
	import { getImageTrailFunctionality } from './functionality.svelte';
	import type { TrailItem } from './types';

	let { details }: { details: TrailItem } = $props();

	const functionality = getImageTrailFunctionality();
</script>

<img
	src={details.src}
	alt=""
	class="trail-image"
	style:left={`${details.x}px`}
	style:top={`${details.y}px`}
	style:z-index={`${details.z}`}
	{@attach functionality.animate(details)}
/>

<style lang="scss">
	.trail-image {
		position: absolute;
		width: 200px;
		height: 200px;
		border-radius: 4px;
	}
</style>
