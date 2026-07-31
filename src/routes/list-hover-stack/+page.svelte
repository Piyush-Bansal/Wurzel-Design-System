<script lang="ts">
	import { HoverImage, List, ListItem } from '$components/list-hover';

	const listData = [
		{
			id: 1,
			title: 'Prow scuttle parrel provost Sail ho shrouds',
			imgURL: 'https://picsum.photos/200/300.webp?random=1'
		},
		{
			id: 2,
			title: 'Spirits boom mizzenmast yardarm',
			imgURL: 'https://picsum.photos/200/300.webp?random=2'
		},
		{
			id: 3,
			title: 'Pinnace holystone mizzenmast quarter',
			imgURL: 'https://picsum.photos/200/300.webp?random=3'
		},
		{
			id: 4,
			title: "Crow's nest nipperkin grog yardarm hempen halter furl",
			imgURL: 'https://picsum.photos/200/300.webp?random=4'
		},
		{
			id: 5,
			title: 'Swab barque interloper chantey doubloon',
			imgURL: 'https://picsum.photos/200/300.webp?random=5'
		}
	];

	const imageData = listData.map((data) => {
		return {
			id: data.id,
			src: data.imgURL
		};
	});
</script>

<div class="container">
	<List>
		<HoverImage {imageData} />
		{#each listData as data, i (data.id)}
			<ListItem index={i} content={data.title} id={data.id} />
		{/each}
	</List>
</div>
