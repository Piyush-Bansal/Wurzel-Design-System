<script lang="ts">
	import { usePointer } from '$lib/interactions';
	import gsap from 'gsap';

	let square = $state<HTMLDivElement>();
	const pointer = usePointer();

	const pose = $state({
		x: 0
	});

	let xTo: gsap.QuickToFunc;

	$effect(() => {
		if (!square) return;
		xTo = gsap.quickTo(square, 'x', { duration: 0.2, ease: 'none' });
	});

	$effect(() => {
		gsap.to(pose, {
			x: 100,
			repeat: -1,
			yoyo: true,
			duration: 0.2,
			ease: 'none'
		});
	});

	$effect(() => {
		xTo(pose.x + pointer.x);
	});
</script>

<div class="container">
	<div class="square" bind:this={square}></div>
</div>

<style>
	.container {
		overflow: hidden;
		height: 100vh;
	}
	.square {
		background-color: yellow;
		height: 50px;
		width: 50px;
	}
</style>
