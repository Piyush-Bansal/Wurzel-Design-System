<div class="carousel__next | absolute cursor-pointer">
	<img src="icons/chevron-right.svg" alt="" srcset="" />
</div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens/carousel' as *;

	.carousel__next {
		right: $right-padding;
		top: 29%;
		z-index: 1;
		transform-origin: center;
	}

	img {
		width: fluid-l(24);
		height: fluid-l(24);
	}
</style>
