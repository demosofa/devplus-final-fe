export function clone(value: unknown) {
	return JSON.parse(JSON.stringify(value));
}
