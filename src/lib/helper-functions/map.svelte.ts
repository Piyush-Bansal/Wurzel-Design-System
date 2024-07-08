/**
 * A function that maps a value from one scale to another scale.
 *
 * @param {number} min - The minimum value of the current scale.
 * @param {number} max - The maximum value of the current scale.
 * @param {number} value - The value to be mapped to the target scale.
 * @param {number} targetMin - The minimum value of the target scale.
 * @param {number} targetMax - The maximum value of the target scale.
 * @return {number} The mapped value in the target scale.
 */
export const map = (
	min: number,
	max: number,
	value: number,
	targetMin: number,
	targetMax: number
) => {
	return ((value - min) / (max - min)) * (targetMax - targetMin) + targetMin;
};
