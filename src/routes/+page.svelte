<script lang="ts">
	import { TabList, Tabs, TabTrigger, TabContent } from '$components/tab';
</script>

<div class="container">
	<Tabs activeTab="tab1">
		{#snippet tabList()}
			<TabList>
				<TabTrigger value="tab1">Tab 1</TabTrigger>
				<TabTrigger value="tab2">Tab 22222222222222222</TabTrigger>
			</TabList>
		{/snippet}
		{#snippet tabContent()}
			<TabContent value="tab1">Content for Tab 1</TabContent>
			<TabContent value="tab2">Content for Tab 2</TabContent>
		{/snippet}
	</Tabs>
</div>

<style lang="scss">
</style>
