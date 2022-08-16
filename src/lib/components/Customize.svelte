<script lang="ts">
	import Cookies from 'js-cookie';

	import { colors } from '$lib/utils/stores';

	const savePreference = () => {
		Cookies.set('colors', JSON.stringify($colors));
	};
</script>

<div class="flex flex-col gap-1.5">
	<div class="flex gap-2 place-items-center">
		<input
			type="color"
			class="border rounded cursor-pointer"
			style:border-color={$colors.text}
			style:background-color={$colors.bg}
			bind:value={$colors.bg}
			on:input={savePreference}
		/>
		<p>background</p>
	</div>
	<div class="flex gap-2">
		<input
			type="color"
			class="border rounded cursor-pointer"
			style:border-color={$colors.text}
			style:background-color={$colors.timer}
			bind:value={$colors.timer}
			on:input={savePreference}
		/>
		<p>timer</p>
	</div>
	<div class="flex gap-2">
		<input
			type="color"
			class="border rounded cursor-pointer"
			style:border-color={$colors.text}
			style:background-color={$colors.text}
			bind:value={$colors.text}
			on:input={savePreference}
		/>
		<p>text</p>
	</div>
	<div class="flex gap-2">
		<input
			type="color"
			class="border rounded cursor-pointer"
			style:border-color={$colors.text}
			style:background-color={$colors.logo}
			bind:value={$colors.logo}
			on:input={savePreference}
		/>
		<p>logo</p>
	</div>
</div>

<style>
	input {
		-webkit-appearance: none;
		-moz-appearance: none;
		-ms-appearance: none;
		-o-appearance: none;
		appearance: none;
	}
	::-webkit-color-swatch {
		border: none;
	}
</style>
