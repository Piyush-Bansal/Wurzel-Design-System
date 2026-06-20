<script lang="ts">
	import { useIntersection } from '$lib/interactions';

	let section = $state<HTMLElement>();
	let intersection = $derived(
		useIntersection(() => section, {
			threshold: Array.from({ length: 101 }, (_, i) => i / 100)
		})
	);
</script>

<div class="container | relative">
	<div class="section-1" bind:this={section}></div>
	<div class="info">
		<p>Intersecting: {intersection?.isIntersecting}</p>
		<p>Intersecting: {intersection?.ratio}</p>
	</div>
</div>

<style lang="scss">
	.section-1 {
		background-color: rgb(236, 235, 235);
		width: 100%;
		height: 60vh;
		margin-block: 500vh;
	}
	.info {
		position: fixed;
		top: 0;
		left: 10%;
	}
</style>
