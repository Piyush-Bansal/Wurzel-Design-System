import type { ActiveID } from './types';

function logic() {
	let currentActiveID: ActiveID = $state({ activeID: null });
	return currentActiveID;
}

export let collapseLogic = logic();
