/**
 * Returns a throttled version of the input function. The throttled function will only be executed once every `limit` milliseconds.
 *
 * @param {(...args: any[]) => any} func - The function to be throttled.
 * @param {number} limit - The time in milliseconds between function executions.
 * @return {(...args: Parameters<T>) => void} - The throttled function.
 */
function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean = false;

	return function (this: any, ...args: Parameters<T>): void {
		const context = this;

		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

export default throttle;
