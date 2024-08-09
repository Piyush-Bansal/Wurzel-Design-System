// @ts-nocheck

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const smooth = function () {
	const lenis = new Lenis({
		lerp: 0.1,
		wheelMultiplier: 3,
		infinite: false,
		gestureOrientation: 'vertical',
		normalizeWheel: false,
		smoothTouch: false
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	const connectToScrollTrigger = function () {
		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
	};
	connectToScrollTrigger();
};
