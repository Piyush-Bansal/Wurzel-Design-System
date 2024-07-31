<script lang="ts">
	import '$styles/main.scss';
	import { smooth } from '$lib/helper-functions/smooth-scroll';
	import { browser } from '$app/environment';
	import { screenSize } from '$lib/helper-functions/screen-size.svelte';

	//enable smooth scroll
	if (browser) {
		smooth();
	}

	let { children } = $props();
</script>

<!-- store screen width and height -->
<svelte:window
	bind:innerWidth={screenSize.width}
	bind:innerHeight={screenSize.height}
/>

<main>
	{@render children()}
</main>
