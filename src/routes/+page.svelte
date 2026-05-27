<script lang="ts">
	import { List, ListItem } from '$components/list-hover';

	let listData = [
		'Prow scuttle parrel provost Sail ho shrouds',
		'Spirits boom mizzenmast yardarm',
		'Pinnace holystone mizzenmast quarter',
		"Crow's nest nipperkin grog yardarm hempen halter furl",
		'Swab barque interloper chantey doubloon'
	];
</script>

<div class="container">
	<List>
		{#each listData as data, i (crypto.randomUUID())}
			<ListItem index={i + 1} content={data} />
		{/each}
	</List>
</div>
