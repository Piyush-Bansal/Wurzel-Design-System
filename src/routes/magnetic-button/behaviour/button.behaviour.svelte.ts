import type { ButtonState } from '../state/button.state.svelte';
import gsap from 'gsap';

export class ButtonBehaviour {
	private readonly buttonState = $state<ButtonState>();

	constructor(buttonState: ButtonState) {
		this.buttonState = buttonState;

		$effect(() => {
			if (!buttonState?.proximity || !buttonState?.distance) return;

			if (buttonState.proximity?.strength > 0.1) {
				this.xTo?.(buttonState.distance?.x * buttonState.proximity.strength);
				this.yTo?.(buttonState.distance?.y * buttonState.proximity.strength);
			} else {
				this.xTo?.(0);
				this.yTo?.(0);
			}
		});
	}

	private readonly button = $derived(
		this.buttonState && this.buttonState.button
	);

	private readonly xTo = $derived(
		this.button &&
			gsap.quickTo(this.button, 'x', {
				duration: 0.1,
				ease: 'power3'
			})
	);

	private readonly yTo = $derived(
		this.button &&
			gsap.quickTo(this.button, 'y', {
				duration: 0.1,
				ease: 'power3'
			})
	);
}
