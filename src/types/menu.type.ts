import { ROLE } from '@enums';

export type AuthMenuItem = {
	key: React.Key;
	label: React.ReactNode;
	icon?: React.ReactNode;
	children?: AuthMenuItem[];
	type?: 'group' | 'divider';
	roles?: ROLE[];
};
