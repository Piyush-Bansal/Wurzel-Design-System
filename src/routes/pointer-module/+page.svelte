<script lang="ts">
	import {
		createListener,
		removeListener,
		pointerDetails
	} from '$lib/interactions/signals/pointer.svelte';

	let x = $derived(pointerDetails.position.x);
	let y = $derived(pointerDetails.position.y);

	let speed = $derived(pointerDetails.speed);
	let angle = $derived(pointerDetails.angle);
	let isMoving = $derived(pointerDetails.isMoving);

	$effect(() => {
		createListener();

		return () => {
			removeListener();
		};
	});
</script>

<div class="container">
	<p>Position-x: {x}</p>
	<p>Position-y: {y}</p>
	<p>Speed: {speed}</p>
	<p>Angle: {angle}</p>
	<p>Is moving: {isMoving}</p>
</div>
