<script lang="ts">
	import {
		useActivity,
		useBounds,
		usePointer,
		useVelocity
	} from '$lib/interactions';
	import gsap from 'gsap';

	let follower = $state<HTMLElement>();
	const pointer = usePointer();

	const bound = $derived.by(() => {
		if (!follower) return;
		return useBounds(follower);
	});

	const followerSettings = {
		duration: 0.2,
		ease: 'none'
	};

	let xTo = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'x', followerSettings);
	});

	let yTo = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'y', followerSettings);
	});

	const offset = $derived.by(() => {
		if (!bound) return { x: 0, y: 0 };

		return {
			x: bound.rect.width / 2,
			y: bound.rect.height / 2
		};
	});

	const velocity = $derived(useVelocity(pointer));

	let scaleX = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'scaleX', followerSettings);
	});

	let scaleY = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'scaleY', followerSettings);
	});

	let rotatePointer = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'rotation', { duration: 0.07, ease: 'none' });
	});

	$effect(() => {
		if (!xTo || !yTo || !scaleX || !scaleY || !rotatePointer) return;
		xTo(pointer.x - offset.x);
		yTo(pointer.y - offset.y);

		scaleX(1 + velocity?.speed * 0.1);
		scaleY(1 - velocity?.speed * 0.05);

		rotatePointer(velocity?.angleDegree);
	});

	// reset
	const activity = useActivity(pointer);

	const resetScaleX = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'scaleX', { duration: 0.02, ease: 'none' });
	});

	const resetScaleY = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'scaleY', { duration: 0.02, ease: 'none' });
	});

	const resetRotatePointer = $derived.by(() => {
		if (!follower) return;
		return gsap.quickTo(follower, 'rotation', { duration: 0.02, ease: 'none' });
	});

	$effect(() => {
		if (
			activity.idleTime > 10 &&
			resetScaleX &&
			resetScaleY &&
			resetRotatePointer
		) {
			resetScaleX(1);
			resetScaleY(1);
			resetRotatePointer(0);
		}
	});
</script>

<div class="follower" bind:this={follower}></div>
<div class="container">
	<p>Speed: {velocity?.speed.toFixed(2)}</p>
	<p>Angle: {velocity?.angleDegree.toFixed(2)}</p>
	<p>X: {velocity?.dX}</p>
	<p>Y: {velocity?.dY}</p>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.follower {
		position: fixed;
		top: 0;
		left: 0;
		width: $ctrl-size-point;
		height: $ctrl-size-point;
		border: $stroke-hairline solid $clr-bdr-default;
		z-index: 9999;
		border-radius: $br-full;
		pointer-events: none;
	}

	.container {
		margin-top: $sec-gap-s;
	}
</style>
