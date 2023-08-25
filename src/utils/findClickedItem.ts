import { MenuItem } from '@types';

export const findClickedItem = (
	items: MenuItem[],
	key: string
): MenuItem | null => {
	for (const item of items) {
		if (item.key === key) {
			return item;
		}
		if (item.children && item.children.length > 0) {
			const subItem = findClickedItem(item.children, key);
			if (subItem) {
				return subItem;
			}
		}
	}
	return null;
};
