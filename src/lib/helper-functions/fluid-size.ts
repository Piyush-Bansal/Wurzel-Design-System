import {
	ssLargeHigh,
	ssLargeLow,
	ssMediumHigh,
	ssMediumLow,
	ssSmallHigh,
	ssSmallLow
} from './breakpoints-store.svelte';
import { screenSize } from './screen-size.svelte';

interface SizeRange {
	high: number;
	low: number;
}

function calculateFluidSize(val: number, range: SizeRange): string {
	const { high, low } = range;
	const sizeSmall = (val / high) * low;
	const sizeDifference = val - sizeSmall;
	const screenSizeDifference = high - low;
	const rateOfChange = (sizeDifference / screenSizeDifference) * 100;
	const smallRem = sizeSmall / 16;
	const largeRem = val / 16;
	const pxAdjustment = rateOfChange * (high / 100) - val;
	const remAdjustment = pxAdjustment / 16;

	return formatClamp(smallRem, rateOfChange, remAdjustment, largeRem);
}

function formatClamp(
	smallRem: number,
	rateOfChange: number,
	remAdjustment: number,
	largeRem: number
): string {
	const formatNumber = (num: number): string =>
		Number(num.toFixed(10)).toString();
	return `clamp(${formatNumber(smallRem)}rem, ${formatNumber(rateOfChange)}vw - ${formatNumber(remAdjustment)}rem, ${formatNumber(largeRem)}rem)`;
}

export function getFluidSize(val: number): string {
	if (screenSize.width >= ssLargeLow) {
		return calculateFluidSize(val, { high: ssLargeHigh, low: ssLargeLow });
	} else {
		const range: SizeRange =
			screenSize.width >= ssMediumLow
				? { high: ssMediumHigh, low: ssMediumLow }
				: { high: ssSmallHigh, low: ssSmallLow };
		const sizeLarge = (val / range.low) * range.high;
		return calculateFluidSize(sizeLarge, range);
	}
}
