// functionality.svelte.ts

// This will store the active ID for each group
const groupActiveIds = $state<Record<string, string | null>>({});

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
