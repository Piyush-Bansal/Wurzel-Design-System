<script lang="ts">
	import { Accordion, AccordionItem } from '$components/accordion';
	import Button from '$components/button/Button.svelte';
	import Countdown from '$components/countdown/Countdown.svelte';
	import { Tab, TabContent, TabList, TabTrigger } from '$components/tab';
	import {
		Carousel,
		CarouselContent,
		CarouselItem
	} from '$components/carousel';
	import Slide from '$components/tab/Slide.svelte';
	const data = [Slide, Slide, Slide, Slide, Slide, Slide, Slide, Slide];

	const accordionData = [
		{
			heading: 'Accordion Heading 1',
			description: 'Accordion Description 1'
		},
		{
			heading: 'Accordion Heading 2',
			description: 'Accordion Description 2'
		},
		{
			heading: 'Accordion Heading 3',
			description: 'Accordion Description 3'
		}
	];
</script>

<div class="container">
	<Countdown
		targetDate="2025-12-16T23:01:00"
		options={{ onComplete: () => console.log('YAY!') }}
	/>

	<Tab activeTab="tab1">
		{#snippet tabList()}
			<TabList label="tablist">
				<TabTrigger value="tab1">Tab 1</TabTrigger>
				<TabTrigger value="tab2">Tab 2</TabTrigger>
			</TabList>
		{/snippet}
		{#snippet tabContent()}
			<TabContent value="tab1"
				>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
				consequatur minus! Facilis perferendis magni laudantium blanditiis
				dolor, eveniet non sunt excepturi sit, voluptatum maiores illo pariatur
				error culpa quis fuga, corporis quas rem mollitia sequi ad a. Delectus
				tempora, commodi maiores quas debitis iste mollitia veniam? Officiis,
				cumque! Sequi aut ab, corporis exercitationem doloribus deleniti
				recusandae, voluptate vero porro voluptates error aliquid eum minus? In
				nihil aperiam neque corrupti fugit animi. Sint architecto est mollitia
				nemo, hic distinctio necessitatibus delectus sed! Laudantium sequi
				perspiciatis neque sunt iure? Exercitationem a unde placeat vero,
				molestias fugit quisquam id tenetur soluta adipisci et maxime nihil
				assumenda rem sunt, reiciendis corporis voluptatibus minus maiores
				laboriosam asperiores? Necessitatibus, non deleniti! Praesentium minus
				reprehenderit nemo sunt reiciendis, accusamus sapiente obcaecati
				voluptatum libero facilis consequatur soluta assumenda repellendus ipsam
				rem eum. Maiores dolorum necessitatibus minus nihil impedit, nostrum
				officiis at et nemo laborum! Beatae minus quidem repellendus magnam
				facere, asperiores sapiente itaque dolores omnis aliquam similique totam
				dolorem eveniet veniam quibusdam saepe ex dolore in officia rem dolor
				aperiam laboriosam soluta pariatur? Magni eveniet officiis a laborum
				provident eligendi facere illum. Assumenda iste possimus necessitatibus
				libero? Repellendus quibusdam sint, quaerat in ad facere fugit
				voluptatem explicabo quam, ipsam, minus ducimus tempora unde doloribus
				accusantium sit vitae maxime est ut. Molestias minima culpa autem sint
				aspernatur, officiis laboriosam voluptate non nostrum magni corrupti, ex
				explicabo facere illo eaque omnis magnam incidunt temporibus. Quod vero
				sint odio, quasi molestiae laudantium ab eligendi quas id sit
				perspiciatis est neque rem consequuntur iste ipsam maxime placeat
				officia. Odit dolore, laboriosam dolores quaerat repellat dolorem qui
				aliquid tempore maiores, accusamus ab error optio a recusandae! Quia
				quo, odio sit ad omnis in consequatur maxime porro? Optio culpa quaerat
				velit a, facere repellendus animi incidunt tempora illo, ut nam? Nulla
				ad officiis dolor quaerat sunt? Accusamus et nulla alias officia ab
				porro sequi maxime inventore reiciendis, nobis voluptatem natus error
				fugiat quam aperiam velit maiores non perferendis quis voluptas delectus
				animi odio tempore a. Quasi exercitationem deleniti totam, unde
				consequatur quae velit natus sapiente animi labore possimus illum
				numquam repellendus corrupti officiis voluptatibus minima commodi
				voluptas modi autem voluptatem porro tempora magni? Minus porro
				voluptates, reiciendis consequatur id sunt quibusdam rem magni, sit ab
				iste, laudantium corrupti itaque! A odit, pariatur quis ea corrupti modi
				magnam libero dignissimos quaerat non commodi rem rerum fugit ad nulla
				quibusdam blanditiis possimus consequatur totam, praesentium laudantium!
				Eius necessitatibus vel rerum delectus. Impedit distinctio iste soluta
				eligendi excepturi dolorem nam, et officiis doloribus illo eius odio
				possimus accusamus similique natus magni ipsum debitis! Libero quisquam
				obcaecati aperiam nihil rem? Ab quis ullam porro obcaecati. Architecto
				quos, harum quaerat commodi ullam odio nemo consequuntur ipsam
				cupiditate. Nam quia eum eius, repudiandae labore tempora dicta
				aspernatur natus consequuntur, perferendis molestiae maiores soluta. Ex
				maiores veniam dolor incidunt quae hic, modi aliquam eaque sapiente
				expedita non nihil dolores quisquam nisi? Unde culpa rem neque,
				voluptates illum quod cum repellendus nemo repellat suscipit, odit saepe
				impedit maiores numquam incidunt iure alias ab accusamus est pariatur?
				Fugiat laudantium recusandae perferendis temporibus iste nisi sit ut
				error magnam odio dolore atque qui eveniet animi voluptates esse veniam
				ab aperiam quasi, quos repellendus delectus maxime est? Magni eveniet
				tenetur cupiditate hic quibusdam enim facilis a odio molestiae
				consequatur, ad iste maxime beatae reprehenderit est sapiente error cum
				veniam. Natus esse voluptatibus error, sint repellat hic tenetur eveniet
				quidem praesentium numquam doloremque officia ducimus quasi similique
				laudantium odio facilis cumque temporibus expedita vero porro velit, qui
				quam! Possimus dolores expedita omnis dolor repellendus et magni
				excepturi culpa odio nihil asperiores velit adipisci doloremque nam,
				eveniet magnam eaque id eius sapiente quidem tenetur exercitationem
				totam voluptatibus. Excepturi optio eos officiis, atque voluptatem
				fugiat perspiciatis esse ratione iste consectetur ipsa earum enim
				provident dolorum amet vero architecto minima sint! Ratione animi
				distinctio maxime ipsa numquam, quidem ut vero iusto dicta dignissimos
				autem reprehenderit, sed esse facere? Unde error aspernatur praesentium
				est quia suscipit provident voluptatem in eaque eum, ad reprehenderit
				molestiae alias? Veniam magni molestias deserunt, asperiores totam
				quibusdam repellendus enim optio eveniet. Accusamus, odio ea quibusdam
				obcaecati porro perspiciatis mollitia veritatis quia! Et a quam sint
				unde, ipsum autem reiciendis laborum tenetur deleniti consequuntur
				eveniet rem reprehenderit culpa odio explicabo quia soluta. Dignissimos
				voluptate aut doloremque numquam quod, atque rem tenetur? Praesentium
				aperiam fugiat doloribus assumenda odit eligendi provident repellendus
				possimus? Maiores, quo reiciendis. Corporis laborum nemo fuga tempore
				explicabo. Provident a quidem, sint, qui, labore asperiores
				necessitatibus perspiciatis veritatis laborum fugit ex numquam!
				Similique quos officia fuga alias exercitationem numquam recusandae,
				expedita debitis, est dolor odio inventore cupiditate quasi excepturi
				eveniet ipsam modi eligendi. Quasi similique, repellat ratione
				voluptatum porro laborum dolorum ea adipisci aperiam, qui cum expedita
				odio incidunt sequi, assumenda dolor deleniti tempore in quae! Magnam
				earum harum amet repudiandae. Neque saepe sunt voluptatibus quaerat eius
				quisquam deleniti nostrum animi harum temporibus! Doloribus saepe eius
				illo! Error earum quas voluptate sint debitis nesciunt id ipsam culpa
				nobis recusandae quo nulla architecto asperiores hic quod in, quasi
				voluptatum aut consequatur cupiditate ipsa! Deserunt quis alias nisi
				consequuntur animi voluptatem eius dolorem iste facere, blanditiis
				possimus, ab perspiciatis exercitationem magnam nulla natus facilis
				illo! Exercitationem, beatae cupiditate? Enim totam nemo non? Ducimus ex
				atque hic reiciendis libero excepturi molestias eaque asperiores
				similique sapiente ratione ullam, nihil eveniet in saepe voluptas animi
				optio numquam expedita, explicabo laborum! Facere et minima maiores
				facilis. Dolores eaque quod qui earum eligendi corrupti itaque ullam
				accusantium modi provident voluptas libero quisquam velit quos harum
				esse facere error nemo aliquam, omnis accusamus possimus quae neque.
				Quam amet esse similique deserunt corporis saepe suscipit dolore
				doloremque magni tempore! Corporis tempora vitae expedita nam labore
				soluta, culpa a necessitatibus explicabo aliquid ex officia non unde
				magnam quam mollitia iusto hic sequi cum omnis voluptatem obcaecati sit.
				Quia cupiditate praesentium, repellendus molestias et illum perferendis
				aliquam nesciunt aspernatur fugiat ut distinctio veniam repellat in odit
				quisquam cumque, eos quidem odio. Molestiae aliquam qui odit illo
				voluptas eligendi voluptatum, reprehenderit tempora. Aperiam porro enim
				modi autem accusamus, similique laboriosam, dolorum aspernatur odio
				sequi, unde nihil officia architecto corporis alias facilis repellendus
				aliquam facere sed quaerat voluptate dolores veniam. Libero, aliquid
				consequatur! Enim hic, dolorum incidunt assumenda saepe voluptatem
				tenetur quaerat aliquam! Reiciendis voluptatem accusantium sunt et
				dolorem ducimus explicabo corporis mollitia illo quae non aliquid
				cupiditate aperiam voluptate, ipsum voluptatum cumque ex? Quasi
				voluptatem commodi magnam quis? Quas sint numquam fugiat voluptatem? Sed
				nisi ratione nemo rem, illum, quas, rerum quia voluptas provident
				deleniti impedit fugiat ipsa! Sapiente deserunt perferendis adipisci
				alias consequatur pariatur, beatae suscipit? Quos odio ea impedit
				commodi est, voluptatem quaerat ipsam inventore hic. Ab ullam, ea
				doloremque id asperiores vero, eum magnam repudiandae illum earum
				laboriosam minima! Sequi odio reprehenderit voluptas consectetur ab
				minus sint delectus cumque harum, ipsa vel voluptatem accusamus nesciunt
				deserunt totam qui error. Facere ratione error delectus, tempore facilis
				cum nesciunt maxime cumque itaque nulla! Fuga blanditiis, eum ad
				doloribus ex veritatis temporibus repellat eius, nemo fugit obcaecati
				sint tempora corporis qui reiciendis, in quasi facilis repellendus esse.
				Ipsa, vero ullam qui expedita libero quia sequi recusandae, quam dolorum
				unde soluta excepturi neque ab nisi ut quibusdam illo! Ut, odio?
				Incidunt dolore atque recusandae porro quo inventore cumque? Recusandae,
				alias architecto delectus iste doloribus obcaecati repellendus dicta a
				numquam fugiat necessitatibus reprehenderit exercitationem aut rem ipsum
				cupiditate? Debitis fugiat repudiandae quibusdam sint praesentium!
				Voluptatum voluptatibus libero tenetur, eligendi veniam accusamus a
				repudiandae, quas vero doloribus quaerat hic corporis repellendus
				mollitia laboriosam facilis sed neque sit, porro nisi eveniet. Nemo
				explicabo quas soluta error ad mollitia, repudiandae excepturi odit
				labore a blanditiis suscipit quibusdam quasi sint laborum, distinctio
				nobis numquam quis atque laudantium omnis rem quae dolorum. Minus
				dolores rem dolorum excepturi, culpa impedit, ut corrupti a magni qui
				fuga quo debitis, repellendus aliquam sunt! Quisquam minima sit
				voluptatum ipsam nisi similique quo voluptates minus voluptatem impedit!
				Voluptatum doloribus soluta optio? Voluptate exercitationem, earum
				laboriosam laudantium quas nisi eveniet iusto, obcaecati ipsa natus in
				doloremque ea nemo minus impedit consequatur sed nobis, facere quod nam
				recusandae quaerat molestiae soluta! Quidem hic quia vitae culpa odit,
				id saepe quam, iusto modi excepturi cum veniam corporis tempore in eos
				incidunt provident enim voluptatem magnam. Accusamus architecto tenetur
				explicabo cum maxime illo sit incidunt suscipit necessitatibus,
				temporibus nemo officia delectus quam eveniet unde rerum sunt sed porro
				dolorum? Totam praesentium in numquam ex tenetur, quis, ad natus velit
				dolorem eligendi omnis odit quam, molestiae cumque commodi eveniet
				cupiditate repudiandae illum? Delectus consectetur veritatis atque modi
				enim molestias. Quas ratione quo natus omnis possimus nulla! Iste
				recusandae sed ad incidunt quidem reprehenderit praesentium doloribus
				nobis repellat corrupti, fugit sint corporis facere nostrum optio,
				excepturi vitae exercitationem laudantium modi unde! Culpa ab ad
				debitis, quis exercitationem expedita commodi assumenda mollitia hic
				accusamus sunt cumque obcaecati dicta eveniet! Debitis quae voluptates
				non? Repudiandae illum autem dolore, laudantium eos, illo magnam ex
				nesciunt ratione amet nam libero, facilis delectus in quia minima.
				Inventore cupiditate hic deleniti officia id quibusdam alias quaerat
				iure sapiente, laudantium modi, eius sed quo ratione impedit facere
				eaque provident ullam corporis. Soluta, natus qui illum odit sit debitis
				magni consequatur excepturi eaque alias ipsum. Pariatur nobis deleniti,
				blanditiis molestiae dolorum accusantium perspiciatis cupiditate odit
				reiciendis ipsa ipsam quas provident mollitia? Ea enim delectus quae
				eius, perferendis nostrum officiis numquam voluptates soluta quia nihil
				totam dignissimos? Ullam vitae amet illum itaque pariatur, commodi quas
				veniam quis labore aperiam omnis dolorem assumenda, quisquam,
				repellendus id maxime expedita debitis. Dolore ratione eius est sint
				nihil doloribus accusamus soluta at. Adipisci fugit quaerat sapiente
				sequi, voluptate reprehenderit ut. Culpa vero ipsa inventore. Dolores
				impedit, voluptatum cum vel nemo eaque quibusdam nulla odit quo aperiam
				repudiandae, corporis debitis nisi tempore ab amet excepturi officiis
				expedita magni doloremque harum dolorem ad ipsum! Dignissimos, cumque
				beatae! Dolores, facere? Aliquam maxime quae esse dolorem praesentium,
				nulla corrupti natus amet animi rem tempora. Ad, at cum ipsam delectus
				consequuntur tempora, officia et modi minima, dolore voluptatibus
				recusandae! Dolor, numquam. Nobis sunt, dolore eaque quod illum
				accusantium voluptatem dolorum quisquam praesentium aliquid amet facilis
				ratione, vitae iure soluta repellendus voluptas, fuga dolorem itaque sit
				qui. Amet, inventore? Deleniti in asperiores deserunt hic, delectus
				laudantium molestiae doloremque. Illum reprehenderit nostrum quibusdam
				doloribus itaque nemo eum dolor ducimus, quaerat dicta hic. Aliquam ut
				quasi suscipit similique praesentium velit ex unde facilis rem
				molestiae, ducimus dolorum ratione fugit, error vero illo tempora modi,
				amet officiis earum aliquid vitae quaerat. Corrupti, eveniet et. Nam
				delectus cumque adipisci totam odit modi? Illum possimus voluptas
				explicabo tempora itaque quia, eum nesciunt culpa facilis nulla atque
				similique, quo eligendi assumenda, nostrum vel maxime veniam ratione
				dignissimos! In, recusandae ullam! Sequi, porro hic reiciendis, aperiam
				sit debitis vel numquam, eos aliquam illum fugit explicabo ea
				reprehenderit consectetur consequuntur! Nulla exercitationem rerum nihil
				dolorem, vero velit dolor doloremque totam ex. Perspiciatis eveniet,
				voluptatem ad numquam molestiae, voluptas alias quod voluptate quidem
				odit iusto laudantium adipisci ab porro nesciunt totam laboriosam,
				voluptatum consectetur labore sed ipsa in? Hic repudiandae recusandae ex
				provident nulla autem deleniti minus qui assumenda numquam! Deserunt
				sint quod, optio natus perferendis quia rerum at alias ex deleniti
				provident magni, porro, architecto mollitia enim asperiores minus ipsa!
				Soluta at nulla sapiente tenetur nam, nihil aspernatur ipsa sunt aut
				quis provident est temporibus doloribus voluptates modi! Rem quisquam
				doloribus aut voluptatum vero impedit cum, iusto culpa obcaecati
				voluptates nulla unde, magnam saepe facilis tempore repellendus,
				incidunt eveniet et voluptas. Doloremque sed dolorem, ipsa excepturi,
				incidunt cum cupiditate odit dolor quaerat aspernatur asperiores
				praesentium officia, ab veritatis ipsam earum? Beatae minima natus
				nostrum eum, magnam, fuga ipsam sunt ex harum quos laborum quasi,
				dolorem corrupti perspiciatis esse debitis dolorum quisquam dignissimos
				sit aliquam. Quos amet distinctio perferendis autem pariatur iure saepe
				vero nostrum! Ipsum temporibus, deserunt, obcaecati dolore cumque
				voluptatibus dolor eos minus eum, excepturi consequatur. Asperiores
				ipsam cupiditate fugiat ex nihil! Perferendis iure, quibusdam deserunt
				dolorem quam quae praesentium rerum commodi minus. Illum laboriosam
				vitae nam dolorum neque? Impedit sint non nobis quis quae, adipisci,
				distinctio ex exercitationem debitis delectus libero quod magni quidem
				laboriosam, blanditiis dolorem voluptate veniam veritatis amet! Ipsa
				itaque, illum commodi doloremque omnis non repellat tempore soluta dolor
				quam. Placeat voluptatum mollitia dignissimos soluta non dolorem ullam
				quos. Et recusandae quam itaque facilis voluptate temporibus, nulla
				reiciendis fugiat qui provident sed placeat nobis exercitationem quas
				tempore tenetur rem explicabo molestiae natus libero magni. Animi
				aliquam vel veritatis, at esse dolores officiis adipisci est dolor
				officia totam, sit, sunt necessitatibus aperiam repellendus! Neque vero
				facere eligendi consequuntur enim rem beatae praesentium nam hic dolorum
				odit quia, consectetur deserunt maxime ipsam eius, voluptates et! Nemo
				tempora corrupti, ut impedit error aperiam eius provident labore ullam
				incidunt eligendi voluptatum sed modi molestias veniam, ducimus
				cupiditate voluptates magni. Aspernatur corporis quasi praesentium
				aliquid autem harum, est consectetur temporibus tempore error at
				expedita eum itaque fuga architecto corrupti a quod! Ex ducimus
				explicabo deserunt maxime nostrum, repellat quam omnis expedita nulla
				laudantium. Possimus dignissimos, nam velit excepturi debitis cumque
				modi, expedita, quidem repellat blanditiis consectetur commodi. Nostrum
				architecto amet doloremque suscipit officiis facere dignissimos? Ab rem
				modi omnis, molestias maiores error laudantium exercitationem.
				Consequuntur, perspiciatis. Provident odio sunt dolores et corrupti eum
				asperiores necessitatibus corporis ipsa repudiandae praesentium,
				assumenda dolorum voluptates perspiciatis iure vel, laudantium ex iste?
				Fugiat nemo nisi odio error alias saepe, tempore fugit nihil facilis
				ipsam animi eum velit totam eos, iusto accusantium incidunt recusandae,
				autem deleniti minima. Aperiam iure libero reiciendis? Suscipit
				excepturi cumque officiis, aliquam est qui at magni quidem odit fuga
				magnam, saepe quos esse incidunt sunt odio dolorum reprehenderit, minus
				voluptatibus eligendi nam amet quisquam illo labore. Quidem quia eos
				nobis soluta, commodi necessitatibus rem fuga aut, optio, corporis
				cupiditate officia assumenda eligendi voluptates laboriosam voluptatem
				ad quas aperiam quae fugiat eveniet dolor aliquam. Voluptas magnam,
				perferendis asperiores deserunt nulla esse laborum blanditiis error
				molestias aliquam accusamus illum. Dolor nihil fuga, nisi eum voluptate
				aspernatur corrupti sequi blanditiis facere commodi atque, hic
				temporibus obcaecati ullam. Perferendis voluptas iste porro possimus ab
				fugiat error nisi mollitia obcaecati illo quis delectus consequatur,
				maxime dolorum ea similique quas eligendi id totam aliquam! Suscipit
				odio iusto mollitia in nemo accusantium facilis commodi, rem tenetur
				porro sint, similique quaerat at, quia repudiandae libero delectus
				quibusdam aut perspiciatis. Quisquam error, vitae quas alias
				necessitatibus debitis saepe voluptates quidem expedita labore a
				excepturi? Quod ullam, cupiditate quasi cum quibusdam sequi animi
				tempore quis odio saepe tenetur eveniet repellat voluptatibus sunt
				dolorum, corrupti, molestiae hic harum? Iste minus veniam quae facilis
				error non! Assumenda nobis eligendi dicta nihil esse exercitationem
				praesentium error ducimus nulla soluta dolores est ipsa rem autem
				consequuntur obcaecati ut, accusantium at a doloribus dolore labore
				perspiciatis rerum! Earum, ratione iusto perferendis nemo inventore
				delectus atque dolore aut eligendi reiciendis incidunt quos! Rem nulla
				itaque dolor illum libero voluptas. Nulla unde aut dignissimos libero,
				suscipit voluptate sequi modi voluptates saepe, omnis in? Sit est
				exercitationem consectetur ex quisquam sequi eum iusto doloremque.
				Eveniet sequi architecto libero autem blanditiis! Eveniet rerum vero cum
				et! Unde dolorem alias itaque hic recusandae, ullam accusantium vitae
				totam quae rerum tenetur doloremque cum non nemo et error aperiam est
				neque eveniet facere officia? Molestias nostrum incidunt distinctio fuga
				quo vitae qui itaque nisi aliquid, consectetur optio, porro repellendus
				consequuntur velit voluptatum tempore odit maiores cum esse? Dolores
				ipsa cupiditate non quidem. Vitae rerum corporis quia nemo amet eveniet,
				earum ratione cumque eligendi id sapiente magnam suscipit ipsa nesciunt
				vel hic et molestiae asperiores, animi doloribus nostrum blanditiis
				similique aliquid. Culpa sint dolore minima officia odio, maxime
				quibusdam cupiditate deleniti? Amet, eius? At a qui quae beatae
				accusamus vitae voluptatibus unde atque, sunt magnam fugit, pariatur
				mollitia aliquid perspiciatis expedita rem quam harum illo aspernatur
				illum suscipit ipsam facere assumenda maiores! Inventore explicabo quis
				tempora ipsum reprehenderit facilis dolor autem quasi distinctio
				sapiente eveniet nesciunt, perspiciatis, ad repellat! Similique quasi
				ipsa repellendus. Facere tenetur debitis cupiditate unde laudantium
				voluptates accusantium sapiente quasi dolore? Officia, cupiditate non,
				dignissimos doloremque provident aspernatur possimus harum quis, ab
				earum nam odio distinctio maiores suscipit nobis! Consectetur minima
				neque sunt labore, atque aspernatur rerum hic iste officia expedita
				saepe, quos, culpa natus provident pariatur optio itaque assumenda!
				Quas, voluptates fugiat cupiditate ut impedit ipsam, dicta pariatur
				expedita a voluptatum facere tenetur voluptatibus accusamus voluptatem
				nostrum eveniet doloremque est, fuga excepturi cum illo cumque dolorem
				iste quis? Sapiente, repudiandae veritatis ad at doloremque beatae ut
				commodi saepe dicta reiciendis odit inventore ex eum totam nihil
				quibusdam exercitationem, dolores tempore accusamus fugiat modi pariatur
				consequatur dolor. Quae laborum natus tenetur inventore temporibus vitae
				sunt adipisci dolore, architecto laboriosam minus asperiores? Vel
				tempore libero vitae minus ad eveniet quasi facilis. Voluptatem labore
				inventore similique facilis. Beatae debitis veniam modi explicabo
				provident mollitia maiores nemo maxime. Delectus, dicta! Dolorum amet
				assumenda itaque maxime explicabo nisi sequi dicta ad voluptates.
				Aliquam, magnam ullam? Magnam doloremque tenetur fugit commodi quo modi
				odio aspernatur nihil ex voluptatem porro itaque culpa nam expedita
				cupiditate sed temporibus cum blanditiis, ab sapiente inventore a
				excepturi praesentium sit. Vel rerum dolorem, perspiciatis illum
				deserunt dignissimos eligendi rem natus quas, quae quidem magni quaerat
				necessitatibus asperiores labore aliquam non vero, et cum. Nesciunt
				distinctio et esse perferendis odio deserunt. Alias dolorum, ipsum
				commodi rerum excepturi ratione cum mollitia. Ea animi nisi, cumque
				ullam cupiditate fugiat? Laudantium adipisci perspiciatis assumenda qui
				consequatur, sunt eos eius atque earum dolorum deserunt necessitatibus
				nobis aspernatur itaque nostrum ea quia enim quis, laboriosam expedita
				saepe voluptate minus ipsam recusandae. Harum saepe perferendis minus
				labore neque rem repellendus odit quas necessitatibus iusto dicta,
				dolores, doloribus modi suscipit amet aspernatur facere reprehenderit,
				facilis itaque adipisci repudiandae soluta? Aliquam recusandae numquam
				nostrum fuga ipsam. Nulla quisquam quibusdam dolore ducimus voluptas
				adipisci deserunt distinctio earum tenetur repellat. Quaerat expedita
				velit veniam! Qui tempore amet modi assumenda repellat. Quas, iste
				impedit architecto fugiat obcaecati reprehenderit dolores tempora nisi
				odio id ipsum necessitatibus neque autem cum placeat fuga laudantium aut
				ab aliquid sequi sint voluptas! Modi laborum voluptates laboriosam nobis
				quidem veniam nisi quisquam, magnam ab. Tempora, cum. Laudantium, harum.
				Beatae blanditiis fuga sequi odit laboriosam ducimus ipsam, dolorem
				quisquam cumque sit nihil modi in, iusto quidem saepe. Modi quis odio
				delectus ducimus quia cupiditate, repellendus nostrum exercitationem
				voluptates fugit amet libero ipsa provident. Quibusdam natus reiciendis
				ea labore optio nisi qui distinctio illo voluptatem temporibus.
				Perspiciatis cumque quod qui reprehenderit in, eligendi doloribus et
				exercitationem facilis quas nihil modi recusandae magni. Obcaecati aut
				non aperiam quo adipisci omnis veniam corporis, quaerat tempora,
				temporibus odio. Iure architecto eveniet temporibus dolorum nulla quidem
				veritatis magnam ad alias explicabo ab ipsum, ea quas officia expedita
				autem praesentium dolores? Velit fuga voluptatibus error illum enim in
				ea asperiores eius culpa, numquam ex ratione labore, cupiditate nemo
				ipsa tempore ducimus placeat ipsum eveniet corrupti repudiandae? Ratione
				dolore quidem laboriosam, ex exercitationem explicabo quae nulla fugiat
				repudiandae voluptas quaerat saepe autem, quas veritatis? Doloribus quae
				aut voluptatum facilis, libero recusandae sed sunt labore at magni
				quaerat? Consequuntur qui unde natus dignissimos ratione totam esse
				cupiditate harum explicabo ipsa nobis hic sit iusto consequatur, a
				voluptate adipisci ex eaque excepturi perferendis assumenda temporibus!
				Enim, ut tenetur laboriosam quia delectus sint doloremque incidunt
				blanditiis deserunt, voluptas perspiciatis optio dolor architecto!
				Numquam, quae! Assumenda atque non repellat natus sequi quam beatae eum
				ipsam voluptatem explicabo asperiores reiciendis qui, ratione porro?
				Sequi facere vitae, molestias fugiat quasi blanditiis ducimus corrupti
				ad quas excepturi distinctio sed, sint obcaecati possimus modi
				consequatur itaque dignissimos iste animi! Quos, possimus sed.
				Blanditiis consectetur enim architecto quae accusamus quasi
				reprehenderit, unde suscipit. Sapiente odio obcaecati quod illo
				repellendus sequi molestias impedit accusamus quam ad blanditiis atque
				doloribus fugit culpa debitis asperiores, voluptatem nam. Ex nam commodi
				beatae voluptas minus odit facere laudantium voluptatum. Nesciunt illum
				eum minima reiciendis deleniti reprehenderit similique animi dolor
				laboriosam fugiat sapiente quasi obcaecati hic commodi, veritatis vitae!
				Reprehenderit ex minima blanditiis soluta animi sed cupiditate nostrum
				nesciunt! Mollitia tempora expedita nobis magnam nihil delectus illum
				hic laborum natus voluptas cum, iste incidunt! Corporis neque odit,
				recusandae eligendi ipsa cum ullam incidunt unde blanditiis eum omnis.
				Quasi, at nobis! Tempora iusto debitis aliquid quaerat, corporis
				repellat neque dolor pariatur vel natus eveniet. Odio aspernatur quam
				deserunt dolores ea laborum quidem officiis doloribus reiciendis
				assumenda eaque temporibus id earum fugit, porro minima pariatur
				accusantium reprehenderit? Magni nobis esse, perferendis ipsa ipsum quo
				dolores facere delectus? Accusantium, quae vel animi rerum, expedita
				natus consectetur possimus iure cum nisi, sequi itaque ipsam. Nam
				provident sit incidunt facilis nulla velit molestiae, impedit ducimus
				totam harum. Nisi inventore autem doloribus ad necessitatibus
				consequatur est saepe id iusto omnis, consectetur veniam aspernatur
				accusantium, pariatur repellat nemo, dolor odit rem adipisci eum beatae
				architecto repellendus qui! Eos fugiat debitis quasi nihil quas facere
				labore reprehenderit ex! Voluptatum nisi repellat iure quaerat corporis
				quis dolorum consequuntur iusto consectetur? Non molestias adipisci
				exercitationem doloribus libero repellendus, suscipit quisquam tempore
				animi iure aspernatur magni, inventore quis porro culpa architecto ipsa.
				Beatae sint quos quae aliquam reprehenderit similique perferendis facere
				ab fuga officia ut alias est ducimus impedit natus dolor deserunt magnam
				omnis, aspernatur eveniet labore ad quis quas nisi! Corrupti vitae
				dolores odit magnam sunt voluptate esse quidem perferendis ab aliquid
				provident beatae dolorem praesentium veritatis, ullam, similique tempore
				dolorum ipsum sed quis laboriosam error nostrum repellendus. Dicta
				obcaecati impedit deserunt eius, voluptates doloribus, dignissimos
				tenetur ratione ut dolor consequatur quia! Consectetur quia deserunt
				nulla magnam fuga a, porro nam quo maxime ut saepe in, nihil quasi
				tempore culpa autem facere commodi. Eveniet ex obcaecati repellat
				architecto vero! Quod libero sapiente non tempore a corporis qui fugit
				voluptas distinctio ipsam? Distinctio, laborum perferendis voluptatem,
				repellendus odit, tempora sint nihil nisi dolorem quisquam labore
				tempore deserunt autem asperiores eveniet repudiandae inventore iusto
				accusantium. Numquam totam ut id itaque excepturi fugiat a quod. Magni
				necessitatibus pariatur quaerat facilis dolores aspernatur ipsa voluptas
				incidunt soluta iusto cum cumque fugit fugiat nihil amet at ipsum neque,
				qui modi quis mollitia tempora cupiditate officiis libero. Iure quia
				fugit aliquid magnam. Nobis earum quae saepe perspiciatis fugiat. Alias
				dolor iste, culpa dolores eius quidem quibusdam recusandae facilis
				assumenda quos esse. Est repudiandae repellat dolor eaque ratione
				aperiam sunt id, corporis voluptatum necessitatibus suscipit a nobis aut
				ipsa recusandae hic sapiente autem officia! Veniam alias recusandae vel
				ratione rem obcaecati numquam, facere vitae aspernatur maiores
				accusantium, dicta qui similique ipsa, autem voluptate eius suscipit
				nobis nulla? Aliquid eveniet alias quod assumenda omnis saepe impedit
				obcaecati maiores vero beatae molestias consectetur soluta consequatur,
				iusto officiis et? Commodi vitae vel dolore placeat, quis blanditiis
				similique nihil consequuntur omnis facilis laboriosam velit suscipit
				accusantium exercitationem eius deserunt? Voluptatibus nesciunt earum
				fuga quos. Excepturi tenetur obcaecati illum beatae assumenda,
				perferendis quam ipsum iure ea error maiores corrupti, suscipit aliquid
				pariatur incidunt dolore, quae id? Officia voluptas eligendi culpa
				dolorum vel, dolores tempore cum nisi cumque ab ea esse consequuntur
				laudantium id voluptatum architecto, iusto qui laboriosam praesentium
				at. Ipsum id atque reprehenderit illo magnam. Omnis voluptatum eos nihil
				obcaecati ut nam quaerat doloremque consequatur, corporis architecto
				veniam. Est laboriosam rem iure quibusdam distinctio, in praesentium
				iste dignissimos molestiae, laudantium dicta inventore. Odit corrupti
				illo nostrum voluptatem ad blanditiis cumque dolor est, cum voluptatibus
				molestiae laborum nihil atque magnam nulla necessitatibus,
				exercitationem laudantium, praesentium minima! Necessitatibus
				voluptatibus id et illo animi, consectetur deserunt reiciendis commodi
				labore doloribus atque dolor ratione ex at quasi aliquid laudantium
				dignissimos nulla minus? Voluptas officia unde nihil omnis maxime
				tempora quia necessitatibus rem ad! Nostrum esse repudiandae, corrupti
				maxime modi neque assumenda iure impedit pariatur accusantium voluptatem
				dicta eius, tempore unde et accusamus. Accusantium omnis possimus porro
				dolores? Minima adipisci voluptates quidem, accusamus optio blanditiis,
				voluptas tempore molestiae similique rerum quos voluptate delectus
				aperiam, sunt quis debitis fugit nostrum quia possimus tenetur maxime
				est. Earum debitis eos optio, recusandae quis facere ratione magni nisi
				ipsam delectus, at nam vel maxime! Ab eius at nisi praesentium! Quia
				ullam nostrum harum? Delectus nesciunt a molestiae esse totam architecto
				tenetur in quibusdam dolores cum corrupti reiciendis qui inventore
				cupiditate laboriosam accusantium voluptates alias, voluptatem illo
				similique placeat? Dolore sit odit magnam earum amet cum, similique
				laborum aliquam tenetur consectetur dignissimos quibusdam debitis
				repellat. Incidunt ipsum reiciendis at aut eaque laborum iure dolores
				suscipit veritatis culpa quaerat dolorum qui ipsa sapiente id accusamus
				distinctio minus praesentium cum, dolorem mollitia est. Mollitia at,
				voluptates, ex cupiditate odio debitis, officiis neque ducimus
				perferendis eos nemo beatae quam eum distinctio nobis esse. Id ipsum,
				aspernatur incidunt optio adipisci iure omnis fugit tenetur, veritatis
				eveniet veniam minus? Consectetur expedita tempora culpa perferendis
				unde eaque aliquid temporibus enim nesciunt quis commodi, obcaecati
				quia. Quos quo exercitationem eligendi suscipit nam et molestiae ipsum
				optio fuga repudiandae ipsam laborum dolor similique quisquam qui
				officiis quibusdam ad, consequuntur provident nisi? Laudantium, omnis?
				Suscipit corporis consequatur eum quos perferendis nobis voluptatibus,
				ducimus ipsa rem officiis optio neque officia sapiente esse pariatur
				eligendi ratione ad quo. Minus repudiandae ducimus ipsa rerum soluta
				commodi odio cupiditate, excepturi numquam, consectetur illum iure
				reiciendis fugiat, culpa facere. Expedita voluptates veritatis ullam
				quidem officia obcaecati perspiciatis nostrum, in modi commodi deserunt
				culpa voluptas. Aliquam neque eveniet quo quaerat laboriosam, illum
				dignissimos vel, minus doloremque velit voluptatem inventore recusandae
				impedit esse iure praesentium sit voluptatibus dolores sapiente
				quibusdam facilis cumque. Quo qui eaque deserunt ea velit provident in
				aliquam nihil odit voluptates, molestiae, earum officia illo ipsum
				veritatis nemo accusamus asperiores quibusdam dolorem quisquam?
				Obcaecati, mollitia. Nostrum, nesciunt! Dolor voluptatum quia recusandae
				ad accusamus natus dolorum, perferendis sequi, ex a ratione aut odio
				praesentium enim nam accusantium, adipisci sint nulla consequuntur
				nobis. Ab non quos expedita ipsam? Autem possimus repudiandae iste
				tempore numquam porro aliquid nostrum, nemo perspiciatis amet, veritatis
				quaerat maxime doloremque dicta sunt tempora voluptate odio, nesciunt
				aspernatur molestiae facere. Recusandae maxime ducimus sed harum minima
				aspernatur voluptatem temporibus, beatae omnis quasi incidunt impedit
				unde esse aliquam, veritatis debitis nobis ipsum, reiciendis consectetur
				cupiditate facilis maiores. Possimus et delectus consequatur at,
				pariatur quasi. Veniam magnam velit, similique dolorem, nam impedit
				numquam repellat ullam ut dignissimos odit hic fuga fugit consectetur
				qui ipsum ab provident voluptatibus reprehenderit aperiam quod aliquam
				necessitatibus tempore. Nesciunt cupiditate, repellendus unde, atque
				voluptatibus adipisci aperiam aliquid totam iure pariatur optio,
				perspiciatis aut. Recusandae et amet quisquam rerum tenetur illum
				assumenda repellat dolorum, aliquid quibusdam est voluptas voluptates
				pariatur dolorem natus adipisci ratione perferendis soluta sint quod
				nulla voluptatibus vitae? Numquam assumenda hic a error autem ab, ad
				mollitia modi accusantium quod impedit repellendus id aut soluta animi
				perspiciatis quae omnis deleniti? Iste modi quasi, ullam esse obcaecati
				debitis voluptas deleniti sunt rem doloribus, autem corrupti illum.
				Voluptatem, architecto ipsum omnis voluptatibus iure repudiandae quis
				quod obcaecati quam numquam vitae voluptatum sunt ducimus atque dolore
				totam nemo ratione nihil amet ab. Debitis rerum architecto cupiditate.
				Minima sint molestiae esse vero quasi nostrum rerum velit at a inventore
				dignissimos, nesciunt veniam ratione laudantium saepe tempora
				consequuntur magnam non fugiat dolore molestias odit. Ipsum asperiores
				aperiam quo quos fuga consequuntur soluta sit neque voluptates fugiat
				veritatis incidunt a perspiciatis voluptate unde voluptatem repellendus
				amet laudantium vero officiis, nihil sed cumque sequi deserunt? Amet
				nulla labore itaque natus sunt, quisquam illum nihil quibusdam quia
				magni dolore provident, nobis a incidunt cupiditate sint aperiam veniam
				illo! Tempora aliquid sequi labore velit reiciendis error qui, ad
				voluptatibus minus adipisci accusantium consequatur! Ex, obcaecati
				molestiae? Porro modi laudantium quam excepturi quidem totam nemo,
				ratione asperiores pariatur architecto veniam praesentium expedita
				possimus iusto quas labore ullam aut doloremque odio maxime quo ea.
				Perferendis rerum iure quas, in ipsum dolorem labore error numquam
				temporibus. Molestiae tempore excepturi ut voluptate rerum dignissimos
				unde quo ipsam corrupti totam itaque, odit culpa, laudantium dicta illum
				modi, impedit atque ipsa? Esse inventore quos quisquam commodi sed
				officiis labore placeat? Odio, ut corporis est magnam animi ipsam,
				delectus blanditiis sapiente ipsum veritatis id dolor exercitationem
				cupiditate consequuntur rerum assumenda quis. Quo eveniet velit neque
				sit similique tempore, modi, consectetur sint quidem blanditiis fugit
				possimus atque nobis nam optio animi exercitationem aut. Ipsum labore
				vero corporis ipsam deleniti omnis, cupiditate, vitae corrupti modi
				molestiae pariatur mollitia expedita nemo. Possimus sunt atque totam,
				quidem vero quod ratione vitae a nisi debitis distinctio commodi
				excepturi omnis aperiam iste temporibus enim fugit deleniti suscipit
				animi dolorum alias dolor eveniet. Qui iste ea, amet autem cupiditate
				eaque ullam? Asperiores iusto atque repudiandae quam sit quae eos id
				modi? Maiores fugiat id labore hic possimus dolore vel, odio quibusdam
				nulla dolorem, laborum dicta distinctio! Nemo accusantium tempora est
				aut eveniet aspernatur voluptates nobis enim. Eum corporis, vero
				eligendi non placeat ducimus iste perspiciatis et amet ratione molestiae
				voluptatem culpa quidem nisi rem neque sunt harum sed odit, repellat
				saepe qui optio consectetur. Perferendis debitis repudiandae animi quae
				beatae! Dolores ea laborum molestias optio et voluptatem dolore facilis
				fuga eos ipsum accusantium excepturi culpa maiores quas, repellendus
				quasi saepe in dicta neque tenetur officia sit! Dignissimos dolor
				doloribus, saepe repellendus cum deserunt veritatis harum odio dolore
				quo, excepturi debitis iusto doloremque porro vel totam nobis asperiores
				enim, laboriosam iure repellat ipsa. Pariatur, ut unde voluptas, esse
				molestias illum illo dicta, expedita autem sed quo molestiae nihil
				maxime eveniet doloribus explicabo sint veritatis. Perferendis,
				doloribus veritatis et recusandae, nesciunt illum, quod cumque corporis
				optio facilis eaque eligendi ut laudantium. Consequuntur temporibus nisi
				quisquam non delectus iste reiciendis facere, accusamus, numquam
				doloribus harum dolores aut laboriosam qui mollitia, molestiae
				repudiandae. Recusandae quam veritatis consequuntur reiciendis in sequi
				accusantium unde debitis ullam modi accusamus dolores ratione illo
				repellendus officia, at aspernatur cupiditate ut fuga commodi neque
				nesciunt perferendis eum! Explicabo voluptatem alias ab repellat itaque
				asperiores aut, amet vel exercitationem, unde, illo molestiae
				perspiciatis iusto placeat doloremque officiis illum repellendus earum?
				Odio at doloribus suscipit, iusto enim obcaecati natus explicabo
				expedita? Tenetur perspiciatis aliquam esse non culpa expedita possimus.
				Repudiandae corporis obcaecati aliquid eum molestias id delectus nihil
				provident accusantium excepturi quo nemo maxime dicta hic similique
				veritatis quod, vel aliquam! Labore reprehenderit blanditiis, est
				dolores illo quos dolor esse laudantium officia distinctio veritatis
				saepe totam qui voluptatem! Suscipit modi qui officia delectus maxime,
				nam sequi deleniti sapiente est omnis ad iure saepe quis. Similique,
				non!</TabContent
			>
			<TabContent value="tab2">Content for Tab 2</TabContent>
		{/snippet}
	</Tab>

	<Accordion collapsable={true}>
		{#each accordionData as data, i}
			<AccordionItem open={i === 0} group="b">
				{#snippet heading()}
					{data.heading}
				{/snippet}
				{#snippet description()}
					{data.description}
				{/snippet}
			</AccordionItem>
		{/each}
	</Accordion>
</div>

<div class="container">
	<Button variant="primary" onclick={() => console.log('clicked')}
		><p>Primary</p></Button
	>
</div>

<div class="container" data-size="full">
	<Carousel
		autoscroll={false}
		indicator={true}
		controls={true}
		infinite={false}
		count={data.length}
	>
		<CarouselContent
			size={{ lg: 589, md: 344, sm: 324 }}
			leftPadding={{ lg: 364, md: 32, sm: 16 }}
		>
			{#each data as slide, number}
				<CarouselItem>
					<svelte:component this={Slide} number={number + 1} />
				</CarouselItem>
			{/each}
		</CarouselContent>
	</Carousel>
</div>
