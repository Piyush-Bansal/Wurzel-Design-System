<script lang="ts">
	import { smooth } from '$lib/helper-functions/smooth-scroll';
	import Button from '$components/button/Button.svelte';
	import Slider from '$components/slider/Slider.svelte';
	import Arrow from '$lib/icons/Arrow.svelte';
	import { browser } from '$app/environment';

	if (browser) {
		smooth();
	}
</script>

<div class="container | flow">
	<Button>
		Some text
		{#snippet rightIcon()}
			<Arrow />
		{/snippet}
	</Button>
</div>

<Slider></Slider>

<style lang="scss">
</style>
