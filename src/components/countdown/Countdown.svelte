<script lang="ts">
	import { createCountdown } from './functionality.svelte';
	import type { CountdownProps } from './types';

	let { targetDate }: CountdownProps = $props();

	const countdown = createCountdown(targetDate);

	$effect(() => {
		countdown.start();
		return () => countdown.stop();
	});
</script>

<div class="countdown">
	<div>{countdown.days} Days</div>
	<div>{countdown.hours} Hours</div>
	<div>{countdown.minutes} Minutes</div>
	<div>{countdown.seconds} Seconds</div>
</div>
