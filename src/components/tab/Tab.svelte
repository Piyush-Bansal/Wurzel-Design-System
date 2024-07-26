<script lang="ts">
	import type { Tabs } from './types';
	import { getTabState, setTabState } from './functionality.svelte';

	let { activeTab, tabList, tabContent }: Tabs = $props();
	setTabState();
	const tabState = getTabState();
	tabState.activeTab = activeTab;
</script>

<!-- 
@component

## Tabs Component

The `Tabs` component is a UI component that allows you to create tabbed interfaces. It provides a way to organize content into separate panels, each associated with a tab.

### Usage

To use the `Tabs` component, you need to import it from the `'$components/tab'` module.

```svelte
<script lang="ts">
	import { Tabs, TabList, TabTrigger, TabContent } from '$components/tab';
</script>
```

### Props

The `Tabs` component accepts the following props:

- `activeTab`: A string representing the currently active tab.

### Slots

The `Tabs` component has two slots:

- `tabList`: This slot is used to define the tab list. It should contain `TabTrigger` components.

- `tabContent`: This slot is used to define the tab content. It should contain `TabContent` components.

### Example

Here's an example of how to use the `Tabs` component:

```svelte
<Tabs activeTab="tab1">
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
</Tabs>
```

In this example, the `activeTab` prop is set to `'tab1'`, indicating that the first tab is initially active. The `tabList` slot contains two `TabTrigger` components, each with a unique `value` prop. The `tabContent` slot contains two `TabContent` components, each with a unique `value` prop.

### Styling

The `Tabs` component does not provide any default styling. You can style it according to your needs using CSS or a CSS-in-JS solution like SCSS.

### Dependencies

The `Tabs` component depends on the following components:

- `TabList`: A component used to define the tab list.

- `TabTrigger`: A component used to define a tab trigger.

- `TabContent`: A component used to define the content of a tab.

### Transitions

The `Tabs` component uses the `fade` transition from the `svelte/transition` module to animate the tab content.

### Accessibility

The `Tabs` component follows the WAI-ARIA guidelines for tabs. It uses the `role="tablist"` and `role="tab"` attributes to provide the correct semantics. It also uses the `aria-selected` attribute to indicate the currently active tab.




-->

<div class="tabs">
	<div class="tab-list">
		{@render tabList()}
	</div>
	<div
		class="tab-content__wrapper | relative"
		style:height={`${tabState.contentHeight}px`}
	>
		{@render tabContent()}
	</div>
</div>

<style lang="scss">
	@use '$tokens/time' as *;
	.tab-content__wrapper {
		transition: height $time-3 ease-in-out;
	}
</style>
