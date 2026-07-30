<script lang="ts">
	import { usePointer, useVelocity } from '$lib/interactions';
	import { useDrag } from '$lib/interactions/signals/dragging.svelte';

	const pointer = usePointer();
	const velocity = useVelocity(pointer);
	const drag = useDrag(pointer, velocity);

	let world = $state<HTMLElement>();

	const camera = {
		x: 0,
		y: 0,
		scale: 1
	};

	$effect(() => {
		if (!world) return;

		if (drag.isDragging) {
			camera.x += drag.deltaX;
			camera.y += drag.deltaY;
			camera.scale = 0.5;
		} else {
			camera.scale = 1;
		}

		const matrix = new DOMMatrix()
			.translateSelf(camera.x, camera.y)
			.scaleSelf(camera.scale);

		world.style.transform = matrix.toString();
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="viewport" onpointerdown={() => drag.start()}>
	<div class="world" bind:this={world}></div>
</div>

<style>
	.viewport {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background: #111;
		cursor: grab;
	}

	.viewport:active {
		cursor: grabbing;
	}

	.world {
		position: absolute;
		width: 4000px;
		height: 4000px;

		transform-origin: 0 0;
		transition: scale 0.2s ease-out;

		background-image:
			linear-gradient(#333 1px, transparent 1px),
			linear-gradient(90deg, #333 1px, transparent 1px);

		background-size: 50px 50px;

		will-change: transform;
	}
</style>
