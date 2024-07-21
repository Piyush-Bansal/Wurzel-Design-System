<script lang="ts">
	import '$styles/main.scss';
	import { smooth } from '$lib/helper-functions/smooth-scroll';
	import { browser } from '$app/environment';

	//enable smooth scroll
	if (browser) {
		smooth();
	}

	let { children } = $props();
</script>

{@render children()}
