let activeId: string | null = $state(null);

export class Accordion {
	readonly id: string = crypto.randomUUID();

	private _open = $state(false);
	private _collapsable = $state(true);

	constructor(open: boolean = false, collapsable: boolean = true) {
		this._open = open;
		this._collapsable = collapsable;

		// Initialize state if accordion is open and collapsable
		if (this._collapsable && this._open) {
			activeId = this.id;
			this._open = false;
		}
	}

	private _toggleopen = () => {
		this._open = !this._open;
	};

	private _setActive = () => {
		activeId = activeId === this.id ? null : this.id;
	};

	handleClick = () => {
		this._collapsable ? this._setActive() : this._toggleopen();
	};

	active = $derived(activeId === this.id);
	isOpen = $derived(this._collapsable ? this.active : this._open);
}
