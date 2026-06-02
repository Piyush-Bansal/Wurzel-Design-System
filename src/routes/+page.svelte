<script lang="ts">
	import { List, ListItem, HoverImage } from '$components/list-hover';

	const listData = [
		{
			title: 'Prow scuttle parrel provost Sail ho shrouds',
			imgURL: 'https://picsum.photos/200/300.webp?random=1'
		},
		{
			title: 'Spirits boom mizzenmast yardarm',
			imgURL: 'https://picsum.photos/200/300.webp?random=2'
		},
		{
			title: 'Pinnace holystone mizzenmast quarter',
			imgURL: 'https://picsum.photos/200/300.webp?random=3'
		},
		{
			title: "Crow's nest nipperkin grog yardarm hempen halter furl",
			imgURL: 'https://picsum.photos/200/300.webp?random=4'
		},
		{
			title: 'Swab barque interloper chantey doubloon',
			imgURL: 'https://picsum.photos/200/300.webp?random=5'
		}
	];

	const imageSrcArr = listData.map((data) => data.imgURL);
</script>

<div class="container">
	<List>
		<HoverImage urls={imageSrcArr} />
		{#each listData as data, i (i)}
			<ListItem index={i} content={data.title} />
		{/each}
	</List>
</div>
