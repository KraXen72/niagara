<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Colors } from '$lib/types';

	import { colors, preferences } from '$lib/utils/stores';

	export const load: Load = ({ session }) => {
		const locals = session as Partial<{ colors: Colors }>;
		const color_preference = locals.colors;
		if (color_preference) {
			colors.set(color_preference);
			preferences.set(true);
		}
		return {};
	};
</script>

<script lang="ts">
	import { formatTime } from '$lib/utils/format';
	import { time_unit } from '$lib/utils/parse';
	import { onMount } from 'svelte';

	import Customize from '$lib/components/Customize.svelte';
	import Help from '$lib/components/Help.svelte';

	let input: string;
	let seconds: number = null;
	let input_element: HTMLInputElement;

	const inputParser = (input: string): number => {
		if (!input) return null;
		let result = 0;
		if (input.includes(':')) {
			const time_texts = input.split(':');
			if (time_texts.length < 2 || time_texts.length > 3) return null;
			const seconds = [1, 60, 3600];
			const time_texts_reverse = time_texts.reverse();
			for (let i = 0; i < time_texts_reverse.length; i++) {
				let val = time_texts_reverse[i];
				if (val.length !== 2 && i !== time_texts_reverse.length - 1) return null;
				const num = toInt(val);
				if (isNaN(num)) return null;
				const limit = seconds[i + 1] || 100;
				console.log(num, limit);
				if (num > limit) return null;
				result += num * seconds[i];
			}
			return result;
		}
		if (!isNaN(toInt(input))) {
			result = toInt(input);
			return result;
		}
		const text = input.split(' ');
		if (text.length === 0) return null;
		let type = null;
		if (toInt(text[0])) {
			type = 1;
		} else if (/^\d/.test(text[0])) {
			type = 2;
		}
		if (!type) return null;
		let used_unit: number[] = [];
		for (let i = 0; i < text.length; i++) {
			if (type === 1) {
				if (i % 2 === 0) {
					if (!toInt(text[i])) return null;
					if (!time_unit.has(text[i + 1])) return null;
					const unit_seconds = time_unit.get(text[i + 1]);
					if (used_unit.includes(unit_seconds)) return null;
					if (used_unit.length > 0 && unit_seconds > Math.max(...used_unit)) return null;
					result += toInt(text[i]) * unit_seconds;
					used_unit.push(unit_seconds);
				}
			}
			if (type === 2) {
				let num_index: number;
				for (let s = 0; s < text[i].length; s++) {
					if (isNaN(toInt(text[i].charAt(s)))) {
						num_index = s;
						break;
					}
				}
				if (!num_index && num_index !== 0) continue;
				const time_num = toInt(text[i].substring(0, num_index));
				const unit = text[i].substring(num_index);
				if (!time_unit.has(unit)) continue;
				const unit_seconds = time_unit.get(unit);
				if (used_unit.includes(unit_seconds)) return null;
				result += time_num * unit_seconds;
				used_unit.push(unit_seconds);
			}
		}
		if (!result) return null;
		return result;
	};

	const toInt = (input: string): number => {
		if (input.includes('.')) return NaN;
		if (isNaN(Number(input))) return NaN;
		return Number(input);
	};

	const convertTime = () => {
		const result = inputParser(input);
		if (result === null) return;
		seconds = result;
	};

	const reset = () => {
		stop();
		toggle_count = 0;
		seconds = null;
		setTimeout(() => {
			input_element.focus();
		}, 1);
	};

	let interval: NodeJS.Timer;

	const start = () => {
		interval = setInterval(() => {
			seconds -= 1;
			if (seconds === 0) {
				clearInterval(interval);
			}
		}, 1000);
	};

	const stop = () => {
		clearInterval(interval);
	};

	let toggle_count = 0;

	const handleKeydown: EventListener = (e) => {
		const e_keydown = e as KeyboardEvent;
		if (document.activeElement === input_element) {
			if (e_keydown.key === 'Enter') {
				convertTime();
				return;
			}
			return;
		}
		console.log('handleCommand');
		if (e_keydown.key === ' ') {
			toggleTimer();
			return;
		}
		if (e_keydown.key === 'Enter') {
			reset();
			return;
		}
	};

	const toggleTimer = () => {
		toggle_count += 1;
		if (toggle_count % 2 === 1) {
			start();
		} else {
			stop();
		}
	};

	let current_block = null;

	const changeBlock = (block: string) => {
		current_block = block;
	};

	onMount(() => {
		const darkMode = () => {
			if (window.matchMedia){
				const dark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
				if (dark && !$preferences) {
					$colors = {
						bg: '#111110',
						timer: '#dddddd',
						text: '#dddddd',
						logo: '#d1d5db'
					};
				}
			}
		};
		darkMode();
		input_element.focus();
		return stop();
	});
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="absolute top-0 w-full flex p-4 sm:px-8 place-content-between place-items-center z-50">
	<p class="text-lg font-medium" style:color={$colors.logo}>niagara</p>
	<div class="flex gap-2 text-sm">
		{#if !current_block}
			<button class="hover:underline" on:click={reset}>reset</button>
			<button
				class="hover:underline"
				on:click={() => {
					changeBlock('help');
				}}>help</button
			>
			<button
				class="hover:underline"
				on:click={() => {
					changeBlock('customize');
				}}>customize</button
			>
		{:else}
			<button
				class="hover:underline"
				on:click={() => {
					changeBlock(null);
				}}>close</button
			>
		{/if}
	</div>
</div>
<div class="min-h-screen flex place-items-center place-content-center px-4 md:px-8">
	{#if current_block === 'help'}
		<Help />
	{:else if current_block === 'customize'}
		<Customize />
	{:else}
		<div style:color={$colors.timer}>
			{#if seconds !== null}
				<p
					class="text-6xl sm:text-7xl md:text-8xl font-semibold cursor-pointer tabular-nums"
					on:click={toggleTimer}
				>
					{formatTime(seconds)}
				</p>
			{:else}
				<input
					type="text"
					class="outline-none text-center text-6xl sm:text-7xl md:text-8xl font-semibold w-full bg-transparent"
					bind:value={input}
					bind:this={input_element}
				/>
			{/if}
		</div>
	{/if}
</div>
