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
		key: '/list-workspace',
		label: 'Workspace',
		icon: <GithubOutlined />,
		roles: [ROLE.SUPER_ADMIN],
	},

	{
		key: '/list-campaign',
		label: 'List Campaign',
		icon: <PieChartOutlined />,
		roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.HR],
	},

	{
		key: '/list-cv',
		label: 'List CV',
		icon: <UserOutlined />,
		roles: [ROLE.ADMIN],
	},

	{
		key: '/list-user',
		label: 'List User',
		icon: <UsergroupAddOutlined />,
		roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
	},

	{
		key: '/create-hr',
		label: 'Create HR',
		icon: <UserAddOutlined />,
		roles: [ROLE.ADMIN],
	},
];
