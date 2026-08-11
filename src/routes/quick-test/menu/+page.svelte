<script lang="ts">
	import MenuItem from './MenuItem.svelte';
</script>

<div class="container | center">
	<div class="menu">
		<MenuItem><p>Item-1</p></MenuItem>
		<MenuItem><p>Item-2</p></MenuItem>
		<MenuItem><p>Item-3</p></MenuItem>
		<MenuItem><p>Item-4</p></MenuItem>
		<MenuItem><p>Item-5</p></MenuItem>
	</div>
</div>

<style lang="scss">
	@use '$tokens' as *;
	.container {
		height: 100vh;

		.menu {
			display: flex;
			gap: $body-h-gap-spaced;
		}
	}
</style>
