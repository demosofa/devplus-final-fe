export const setStorage = (key: string, value: unknown) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string) => {
	const value = localStorage.getItem(key);
	if (!value) return null;
	return JSON.parse(value);
};

export const removeStorage = (key: string) => localStorage.removeItem(key);
