import type { RepulsionState } from '../state/target.state.svelte';
import gsap from 'gsap';

export class RepulsionBehaviour {
	constructor(private readonly _target: RepulsionState) {
		$effect(() => {
			if (!_target.strength || !_target.direction) return;
			this.xTo?.(_target.direction?.x * _target.strength * 200);
			this.yTo?.(_target.direction?.y * _target.strength * 200);
		});
	}

	xTo = $derived.by(() => {
		if (!this._target.target) return;
		return gsap.quickTo(this._target.target, 'x', {
			duration: 0.2,
			ease: 'power2.out',
			transformOrigin: 'center center'
		});
	});

	yTo = $derived.by(() => {
		if (!this._target.target) return;
		return gsap.quickTo(this._target.target, 'y', {
			duration: 0.2,
			ease: 'power2.out',
			transformOrigin: 'center center'
		});
	});
}
