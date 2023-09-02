import {
	GithubOutlined,
	PieChartOutlined,
	UserAddOutlined,
	UserOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';

import { ROLE } from '@enums';
import { AuthMenuItem } from '@types';

export const navigation: AuthMenuItem[] = [
	{
		key: '/workspace',
		label: 'Workspace',
		icon: <GithubOutlined />,
		roles: [ROLE.SUPER_ADMIN],
	},

	{
		key: '/campaign',
		label: 'Campaign',
		icon: <PieChartOutlined />,
		roles: [ROLE.ADMIN, ROLE.HR],
	},

	{
		key: '/cv',
		label: 'CV',
		icon: <UserOutlined />,
		roles: [ROLE.ADMIN],
	},

	{
		key: '/user',
		label: 'List HR',
		icon: <UsergroupAddOutlined />,
		roles: [ROLE.SUPER_ADMIN],
	},

	{
		key: '/create-hr',
		label: 'Create HR',
		icon: <UserAddOutlined />,
		roles: [ROLE.ADMIN],
	},
];
