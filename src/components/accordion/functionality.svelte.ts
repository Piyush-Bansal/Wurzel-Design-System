// This will store the active ID for each group
const groupActiveIds = $state<Record<string, string | null>>({});

/**
 * Accordion component that can be toggled open or closed.
 * Optionally, accordions can be grouped to ensure only one is open per group.
 *
 * @public
 * @class Accordion
 *
 * @property {boolean} open - Whether the accordion is initially open (default: false).
 * @property {boolean} collapsable - Whether the accordion can be collapsed (default: true).
 * @property {string} group - Assigns the accordion to a specific group (optional).
 *
 * @property {boolean} active - Derived store indicating if the accordion is currently active (open and not in a group, or active within its group).
 * @property {boolean} isOpen - Derived store indicating if the accordion is currently open (depends on active state for collapsible accordions).
 *
 * @event click - Fired when the accordion is clicked.
 */
export class Accordion {
	readonly id: string = crypto.randomUUID();

	private _open = $state(false);
	private _collapsable = $state(true);
	private _group: string | undefined = undefined;

	constructor(
		open: boolean = false,
		collapsable: boolean = true,
		group?: string
	) {
		this._open = open;
		this._collapsable = collapsable;
		this._group = group;

		// Initialize state if accordion is open and collapsable
		if (this._collapsable && this._open && this._group) {
			groupActiveIds[this._group] = this.id;
			this._open = false;
		}
	}

	handleClick = () => {
		if (this._collapsable && this._group) {
			groupActiveIds[this._group] =
				groupActiveIds[this._group] === this.id ? null : this.id;
		} else {
			this._open = !this._open;
		}
	};

	active = $derived(
		this._group ? groupActiveIds[this._group] === this.id : this._open
	);
	isOpen = $derived(this._collapsable ? this.active : this._open);
}
