type UseDistanceTrigger = (
	pointer: { x: number; y: number },
	callback: () => void,
	threshold?: number
) => void;

let lastPosition = { x: 0, y: 0 };
let firstRun = true;

export const useDistanceTrigger: UseDistanceTrigger = function (
	pointer,
	callback,
	threshold = 40
) {
	const distance = Math.hypot(
		pointer.x - lastPosition.x,
		pointer.y - lastPosition.y
	);

	lastPosition = pointer;

	if (firstRun) {
		firstRun = false;
		return;
	}

	if (distance > threshold) {
		callback();
	}
};
