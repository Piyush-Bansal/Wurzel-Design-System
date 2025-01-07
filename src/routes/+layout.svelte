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

<!-- preload typeface -->
{#snippet loadFont(fontName: string)}
	<link
		rel="preconnect"
		as="font"
		crossorigin="anonymous"
		type="font/woff2"
		href={`/fonts/${fontName}.woff2`}
	/>
{/snippet}

<svelte:head>
	{@render loadFont('Switzer-Variable')}
	{@render loadFont('Switzer-VariableItalic')}
</svelte:head>

<main>
	{@render children()}
</main>
