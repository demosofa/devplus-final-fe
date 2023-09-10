import { RouteObject } from 'react-router-dom';

import { CreateWorkSpace } from '@components';
import { PublicLayout } from '@layouts/PublicLayout/PublicLayout';
import { CreateCv, Login } from '@pages';
import { ListCampaignWithWorkspace } from '../pages/ListCampaignWithWorkspace/ListCampaignWithWorkspace';

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

			{
				path: '/campaign-workspace/:id',
				element: <ListCampaignWithWorkspace />,
			},
		],
	},
];

export default publicRoutes;
