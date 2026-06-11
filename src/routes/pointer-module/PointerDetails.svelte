<script lang="ts">
	import { usePointer } from '$lib/interactions/signals/pointer.svelte';

	const pointer = usePointer();
</script>

<p>Position-x: {pointer.x}</p>
<p>Position-y: {pointer.y}</p>
