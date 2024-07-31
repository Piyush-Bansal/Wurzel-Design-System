<script lang="ts">
	let { number } = $props();
</script>

<div class="wrapper | center"><h3>{number}</h3></div>

<style lang="scss">
	.wrapper {
		border: 1px solid red;
		width: 100%;
		height: 100%;
	}
</style>
