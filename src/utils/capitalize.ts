export function capitalize(value: string): string {
	value = value.trim();
	return value[0].toUpperCase() + value.slice(1);
}
