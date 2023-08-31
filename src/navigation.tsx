import {
	GithubOutlined,
	PieChartOutlined,
	UserOutlined,
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
		roles: [ROLE.ADMIN, ROLE.USER],
	},

	{
		key: '/cv',
		label: 'CV',
		icon: <UserOutlined />,
		roles: [ROLE.ADMIN],
	},
];
