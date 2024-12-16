<script lang="ts">
	import Countdown from '$components/countdown/Countdown.svelte';
</script>

<div class="container">
	<Countdown
		targetDate="2025-12-16T23:01:00"
		options={{ onComplete: () => console.log('YAY!') }}
	/>
</div>
