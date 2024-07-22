<script lang="ts">
	import { getContext } from 'svelte';
	import { activeTab } from './functionality.svelte';
	import type { TabContext } from './types';
	import { fade } from 'svelte/transition';
	import { cubicOut, expoInOut, quadIn } from 'svelte/easing';
	import { time3, time4, time5 } from '$lib/helper-functions/timing.svelte';

	let { children, value }: TabContext = $props();
</script>

{#if activeTab.tab === value}
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
	>
		{@render children()}
	</div>
{/if}
