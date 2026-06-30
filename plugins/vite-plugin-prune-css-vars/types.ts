export type PreserveMatcher = string | RegExp;

export interface PruneCssVarsOptions {
	/**
	 * Glob patterns for files to scan.
	 */
	include?: string[];

	/**
	 * Glob patterns to ignore.
	 */
	exclude?: string[];

	/**
	 * Variables that should never be removed.
	 */
	preserve?: PreserveMatcher[];

	/**
	 * Enables debug logging.
	 */
	debug?: boolean;
}
