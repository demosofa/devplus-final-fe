import {
	GithubOutlined,
	PieChartOutlined,
	UserOutlined,
	UserSwitchOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';
import { MenuItem } from '@types';
import { Link } from 'react-router-dom';

export function getItem(
	label: string,
	key: string,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	};
}

export const superAdminNav: MenuItem[] = [
	getItem(
		'Workspace',
		'1',
		<Link to={'/hehe'}>
			<GithubOutlined />
		</Link>
	),
	getItem(
		'Campaign',
		'2',
		<Link to={'/campaign'}>
			<PieChartOutlined />
		</Link>
	),
	getItem('User', 'sub1', <UserOutlined />, [
		getItem(
			'Main Account',
			'3',
			<Link to={'/campaign'}>
				<UserSwitchOutlined />
			</Link>
		),
		getItem(
			'Sub Account',
			'4',
			<Link to={'/campaign'}>
				<UsergroupAddOutlined />
			</Link>
		),
	]),
];

export const adminNav: MenuItem[] = [
	getItem(
		'Campaign',
		'2',
		<Link to={'/campaign'}>
			<PieChartOutlined />
		</Link>
	),
	getItem('User', 'sub1', <UserOutlined />, [
		getItem(
			'Main Account',
			'3',
			<Link to={'/campaign'}>
				<UserSwitchOutlined />
			</Link>
		),
		getItem(
			'Sub Account',
			'4',
			<Link to={'/campaign'}>
				<UsergroupAddOutlined />
			</Link>
		),
	]),
];

export const userNav: MenuItem[] = [
	getItem(
		'Campaign',
		'2',
		<Link to={'/campaign'}>
			<PieChartOutlined />
		</Link>
	),
];
