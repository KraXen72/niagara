import type { Colors } from '$lib/types';
import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const { colors } = cookie.parse(event.request.headers.get('cookie') || '') as Partial<{
		colors: string;
	}>;
	if (colors) {
		event.locals = {
			colors: JSON.parse(colors)
		};
	}
	return await resolve(event);
};

export const getSession: GetSession = async (event) => {
	const { colors } = event.locals as Partial<{ colors: Colors }>;
	if (!colors) return {};
	return { colors };
};
