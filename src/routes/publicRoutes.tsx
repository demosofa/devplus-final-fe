import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import { WorkSpace } from 'components/WorkSpace/WorkSpace';
import { CampaignTest } from 'components/CampaignTest/CampaignTest';
import { CreateWorkSpace } from 'components/WorkSpace/CreateWorkSpace';
import { Campaign } from '../components';
import { WorkSpaceDetail } from 'pages/WorkspaceDetail';
import { DetailCampaign } from 'components/Campaign/DetailCampaign';
import { CreateUser, Login } from '@pages';

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
				path: '/workspace',
				element: <WorkSpace />,
			},

			{
				path: 'campaign',
				element: <Campaign />,
			},

			{
				path: '/campaign-test',
				element: <CampaignTest />,
			},

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
		],
	},
];

export default publicRoutes;
