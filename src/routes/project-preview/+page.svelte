<script lang="ts">
	import {
		Details,
		HoverDetails,
		List,
		ListItem
	} from '$components/list-preview-expand';

	import data from './data.json';
</script>

<List>
	<HoverDetails
		details={data.map((item) => {
			return {
				image: item.image,
				id: item.id,
				country: item.country,
				location: item.location
			};
		})}
	/>
	<Details
		details={data.map((item) => {
			return {
				image: item.image,
				id: item.id,
				country: item.country,
				location: item.location,
				details: item.detail
			};
		})}
	/>

	{#each data as item, index (item.id)}
		<ListItem id={item.id} {index} location={item.location} />
	{/each}
</List>
