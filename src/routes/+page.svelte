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

<p>
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem quam
	dignissimos facilis error nemo numquam, consectetur suscipit nulla doloremque
	dolorum tempora laudantium cupiditate perferendis, laborum minus adipisci
	nesciunt placeat maiores corrupti at quos architecto possimus voluptate?
	Soluta, molestiae recusandae. Officiis excepturi non ut nostrum, quam beatae
	ullam veniam accusantium, porro asperiores quo nulla similique officia
	inventore debitis tenetur odit unde maiores nesciunt. Corrupti laudantium
	maxime porro reprehenderit qui quisquam distinctio accusamus dolorem? Numquam,
	cupiditate! Numquam amet laboriosam quo sapiente odit nam eos fugiat ipsa
	blanditiis! Nobis suscipit labore, tempora perspiciatis ipsam dolore eaque
	debitis distinctio reiciendis, fugit minima laudantium, assumenda rem placeat?
	Quasi perspiciatis, tempore sint, suscipit amet corporis nostrum ea numquam
	temporibus aliquam officia quis aperiam repellat incidunt maiores? Nostrum
	quia hic enim, possimus sed ut temporibus cumque, repellendus veniam esse
	neque quo, rerum culpa molestiae dignissimos error labore obcaecati. Voluptate
	a temporibus accusamus, quos dolorem voluptatum minima odio architecto! Sunt
	eos quis similique. Voluptatem, nihil culpa nam explicabo voluptatum, minima
	optio vero ullam maiores eaque voluptate magni aliquid qui expedita distinctio
	ratione sequi adipisci fugit mollitia modi tempore! Vitae, ipsa explicabo!
	Esse, fugit voluptates. Atque tempore laborum quidem, soluta id debitis omnis
	quaerat ullam similique architecto, eligendi delectus ratione, fuga dolorum!
	Eos, eaque? Deleniti in quos necessitatibus enim saepe qui vitae non ullam
	ipsam exercitationem officia est alias, tempore dolorum a laudantium incidunt
	soluta sequi eos natus labore cupiditate. Dolores, esse. Quo tenetur, id amet
	nulla assumenda a voluptates, officiis laboriosam quam optio deserunt
	provident soluta minima autem aliquam odit rem deleniti. Nesciunt ratione
	quos, obcaecati sed maxime repellendus, ipsa aliquam corrupti ipsum a dolore
	earum iure fugiat beatae nulla nemo velit. Sed aspernatur, iusto repellat
	maxime ipsum doloremque, eveniet inventore ab sapiente fugit atque praesentium
	omnis obcaecati temporibus porro libero error laborum laboriosam, voluptatem
	consequatur quas. Facere est debitis natus et saepe, odio ipsa! Repellendus
	nulla, non saepe aperiam perferendis ipsa explicabo dignissimos natus quidem
	magnam impedit officia corrupti numquam id. Exercitationem culpa iusto iste,
	voluptates hic possimus dolores nobis debitis quam id, nostrum qui molestias
	cum ea suscipit velit molestiae cumque facilis fugiat rerum libero pariatur.
	Quae porro vel molestias assumenda illo quod suscipit iure, consectetur earum
	provident nisi hic tempore dolorum sint aut cum, quasi harum laudantium
	consequatur. Repellat voluptas, in harum sint consectetur a dolores odio
	aspernatur vel amet ad, minima quas facere corporis! Expedita, corrupti quam?
	Beatae alias commodi non magnam ipsa mollitia obcaecati aperiam inventore
	necessitatibus placeat in vel quasi dolore tenetur iste itaque voluptates quod
	animi nam nesciunt, molestiae esse enim architecto. Optio aperiam sed nam vero
	autem dignissimos praesentium fugiat non eligendi! Facere distinctio magnam
	totam nobis non maiores dolores reprehenderit, placeat quis itaque.
	Voluptatibus quam recusandae officiis quia expedita repellat enim, tempore
	quaerat mollitia suscipit dolorum consectetur et nihil laudantium autem sint
	ab accusamus explicabo exercitationem nam quod magni dolor dignissimos dicta!
	Magni, quam? Eaque veritatis error quaerat dolorem, ducimus iste repudiandae
	aliquid, hic aspernatur libero quo repellendus quasi iusto dolor magni impedit
	esse, voluptate dolore tenetur odio? Maiores.
