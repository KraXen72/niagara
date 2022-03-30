export const formatTime = (seconds: number): string => {
    // https://stackoverflow.com/a/25279399
    // String.subtr() is deprecated
	const date = new Date(0);
	date.setSeconds(seconds);
	return date.toISOString().substring(11, 19)
};
