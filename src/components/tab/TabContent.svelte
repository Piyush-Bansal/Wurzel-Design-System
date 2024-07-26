<script lang="ts">
	import { getTabState } from './functionality.svelte';
	import type { TabValue } from './types';
	import { fade } from 'svelte/transition';
	import { cubicOut, quadIn } from 'svelte/easing';
	import { time3, time4, time5 } from '$lib/helper-functions/timing.svelte';

	let { children, value }: TabValue = $props();
	let height: number | undefined = $state();
	let tabState = getTabState();

	$effect((): void => {
		if (tabState.activeTab === value && height) {
			tabState.contentHeight = height;
		}
	});
</script>

{#if tabState.activeTab === value}
	<div
		out:fade={{
			easing: quadIn,
			duration: time3
		}}
		in:fade={{
			easing: cubicOut,
			duration: time5,
			delay: time4
		}}
		bind:clientHeight={height}
		class="tab-content | absolute"
		id={`tabpannel-${value}`}
		role="tabpanel"
		tabindex={tabState.activeTab === value ? 0 : -1}
	>
		{@render children()}
	</div>
	<br />
{/if}
