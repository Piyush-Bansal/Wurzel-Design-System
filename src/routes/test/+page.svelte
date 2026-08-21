<script lang="ts">
	import { useFluidSize } from '$lib/interactions/signals/fluidSize.svelte';

	const size = useFluidSize({
		lg: 100,
		md: 100,
		sm: 100
	});
</script>

<div class="container">
	<p>{size.value}</p>
</div>
