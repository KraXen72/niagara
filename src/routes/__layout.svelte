<script>
	import '../app.css';
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

<div class="relative">
	<div class="absolute top-0 left-0 p-4">
		<p class="font-medium text-gray-300 text-lg">niagara</p>
	</div>
	<slot />
</div>

<style>
	:global(div) {
		font-family: 'Inter', sans-serif;
	}
</style>
