<script lang="ts">
	import '../app.css';
	import { colors } from '$lib/utils/stores';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
	<title>niagara</title>
	<meta name="description" content="simple, minimal timer" />
</svelte:head>

<div style:color={$colors.text} style:background-color={$colors.bg}>
	<slot />
</div>

<style>
	:global(div) {
		font-family: 'Inter', sans-serif;
	}
</style>
