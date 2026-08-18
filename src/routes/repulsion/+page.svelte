<script lang="ts">
	import { RepulsionBehaviour } from './behaviour/target.behaviour.svelte';
	import { RepulsionState } from './state/target.state.svelte';

	let target = $state<HTMLElement>();

	$effect(() => {
		if (!target) return;
		const repulsionState = new RepulsionState(target);
		new RepulsionBehaviour(repulsionState);
	});
</script>

<div class="container | center">
	<div class="target | ar-1-1 cursor-pointer" bind:this={target}></div>
</div>

<style lang="scss">
	@use '$tokens' as *;
	.container {
		height: 100vh;
	}
	.target {
		height: $comp-size-xl;
		background-color: $clr-sur-disabled;
		border-radius: $br-full;
		will-change: transform;
	}
</style>
