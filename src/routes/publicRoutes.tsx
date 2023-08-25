import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import { WorkSpace } from 'components/WorkSpace/WorkSpace';
import { CreateWorkSpace } from 'components/WorkSpace/CreateWorkSpace';
import { UpdateCampaign } from 'components/Campaign/UpdateCampaign';
import WorkSpaceDetail from 'components/WorkSpace/WorkSpaceDetail';
import { Campaign } from '../components';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/workspace',
				element: <WorkSpace />,
			},

			{
				path: 'campaign',
				element: <Campaign />,
			},

			{
				path: 'create-ws',
				element: <CreateWorkSpace />,
			},

			{
				path: '/update-campaign/:id',
				element: <UpdateCampaign />,
			},

			{
				path: '/workspace-detail/:id',
				element: <WorkSpaceDetail />,
			},
		],
	},
];

export default publicRoutes;
