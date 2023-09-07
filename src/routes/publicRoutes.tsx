import { RouteObject } from 'react-router-dom';

import { PublicLayout } from '@layouts/PublicLayout/PublicLayout';
import { Login, CreateCv } from '@pages';
import { CreateWorkSpace } from '@components';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},

			{
				path: 'create-workspace',
				element: <CreateWorkSpace />,
			},

			{
				path: '/create-cv/:id',
				element: <CreateCv />,
			},
		],
	},
];

export default publicRoutes;
