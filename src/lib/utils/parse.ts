const hours = 3600;
const minutes = 60;
const seconds = 1;

export const time_unit: Map<string, number> = new Map([
	['hours', hours],
	['hour', hours],
	['hrs', hours],
	['hr', hours],
	['h', hours],
	['minutes', minutes],
	['minute', minutes],
	['mins', minutes],
	['min', minutes],
	['m', minutes],
	['seconds', seconds],
	['second', seconds],
	['secs', seconds],
	['sec', seconds],
	['s', seconds]
]);
