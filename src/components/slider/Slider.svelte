<script lang="ts">
	import { map } from '$lib/helper-functions/map.svelte';

	let inputValue: number = $state(50);

	const scale = $derived(map(0, 100, inputValue, 0, 100));
</script>

{scale}<br />
<input type="range" bind:value={inputValue} min="0" max="100" step="10" />

<style lang="scss">
	$slider-track-bg: #053a5f;
	$slider-track-height: 0.5rem;
	$slider-track-radius: 0.5rem;
	$slider-thumb-height: 2rem;
	$slider-thumb-width: 1rem;
	$slider-thumb-focus-border: 1px solid #053a5f;
	$slider-thumb-focus-outline: 3px solid #053a5f;
	$slider-thumb-focus-outline-offset: 0.125rem;

	input[type='range'] {
		appearance: none;
		background: transparent;
		cursor: pointer;
		width: auto;

		&::-webkit-slider-runnable-track {
			background-color: $slider-track-bg;
			border-radius: $slider-track-radius;
			height: $slider-track-height;
		}

		&::-webkit-slider-thumb {
			appearance: none;
			margin-top: -12px;

			background-color: #5cd5eb;
			height: $slider-thumb-height;
			width: $slider-thumb-width;
		}

		&::-moz-range-track {
			background-color: $slider-track-bg;
			border-radius: $slider-track-radius;
			height: $slider-track-height;
		}

		&::-moz-range-thumb {
			border: none;
			border-radius: 0;

			background-color: #5cd5eb;
			height: $slider-thumb-height;
			width: $slider-thumb-width;
		}

		&:focus {
			outline: none;

			&::-webkit-slider-thumb {
				border: $slider-thumb-focus-border;
				outline: $slider-thumb-focus-outline;
				outline-offset: $slider-thumb-focus-outline-offset;
			}

			&::-moz-range-thumb {
				border: $slider-thumb-focus-border;
				outline: $slider-thumb-focus-outline;
				outline-offset: $slider-thumb-focus-outline-offset;
			}
		}
	}
</style>
