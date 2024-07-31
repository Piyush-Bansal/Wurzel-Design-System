<script lang="ts">
	import type { HeaderProps } from './types';

	let {
		pageTitle,
		metaTitle,
		metaDescription,
		openGraphTitle,
		openGraphDescription,
		openGraphImage,
		canonical
	}: HeaderProps = $props();
</script>

<!-- 
@component
## Header Component

The Header component is a UI component that provides SEO meta tags for a webpage. It allows you to set the page title, meta title, meta description, Open Graph title, Open Graph description, Open Graph image, and canonical URL.

### Usage

To use the Header component, you need to import it from the `$components/seo-header` module.

```svelte
<script lang="ts">
  import { Header } from '$components/seo-header';
</script>
```

### Props

The Header component accepts the following props:

* **pageTitle:** A string representing the page title.
* **metaTitle:** A string representing the meta title.
* **metaDescription:** A string representing the meta description.
* **openGraphTitle:** A string representing the Open Graph title.
* **openGraphDescription:** A string representing the Open Graph description.
* **openGraphImage:** A string representing the Open Graph image URL.
* **canonical:** A string representing the canonical URL.

### Example

Here's an example of how to use the Header component:

```svelte
<Header
  pageTitle="Homepage"
  metaTitle="My Website - Homepage"
  metaDescription="Welcome to my website!"
  openGraphTitle="My Website - Homepage"
  openGraphDescription="Welcome to my website!"
  openGraphImage="https://example.com/og-image.jpg"
  canonical="https://example.com/"
/>
```

In this example, the `pageTitle`, `metaTitle`, `metaDescription`, `openGraphTitle`, `openGraphDescription`, `openGraphImage`, and `canonical` props are set to their respective values.

### Styling

The Header component does not provide any default styling. You can style it according to your needs using CSS or a CSS-in-JS solution like SCSS.

### Dependencies

The Header component does not have any dependencies.

### Accessibility

The Header component follows the WAI-ARIA guidelines for SEO meta tags. It uses the appropriate HTML tags and attributes to provide the correct semantics.

### Transitions

The Header component does not use any transitions.

### Best Practices

* Make sure to provide a unique `pageTitle` for each page of your website.
* Set the `metaTitle` to a concise and descriptive title that includes the website name and page title.
* Provide a `metaDescription` that summarizes the content of the page.
* Set the `openGraphTitle` and `openGraphDescription` to the same values as the `metaTitle` and `metaDescription`, respectively.
* Use a high-quality Open Graph image that represents the content of the page.
* Set the `canonical` URL to the URL of the page.

### Additional Information

The Header component uses the `svelte:head` element to insert the SEO meta tags into the HTML `<head>` section of the webpage.

-->
<svelte:head>
	<title>{pageTitle}</title>
	<meta content={metaTitle} property="og:title" />
	<meta content={metaDescription} name="description" />
	<meta
		content={openGraphDescription ? openGraphDescription : metaDescription}
		property="og:description"
	/>
	<meta content={openGraphImage} property="og:image" />
	<meta content="website" property="og:type" />
	<meta
		content={openGraphTitle ? openGraphTitle : pageTitle}
		property="twitter:title"
	/>
	<meta
		content={openGraphDescription ? openGraphDescription : metaDescription}
		property="twitter:description"
	/>
	<meta content={openGraphImage} property="twitter:image" />
	<meta property="og:locale" content="en_GB" />
	<!-- <meta property="og:locale:alternate" content="de_DE" /> -->
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={canonical} />
</svelte:head>
