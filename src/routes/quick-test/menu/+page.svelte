<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import { getMenuState, setMenuState } from './state/menu.state.svelte';
	setMenuState();
	const menuState = getMenuState();

	function generateRandomLengthString(minLength: number, maxLength: number) {
		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		const randomLength =
			Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

		let result = '';
		for (let i = 0; i < randomLength; i++) {
			const randomIndex = Math.floor(Math.random() * chars.length);
			result += chars.charAt(randomIndex);
		}

		return result;
	}
</script>

<div class="container | center">
	<div class="menu">
		{#each { length: menuState.noOfItems }, index}
			<MenuItem {index}><p>{generateRandomLengthString(2, 25)}</p></MenuItem>
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
