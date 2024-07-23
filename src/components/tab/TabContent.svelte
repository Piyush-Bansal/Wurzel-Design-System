<script lang="ts">
	import { activeTab } from './functionality.svelte';
	import type { TabValue } from './types';
	import { fade } from 'svelte/transition';
	import { cubicOut, quadIn } from 'svelte/easing';
	import { time3, time4, time5 } from '$lib/helper-functions/timing.svelte';

	let { children, value }: TabValue = $props();
</script>

{#if activeTab.tabName === value}
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
		class="tab-content | absolute"
		id={`tabpannel-${value}`}
		role="tabpanel"
		tabindex={activeTab.tabName === value ? 0 : -1}
	>
		{@render children()}
	</div>
{/if}
