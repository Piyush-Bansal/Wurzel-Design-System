import { motionSpring } from '$lib/helper-functions/springAnimation';
import { Spring } from 'svelte/motion';

export class Test {
	xPosition = new Spring(0, motionSpring({ duration: 3000, bounce: 0.8 }));
}
