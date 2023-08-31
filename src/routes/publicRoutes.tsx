import { RouteObject } from 'react-router-dom';

import { PublicLayout } from '@layouts/PublicLayout/PublicLayout';
import { CreateUser, Login } from '@pages';
import { ListCv } from '@pages';
import CreateCampaign from 'components/Campaign/CreateCampaign';
import { UpdateCampaign } from 'components/Campaign/UpdateCampaign';
import { ListUser } from 'components/User/ListUser';
import { CreateWorkSpace } from 'components/WorkSpace/CreateWorkSpace';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},

			{ path: '/create-user', element: <CreateUser /> },

			{
				path: 'create-ws',
				element: <CreateWorkSpace />,
			},
      
			{
				path: '/workspace-detail/:id',
				element: <WorkSpaceDetail />,
			},

			{
				path: '/detail-campaign/:id',
				element: <DetailCampaign />,
			},

			{
				path: '/cv',
				element: <ListCv />,
			},

			{
				path: '/create-campaign/:workspaceId',
				element: <CreateCampaign />,
			},

			{
				path: '/update-campaign/:id',
				element: <UpdateCampaign />,
			},

			{
				path: '/user',
				element: <ListUser />,
			},
		],
	},
];

export default publicRoutes;
