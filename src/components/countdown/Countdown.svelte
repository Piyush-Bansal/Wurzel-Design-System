<script lang="ts">
	import { createCountdown } from './functionality.svelte';
	import type { CountdownProps } from './types';

	let { targetDate, options }: CountdownProps = $props();

	const countdown = createCountdown(targetDate, options);

	$effect(() => {
		countdown.start();

		return () => {
			countdown.stop();
		};
	});
</script>

{#snippet count(type: number | string, label: string)}
	<div class="flex-column align-items-center">
		<div><h4>{type}</h4></div>
		<p>{label}</p>
	</div>
{/snippet}

<div class="countdown | flex align-items-center">
	{@render count(countdown.days, 'DD')}
	<p>:</p>
	{@render count(countdown.hours, 'HH')}
	<p>:</p>
	{@render count(countdown.minutes, 'MM')}
	<p>:</p>
	{@render count(countdown.seconds, 'SS')}
</div>

<style lang="scss">
	@use '$componentTokens/countdown' as *;
	.countdown {
		column-gap: $count-gap-x;
	}
</style>
