import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import WorkSpace from 'components/WorkSpace/WorkSpace';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/hehe',
				element: <WorkSpace />,
			},
		],
	},
];

export default publicRoutes;
