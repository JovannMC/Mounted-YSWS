<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Mounted - Hack Club</title>
	<link rel="icon" href={favicon} />
	<meta name="title" content="Mounted - Hack Club" />
	<meta name="description" content="Mounted - Hack Club" />
	<meta property="og:url" content="https://vert.sh" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Mounted - Hack Club" />
</svelte:head>

{@render children()}
