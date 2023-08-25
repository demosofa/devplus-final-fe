export interface MenuItem {
	key: string;
	icon?: React.ReactNode;
	children?: MenuItem[];
	label: string;
}
