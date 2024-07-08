<script lang="ts">
	import Button from '$components/button/Button.svelte';
	import Arrow from '$lib/icons/Arrow.svelte';
</script>

<div class="container | flow">
	<Button>
		Some text
		{#snippet rightIcon()}
			<Arrow />
		{/snippet}
	</Button>
</div>

<style lang="scss">
</style>
