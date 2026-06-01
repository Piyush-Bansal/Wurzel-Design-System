type MotionSpringOptions = {
	duration?: number; // ms
	bounce?: number; // 0..1
	mass?: number; // optional perceptual modifier
	precision?: number;
};

type SpringConfig = {
	stiffness: number;
	damping: number;
	precision: number;
};

const MIN_STIFFNESS = 0.001;
const MAX_STIFFNESS = 0.4;

const MIN_DAMPING = 0.05;
const MAX_DAMPING = 0.95;

const MIN_DURATION = 50;
const MAX_DURATION = 10_000;

const MIN_MASS = 0.5;
const MAX_MASS = 5;

const DEFAULT_PRECISION = 0.01;

function clamp(min: number, max: number, value: number) {
	return Math.min(max, Math.max(min, value));
}

function bounceToDamping(bounce: number) {
	const b = clamp(0, 1, bounce);

	// Stronger non-linear spread so bounce is actually noticeable.
	// Higher bounce => lower damping.
	const raw = 0.94 - 0.82 * Math.pow(b, 1.55);

	return clamp(MIN_DAMPING, MAX_DAMPING, raw);
}

function settleTimeFor(
	stiffness: number,
	damping: number,
	mass: number,
	precision: number
) {
	let current = 0;
	let last = 0;
	const target = 1;
	const dt = 1; // one 60Hz frame step in Svelte-like units
	const invMass = 1 / mass;

	for (let frame = 0; frame < 20_000; frame++) {
		const delta = target - current;
		const velocity = (current - last) / (dt || 1 / 60);
		const spring = stiffness * delta;
		const damper = damping * velocity;
		const acceleration = (spring - damper) * invMass;
		const d = (velocity + acceleration) * dt;

		if (Math.abs(d) < precision && Math.abs(delta) < precision) {
			return frame / 60;
		}

		last = current;
		current += d;
	}

	return Infinity;
}

function solveStiffness(
	targetSeconds: number,
	damping: number,
	mass: number,
	precision: number
) {
	let low = MIN_STIFFNESS;
	let high = MAX_STIFFNESS;
	let best = low;
	let bestError = Infinity;

	for (let pass = 0; pass < 6; pass++) {
		bestError = Infinity;

		for (let i = 0; i <= 48; i++) {
			const stiffness = low + ((high - low) * i) / 48;
			const settled = settleTimeFor(stiffness, damping, mass, precision);
			const error = Math.abs(settled - targetSeconds);

			if (error < bestError) {
				bestError = error;
				best = stiffness;
			}
		}

		const span = (high - low) / 12;
		low = clamp(MIN_STIFFNESS, MAX_STIFFNESS, best - span);
		high = clamp(MIN_STIFFNESS, MAX_STIFFNESS, best + span);

		if (high - low < 0.0005) break;
	}

	return clamp(MIN_STIFFNESS, MAX_STIFFNESS, best);
}

export function motionSpring({
	duration = 800,
	bounce = 0.3,
	mass = 1,
	precision = DEFAULT_PRECISION
}: MotionSpringOptions = {}): SpringConfig {
	const safeDuration = clamp(MIN_DURATION, MAX_DURATION, duration);
	const safeMass = clamp(MIN_MASS, MAX_MASS, mass);
	const safePrecision = Math.max(0.0001, precision);

	const damping = bounceToDamping(bounce);
	const targetSeconds = safeDuration / 1000;
	const stiffness = solveStiffness(
		targetSeconds,
		damping,
		safeMass,
		safePrecision
	);

	return {
		stiffness,
		damping,
		precision: safePrecision
	};
}
