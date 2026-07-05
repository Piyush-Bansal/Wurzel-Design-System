<script lang="ts">
	import { Card, Gallery } from '$components/spatial-gallery';

	import data from './data.json';
</script>

<Gallery>
	{#each data as item, i}
		<Card details={item} index={i} />
	{/each}
</Gallery>
