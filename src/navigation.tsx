import {
	DashboardOutlined,
	GithubOutlined,
	PieChartOutlined,
	SnippetsOutlined,
	UserAddOutlined,
	UserOutlined,
} from '@ant-design/icons';

import { ROLE } from '@enums';
import { AuthMenuItem } from '@types';

export const navigation: AuthMenuItem[] = [
	{
		key: '/dashboard',
		label: 'Dashboard',
		icon: <DashboardOutlined />,
		roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
	},

	{
		key: '/list-workspace',
		label: 'Workspace',
		icon: <GithubOutlined />,
		roles: [ROLE.SUPER_ADMIN],
	},

	{
		key: '/list-campaign',
		label: 'Campaign',
		icon: <PieChartOutlined />,
		roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.HR],
	},

	{
		key: '/list-cv',
		label: 'CV',
		icon: <SnippetsOutlined />,
		roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
	},

	{
		key: '/list-user',
		label: 'User',
		icon: <UserOutlined />,
		roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
	},

	{
		key: '/create-hr',
		label: 'Create HR',
		icon: <UserAddOutlined />,
		roles: [ROLE.ADMIN],
	},
];
