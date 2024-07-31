import { browser } from '$app/environment';

/**
 * Retrieves the value of a custom CSS property from the root element.
 *
 * @param {string} property - The name of the custom CSS property to retrieve.
 * @return {string | null} The value of the custom CSS property, or null if it is not found.
 */
export const getCustomProperty = (property: string): string | undefined => {
	if (!browser) return;
	const root = document.documentElement;
	const value = getComputedStyle(root).getPropertyValue(property).trim();
	return value;
};
