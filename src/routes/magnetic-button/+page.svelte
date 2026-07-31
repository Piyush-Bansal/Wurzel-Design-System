<script lang="ts">
	import { ButtonBehaviour } from './behaviour/button.behaviour.svelte';
	import { ButtonState } from './state/button.state.svelte';

	const buttonState = new ButtonState();
	new ButtonBehaviour(buttonState);
</script>

<div class="container | grid">
	<div class="bg | span-12 place-col-3-12 ar-21-9 center">
		<div class="button" bind:this={buttonState.button}></div>
	</div>
	<div class="span-3 p-space">
		<p>PointerX: {buttonState.pointer.x}</p>
		<p>PointerY: {buttonState.pointer.y}</p>
		<p>Distance: {buttonState.distance?.value.toFixed(2)}</p>
		<p>Strength: {buttonState.proximity?.strength.toFixed(2)}</p>
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;

	.bg {
		margin-top: 20vh;
		background-color: rgb(199, 198, 198);
	}

	.button {
		height: $comp-size-xl;
		width: $comp-size-xl;
		border-radius: $br-full;
		background-color: white;
		cursor: pointer;
	}
</style>
