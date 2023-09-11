import { Navigate, RouteObject } from 'react-router-dom';

import { PublicLayout } from '@layouts/PublicLayout/PublicLayout';
import { Login, CreateWorkSpace, ApplyCv, DashboardAdmin } from '@pages';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/',
				element: <Navigate to={'/login'} />,
			},

			{
				path: '/login',
				element: <Login />,
			},

			{
				path: 'create-workspace',
				element: <CreateWorkSpace />,
			},

			{
				path: '/apply-cv/:id',
				element: <ApplyCv />,
			},

			{
				path: '/campaign-dashboard/',
				element: <DashboardAdmin />,
			},
		],
	},
];

export default publicRoutes;
