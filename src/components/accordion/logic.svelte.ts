function logic() {
	let currentActiveID: { activeID: null | string } = $state({ activeID: null });
	return currentActiveID;
}

export let collapseLogic = logic();
