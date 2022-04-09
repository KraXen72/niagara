import type { Colors } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const colors: Writable<Colors> = writable({
	bg: '#ffffff',
	timer: '#000000',
	text: '#000000',
	logo: '#d1d5db'
});
export const preferences: Writable<boolean> = writable(false);
