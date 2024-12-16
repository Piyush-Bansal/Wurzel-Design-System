<script lang="ts">
	import { getCountDownState, setCountDownState } from './functionality.svelte';
	import type { Date } from './types';

	let { targetDate }: Date = $props();

	setCountDownState();
	const currentState = getCountDownState();

	$effect(() => {
		currentState.targetDate = targetDate;

		currentState.calculateTimeLeft();

		return () => {
			currentState.resetTimeLeft();
			currentState.clearInterval();
		};
	});
</script>

<h4>{currentState.days}</h4>
<h4>{currentState.hr}</h4>
<h4>{currentState.min}</h4>
<h4>{currentState.sec}</h4>
