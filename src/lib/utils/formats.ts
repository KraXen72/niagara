export const formatTime = (time: number): string => {
	const seconds = Math.floor(time % 60);
	const minutes = Math.floor((time / 60) % 60);
	const hours = Math.floor((time / (60 * 60)) % 24);
	return `${time < 0 ? '-' : ''}${toNDigit(hours, 2)}:${toNDigit(minutes, 2)}:${toNDigit(
		seconds,
		2
	)}`;
};

const toNDigit = (num: number, n: number): string => {
	return `${'0'.repeat(n - num.toString().length)}${num}`;
};
