<script lang="ts">
	import { usePointer, useSpaces } from '$lib/interactions';
	import { useBounds } from '$lib/interactions/spatial/bounds.svelte';

	let wrapper = $state<HTMLElement>();

	const pointer = usePointer();

	let space = $state<ReturnType<typeof useSpaces>>();

	$effect(() => {
		if (!wrapper) return;
		const bond = useBounds(wrapper);
		space = useSpaces(pointer, bond);
	});
</script>

<div class="wrapper" bind:this={wrapper}>
	<p>Local X: {space?.local.x}</p>
	<p>Local Y: {space?.local.y}</p>

	<p>Normalised X: {space?.normalised.x}</p>
	<p>Normalised Y: {space?.normalised.y}</p>

	<p>Centred X: {space?.centred.x}</p>
	<p>Centred Y: {space?.centred.y}</p>
</div>

<style>
	.wrapper {
		position: absolute;
		left: 20%;
		top: 100px;
		width: 50vw;
		height: 80vh;
		border: 1px solid red;
	}
</style>
