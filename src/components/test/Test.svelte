<script lang="ts">
	import { onMount } from 'svelte';
	import { Test } from './functionality.svelte';

	const testState = new Test();

	let start = 0;
	let measured = false;
	let previous = 0;

	onMount(() => {
		start = performance.now();
		testState.xPosition.target = 1000;
	});

	$effect(() => {
		if (measured) return;

		const current = testState.xPosition.current;

		const delta = Math.abs(current - testState.xPosition.target);

		const velocity = Math.abs(current - previous);

		if (delta < 0.1 && velocity < 0.1) {
			measured = true;

			console.log('Settled in', performance.now() - start, 'ms');
		}

		previous = current;
	});
</script>

<div
	class="circle"
	style:transform={`translateX(${testState.xPosition.current}px)`}
></div>

<style>
	.circle {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		background-color: red;
	}
</style>