</p>
<p>
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem quam
	dignissimos facilis error nemo numquam, consectetur suscipit nulla doloremque
	dolorum tempora laudantium cupiditate perferendis, laborum minus adipisci
	nesciunt placeat maiores corrupti at quos architecto possimus voluptate?
	Soluta, molestiae recusandae. Officiis excepturi non ut nostrum, quam beatae
	ullam veniam accusantium, porro asperiores quo nulla similique officia
	inventore debitis tenetur odit unde maiores nesciunt. Corrupti laudantium
	maxime porro reprehenderit qui quisquam distinctio accusamus dolorem? Numquam,
	cupiditate! Numquam amet laboriosam quo sapiente odit nam eos fugiat ipsa
	blanditiis! Nobis suscipit labore, tempora perspiciatis ipsam dolore eaque
	debitis distinctio reiciendis, fugit minima laudantium, assumenda rem placeat?
	Quasi perspiciatis, tempore sint, suscipit amet corporis nostrum ea numquam
	temporibus aliquam officia quis aperiam repellat incidunt maiores? Nostrum
	quia hic enim, possimus sed ut temporibus cumque, repellendus veniam esse
	neque quo, rerum culpa molestiae dignissimos error labore obcaecati. Voluptate
	a temporibus accusamus, quos dolorem voluptatum minima odio architecto! Sunt
	eos quis similique. Voluptatem, nihil culpa nam explicabo voluptatum, minima
	optio vero ullam maiores eaque voluptate magni aliquid qui expedita distinctio
	ratione sequi adipisci fugit mollitia modi tempore! Vitae, ipsa explicabo!
	Esse, fugit voluptates. Atque tempore laborum quidem, soluta id debitis omnis
	quaerat ullam similique architecto, eligendi delectus ratione, fuga dolorum!
	Eos, eaque? Deleniti in quos necessitatibus enim saepe qui vitae non ullam
	ipsam exercitationem officia est alias, tempore dolorum a laudantium incidunt
	soluta sequi eos natus labore cupiditate. Dolores, esse. Quo tenetur, id amet
	nulla assumenda a voluptates, officiis laboriosam quam optio deserunt
	provident soluta minima autem aliquam odit rem deleniti. Nesciunt ratione
	quos, obcaecati sed maxime repellendus, ipsa aliquam corrupti ipsum a dolore
	earum iure fugiat beatae nulla nemo velit. Sed aspernatur, iusto repellat
	maxime ipsum doloremque, eveniet inventore ab sapiente fugit atque praesentium
	omnis obcaecati temporibus porro libero error laborum laboriosam, voluptatem
	consequatur quas. Facere est debitis natus et saepe, odio ipsa! Repellendus
	nulla, non saepe aperiam perferendis ipsa explicabo dignissimos natus quidem
	magnam impedit officia corrupti numquam id. Exercitationem culpa iusto iste,
	voluptates hic possimus dolores nobis debitis quam id, nostrum qui molestias
	cum ea suscipit velit molestiae cumque facilis fugiat rerum libero pariatur.
	Quae porro vel molestias assumenda illo quod suscipit iure, consectetur earum
	provident nisi hic tempore dolorum sint aut cum, quasi harum laudantium
	consequatur. Repellat voluptas, in harum sint consectetur a dolores odio
	aspernatur vel amet ad, minima quas facere corporis! Expedita, corrupti quam?
	Beatae alias commodi non magnam ipsa mollitia obcaecati aperiam inventore
	necessitatibus placeat in vel quasi dolore tenetur iste itaque voluptates quod
	animi nam nesciunt, molestiae esse enim architecto. Optio aperiam sed nam vero
	autem dignissimos praesentium fugiat non eligendi! Facere distinctio magnam
	totam nobis non maiores dolores reprehenderit, placeat quis itaque.
	Voluptatibus quam recusandae officiis quia expedita repellat enim, tempore
	quaerat mollitia suscipit dolorum consectetur et nihil laudantium autem sint
	ab accusamus explicabo exercitationem nam quod magni dolor dignissimos dicta!
	Magni, quam? Eaque veritatis error quaerat dolorem, ducimus iste repudiandae
	aliquid, hic aspernatur libero quo repellendus quasi iusto dolor magni impedit
	esse, voluptate dolore tenetur odio? Maiores.
