<div class="container">
	<h1 class="test">Home</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi inventore
		beatae suscipit perferendis similique, hic cumque quo deserunt eaque velit
		nemo assumenda cum dolor expedita nulla earum consectetur error, quos modi a
		magnam exercitationem reprehenderit! Natus aliquam quod architecto velit
		quia corrupti. Exercitationem minus cupiditate non cum, provident voluptatum
		voluptate.
	</p>
	<p>
		Fugit sint cumque ut non praesentium nostrum blanditiis magni inventore,
		consectetur iusto dolorum debitis, enim est adipisci illum deleniti ratione?
		Officia, labore. Asperiores quas ducimus commodi doloribus, nobis culpa
		voluptatem iusto autem at optio, suscipit consequuntur ea numquam distinctio
		deserunt quis dolore, quae aliquid. Corporis, illum. Veniam recusandae nemo
		accusantium!
	</p>
	<p>
		Fugit sint cumque ut non praesentium nostrum blanditiis magni inventore,
		consectetur iusto dolorum debitis, enim est adipisci illum deleniti ratione?
		Officia, labore. Asperiores quas ducimus commodi doloribus, nobis culpa
		voluptatem iusto autem at optio, suscipit consequuntur ea numquam distinctio
		deserunt quis dolore, quae aliquid. Corporis, illum. Veniam recusandae nemo
		accusantium!
	</p>
	<p>
		Fugit sint cumque ut non praesentium nostrum blanditiis magni inventore,
		consectetur iusto dolorum debitis, enim est adipisci illum deleniti ratione?
		Officia, labore. Asperiores quas ducimus commodi doloribus, nobis culpa
		voluptatem iusto autem at optio, suscipit consequuntur ea numquam distinctio
		deserunt quis dolore, quae aliquid. Corporis, illum. Veniam recusandae nemo
		accusantium!
	</p>
</div>

<style lang="scss">
	@use 'sass:math';
	@function calc-clamp($font-large) {
		$font-size-small: math.div($font-large, 1920) * 1080;

		// Calculate the difference in font sizes
		$font-size-difference: $font-large - $font-size-small;

		// Calculate the difference in screen sizes
		$screen-size-difference: 1920 - 1080;

		// Calculate the rate of change per vw unit
		$rate-of-change: math.div($font-size-difference, $screen-size-difference) *
			100vw;

		@debug $rate-of-change;

		// Convert the small font size to rem units
		$font-small-rem: math.div($font-size-small, 16) + rem;

		// Convert the large font size to rem units
		$font-large-rem: math.div($font-large, 16) + rem;

		// Calculate the px adjustment
		$px-adjustment: ($rate-of-change * math.div(1920, 100vw)) - $font-large;

		@debug $px-adjustment;

		// Convert the px adjustment to rem
		$rem-adjustment: math.div($px-adjustment, 16) + rem;

		// Return the clamp expression
		@return clamp(
			#{$font-small-rem},
			#{$rate-of-change + ' - ' + $rem-adjustment},
			#{$font-large-rem}
		);
	}

	// Example usage:
	// body {
	//   font-size: calc-clamp(20, 30, 1080, 1920);
	// }

	.test {
		font-size: calc-clamp(30);
		padding: var(--size-96);
	}
</style>
