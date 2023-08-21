import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [],
	},
];

export default publicRoutes;
