<script lang="ts">
	let {
		pageTitle,
		metaTitle,
		metaDescription,
		openGraphTitle,
		openGraphDescription,
		openGraphImage,
		canonical
	} = $props();
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta content={metaTitle} property="og:title" />
	<meta content={metaDescription} name="description" />
	<meta content={openGraphDescription} property="og:description" />
	<meta content={openGraphImage} property="og:image" />
	<meta content="website" property="og:type" />
	<meta content={openGraphTitle} property="twitter:title" />
	<meta content={openGraphDescription} property="twitter:description" />
	<meta content={openGraphImage} property="twitter:image" />
	<meta property="og:locale" content="en_GB" />
	<!-- <meta property="og:locale:alternate" content="de_DE" /> -->
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={canonical} />
</svelte:head>
