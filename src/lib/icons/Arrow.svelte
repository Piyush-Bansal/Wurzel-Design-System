<script lang="ts">
	import type { Icon } from '$lib/types/icons';

	let { width = 24, height = 24 }: Icon = $props();
</script>

<svg
	{width}
	{height}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M13.0606 4.5L20.6453 12.0846L20.6404 12.0895L20.6572 12.1063L13.0606 19.7028L12 18.6422L17.8922 12.75H3V11.25H17.6893L12 5.56066L13.0606 4.5Z"
		fill="currentColor"
	/>
</svg>
