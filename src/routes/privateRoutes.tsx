import { Route, routeBasedRole } from './routeBasedRole';
import { PrivateLayout } from '@layouts/PrivateLayout/PrivateLayout';
import { WorkSpace } from 'components/WorkSpace/WorkSpace';
import { CampaignTest } from 'components/CampaignTest/CampaignTest';
import { Campaign } from '../components';
import { WorkSpaceDetail } from 'pages/WorkspaceDetail';
import { DetailCampaign } from 'components/Campaign/DetailCampaign';
import { CreateHR, ListCv } from '@pages';
import { ROLE } from '@enums';
import { ListUser } from 'components/User/ListUser';
import { DetailUser } from 'components/User/DetailUser';

const privateRoutes: Route[] = [
	{
		element: <PrivateLayout />,
		children: [
			{
				path: '/workspace',
				element: <WorkSpace />,
				roles: [ROLE.SUPER_ADMIN],
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
				path: '/user',
				element: <ListUser />,
			},

			{
				path: '/detail-user/:id',
				element: <DetailUser />,
			},

			{
				path: '/create-hr',
				element: <CreateHR />,
				roles: [ROLE.ADMIN],
			},
		],
	},
];

const routes = routeBasedRole(privateRoutes);

export default routes;
