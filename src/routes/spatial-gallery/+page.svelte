<script lang="ts">
	import { Card, Gallery } from '$components/spatial-gallery';

	import data from './data.json';
</script>

<Gallery>
	{#each data as item}
		<Card details={item} />
	{/each}
</Gallery>
