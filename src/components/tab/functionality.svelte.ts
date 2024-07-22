// export let activeTab = $state();
let setActiveTab = () => {
	let tab = $state();
	return {
		get tab() {
			return tab;
		},
		set tab(value) {
			tab = value;
		}
	};
};

export let activeTab = setActiveTab();

export class Tab {
	private _initialValue: string | undefined;
	constructor(initialValue: string) {
		this._initialValue = initialValue;
		if (this._initialValue === undefined) this._initialValue = 'tab1';
		activeTab.tab = this._initialValue;
	}

	handleClick(value) {
		activeTab.tab = value;
	}
}
