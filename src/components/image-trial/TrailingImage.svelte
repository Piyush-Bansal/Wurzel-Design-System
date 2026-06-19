<script lang="ts">
	import gsap from 'gsap';
	import type { TrailingImageProps } from './types';

	let { details }: { details: TrailingImageProps } = $props();

	const travelDistance = $derived(
		gsap.utils.mapRange(0, 80, 10, 120, details.speed)
	);

	function animateImage(image: HTMLImageElement) {
		const tl = gsap.timeline({
			onComplete: () => details.onExit(details.id)
		});
		tl.fromTo(
			image,
			{ scale: 0.4 },
			{
				scale: 1,
				ease: 'power2.out',
				duration: 0.25,
				rotate: gsap.utils.mapRange(-180, 180, -30, 30, details.angle)
			}
		).to(image, {
			yPercent: travelDistance,
			ease: 'power2.in',
			duration: 0.2,
			delay: 2
		});

		// document.addEventListener('visibilitychange', () => {
		// 	if (document.hidden) {
		// 		tl.pause();
		// 	} else {
		// 		tl.play();
		// 	}
		// });
	}
</script>

<img
	src={details.src}
	alt=""
	class="trail-image"
	style:left={`${details.x}px`}
	style:top={`${details.y}px`}
	style:z-index={`${details.z}`}
	{@attach animateImage}
/>

<style lang="scss">
	.trail-image {
		position: absolute;
		width: 200px;
		height: 200px;
		border-radius: 4px;
	}
</style>
