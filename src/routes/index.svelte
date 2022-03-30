<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { formatTime } from '$lib/formats';
	import { time_unit } from '$lib/parse';
	import { onMount } from 'svelte';

	let input: string;
	let seconds: number = null;
	let input_element: HTMLInputElement;

	const inputParser = (input: string): number => {
		let result = 0;
		if (input.includes(':')) {
			const time_texts = input.split(':');
			if (time_texts.length < 2 || time_texts.length > 3) return null;
			const seconds = [1, 60, 3600];
			const time_texts_reverse = time_texts.reverse();
			for (let i = 0; i < time_texts_reverse.length; i++) {
				let val = time_texts_reverse[i];
				if (val.length !== 2) return null;
				const num = toInt(val);
				if (isNaN(num)) return null;
				const limit = seconds[i + 1] || 24;
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

	const handleKeydown: EventListener = (e) => {
		const e_keydown = e as KeyboardEvent;
		if (e_keydown.key === 'Enter') {
			convertTime();
		}
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

	const handleCommand: EventListener = (e) => {
		const e_keydown = e as KeyboardEvent;
		if (e_keydown.key === ' ' && document.activeElement !== input_element) {
			toggle_count += 1;
			if (toggle_count % 2 === 1) {
				start();
			} else {
				stop();
			}
		}
	};

	onMount(() => {
		input_element.focus();
		return stop();
	});
</script>

<svelte:window on:keydown={handleCommand} />
<div class="min-h-screen flex place-items-center place-content-center p-4">
	<div>
		{#if seconds !== null}
			<p class="text-6xl sm:text-7xl md:text-8xl font-semibold cursor-pointer" on:click={reset}>
				{formatTime(seconds)}
			</p>
		{:else}
			<input
				type="text"
				class="outline-none text-center text-6xl sm:text-7xl md:text-8xl font-semibold w-full"
				on:keydown={handleKeydown}
				bind:value={input}
				bind:this={input_element}
			/>
		{/if}
	</div>
</div>