</p>
<p>
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem quam
	dignissimos facilis error nemo numquam, consectetur suscipit nulla doloremque
	dolorum tempora laudantium cupiditate perferendis, laborum minus adipisci
	nesciunt placeat maiores corrupti at quos architecto possimus voluptate?
	Soluta, molestiae recusandae. Officiis excepturi non ut nostrum, quam beatae
	ullam veniam accusantium, porro asperiores quo nulla similique officia
	inventore debitis tenetur odit unde maiores nesciunt. Corrupti laudantium
	maxime porro reprehenderit qui quisquam distinctio accusamus dolorem? Numquam,
	cupiditate! Numquam amet laboriosam quo sapiente odit nam eos fugiat ipsa
	blanditiis! Nobis suscipit labore, tempora perspiciatis ipsam dolore eaque
	debitis distinctio reiciendis, fugit minima laudantium, assumenda rem placeat?
	Quasi perspiciatis, tempore sint, suscipit amet corporis nostrum ea numquam
	temporibus aliquam officia quis aperiam repellat incidunt maiores? Nostrum
	quia hic enim, possimus sed ut temporibus cumque, repellendus veniam esse
	neque quo, rerum culpa molestiae dignissimos error labore obcaecati. Voluptate
	a temporibus accusamus, quos dolorem voluptatum minima odio architecto! Sunt
	eos quis similique. Voluptatem, nihil culpa nam explicabo voluptatum, minima
	optio vero ullam maiores eaque voluptate magni aliquid qui expedita distinctio
	ratione sequi adipisci fugit mollitia modi tempore! Vitae, ipsa explicabo!
	Esse, fugit voluptates. Atque tempore laborum quidem, soluta id debitis omnis
	quaerat ullam similique architecto, eligendi delectus ratione, fuga dolorum!
	Eos, eaque? Deleniti in quos necessitatibus enim saepe qui vitae non ullam
	ipsam exercitationem officia est alias, tempore dolorum a laudantium incidunt
	soluta sequi eos natus labore cupiditate. Dolores, esse. Quo tenetur, id amet
	nulla assumenda a voluptates, officiis laboriosam quam optio deserunt
	provident soluta minima autem aliquam odit rem deleniti. Nesciunt ratione
	quos, obcaecati sed maxime repellendus, ipsa aliquam corrupti ipsum a dolore
	earum iure fugiat beatae nulla nemo velit. Sed aspernatur, iusto repellat
	maxime ipsum doloremque, eveniet inventore ab sapiente fugit atque praesentium
	omnis obcaecati temporibus porro libero error laborum laboriosam, voluptatem
	consequatur quas. Facere est debitis natus et saepe, odio ipsa! Repellendus
	nulla, non saepe aperiam perferendis ipsa explicabo dignissimos natus quidem
	magnam impedit officia corrupti numquam id. Exercitationem culpa iusto iste,
	voluptates hic possimus dolores nobis debitis quam id, nostrum qui molestias
	cum ea suscipit velit molestiae cumque facilis fugiat rerum libero pariatur.
	Quae porro vel molestias assumenda illo quod suscipit iure, consectetur earum
	provident nisi hic tempore dolorum sint aut cum, quasi harum laudantium
	consequatur. Repellat voluptas, in harum sint consectetur a dolores odio
	aspernatur vel amet ad, minima quas facere corporis! Expedita, corrupti quam?
	Beatae alias commodi non magnam ipsa mollitia obcaecati aperiam inventore
	necessitatibus placeat in vel quasi dolore tenetur iste itaque voluptates quod
	animi nam nesciunt, molestiae esse enim architecto. Optio aperiam sed nam vero
	autem dignissimos praesentium fugiat non eligendi! Facere distinctio magnam
	totam nobis non maiores dolores reprehenderit, placeat quis itaque.
	Voluptatibus quam recusandae officiis quia expedita repellat enim, tempore
	quaerat mollitia suscipit dolorum consectetur et nihil laudantium autem sint
	ab accusamus explicabo exercitationem nam quod magni dolor dignissimos dicta!
	Magni, quam? Eaque veritatis error quaerat dolorem, ducimus iste repudiandae
	aliquid, hic aspernatur libero quo repellendus quasi iusto dolor magni impedit
	esse, voluptate dolore tenetur odio? Maiores.
</p>

<style lang="scss">
</style>
