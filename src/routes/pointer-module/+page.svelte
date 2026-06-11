<script lang="ts">
	import PointerDetails from './PointerDetails.svelte';
	let showDetails = $state(true);
</script>

<div class="container">
	<form>
		<input type="checkbox" bind:checked={showDetails} />
		<label for="subscribe">Show PointerDetails</label>
	</form>

	{#if showDetails}
		<PointerDetails />
	{/if}
</div>
