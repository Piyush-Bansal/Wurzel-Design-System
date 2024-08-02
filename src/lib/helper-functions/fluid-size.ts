import {
	ssLargeHigh,
	ssLargeLow,
	ssMediumHigh,
	ssMediumLow,
	ssSmallHigh,
	ssSmallLow
} from './breakpoints-store.svelte';
import { screenSize } from './screen-size.svelte';

export function getFluidSize(val: number) {
	const largeHigh =
		screenSize.width >= ssLargeLow
			? ssLargeHigh
			: screenSize.width >= ssMediumLow
				? ssMediumHigh
				: ssSmallHigh;
	const largeLow =
		screenSize.width >= ssLargeLow
			? ssLargeLow
			: screenSize.width >= ssMediumLow
				? ssMediumLow
				: ssSmallLow;

	const sizeSmall = (val / largeHigh) * largeLow;
	const sizeDifference = val - sizeSmall;
	const screenSizeDifference = largeHigh - largeLow;
	const rateOfChange = (sizeDifference / screenSizeDifference) * 100;

	const smallRem = sizeSmall / 16;
	const largeRem = val / 16;

	const pxAdjustment = rateOfChange * (largeHigh / 100) - val;
	const remAdjustment = pxAdjustment / 16;

	// Format numbers to 10 decimal places
	const formatNumber = (num: number): string =>
		Number(num.toFixed(10)).toString();

	return `clamp(${formatNumber(smallRem)}rem, ${formatNumber(rateOfChange)}vw - ${formatNumber(remAdjustment)}rem, ${formatNumber(largeRem)}rem)`;
}
