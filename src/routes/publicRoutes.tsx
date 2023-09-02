import { RouteObject } from 'react-router-dom';

import { PublicLayout } from '@layouts/PublicLayout/PublicLayout';
import { Login } from '@pages';
import { CreateWorkSpace } from 'components/WorkSpace/CreateWorkSpace';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},

			{
				path: 'create-ws',
				element: <CreateWorkSpace />,
			},
		],
	},
];

export default publicRoutes;
