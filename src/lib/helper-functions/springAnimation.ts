type SpringOptions = {
	duration?: number; // ms
	bounce?: number; // 0-1
	mass?: number; // 0.5-5
};

type SpringConfig = {
	stiffness: number;
	damping: number;
};

function clamp(min: number, max: number, value: number) {
	return Math.min(max, Math.max(min, value));
}

export function motionSpring({
	duration = 800,
	bounce = 0.3,
	mass = 1
}: SpringOptions = {}): SpringConfig {
	duration = clamp(50, 5000, duration);
	bounce = clamp(0, 1, bounce);
	mass = clamp(0.5, 5, mass);

	// Duration → stiffness
	// Shorter duration = higher stiffness
	const stiffness = clamp(0.01, 0.8, 800 / duration / Math.sqrt(mass));

	// Bounce → damping
	// More bounce = less damping
	const damping = clamp(0.01, 0.95, (1 - bounce * 0.8) / Math.pow(mass, 0.25));

	return {
		stiffness,
		damping
	};
}
