<script lang="ts">
	import { List, ListItem, HoverImage } from '$components/list-hover';

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
		<HoverImage src="https://picsum.photos/800" />
		{#each listData as data, i (i)}
			<ListItem index={i + 1} content={data} />
		{/each}
	</List>
</div>
