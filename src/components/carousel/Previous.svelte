<div class="carousel__next | absolute cursor-pointer">
	<img src="icons/chevron-left.svg" alt="" srcset="" />
</div>

<style lang="scss">
	@use '$sizes' as *;
	@use '$tokens/carousel' as *;

	.carousel__next {
		left: $left-padding;
		top: 29%;
		z-index: 1;
		transform-origin: center;
	}

	img {
		width: fluid-l(24);
		height: fluid-l(24);
	}
</style>
