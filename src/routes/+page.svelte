<script lang="ts">
	import { Tab, TabList, TabTrigger, TabContent } from '$components/tab';
	const data = [
		{
			id: 1,
			url: 'https://picsum.photos/800'
		},
		{
			id: 2,
			url: 'https://picsum.photos/800'
		},
		{
			id: 3,
			url: 'https://picsum.photos/800'
		},
		{
			id: 4,
			url: 'https://picsum.photos/800'
		},
		{
			id: 5,
			url: 'https://picsum.photos/800'
		},
		{
			id: 6,
			url: 'https://picsum.photos/800'
		}
	];
</script>

<div class="container">
	<Tab activeTab="tab1">
		{#snippet tabList()}
			<TabList label="tablist">
				<TabTrigger value="tab1">Tab 1</TabTrigger>
				<TabTrigger value="tab2">Tab 2</TabTrigger>
			</TabList>
		{/snippet}
		{#snippet tabContent()}
			<TabContent value="tab1">Content for Tab 1</TabContent>
			<TabContent value="tab2">Content for Tab 2</TabContent>
		{/snippet}
	</Tab>
</div>

<style lang="scss">
</style>
