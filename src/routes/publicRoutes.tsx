import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import WorkSpace from 'components/WorkSpace/WorkSpace';
import { CampainTest } from '../components/CaimpainTest/CampainTest';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/hehe',
				element: <WorkSpace />,
			},
			{
				path: 'campain',
				element: <CampainTest />,
			},
		],
	},
];

export default publicRoutes;
