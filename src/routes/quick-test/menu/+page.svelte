<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import { setMenuState } from './state/menu.state.svelte';
	setMenuState();
</script>

<div class="container | center">
	<div class="menu">
		{#each { length: 5 }, index}
			<MenuItem {index}><p>Item-{index + 1}</p></MenuItem>
		{/each}
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
