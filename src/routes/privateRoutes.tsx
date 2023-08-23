import { ROLE } from '@enums';
import { Route, routeBasedRole } from './routeBasedRole';
import { PrivateLayout } from '@layouts/PrivateLayout';

const privateRoutes: Route[] = [
	{
		element: <PrivateLayout />,
		children: [
			{
				path: '/test',
				element: <h1>Homepage</h1>,
				roles: [ROLE.ADMIN],
			},
		],
	},
];

const routes = routeBasedRole(privateRoutes);

export default routes;
