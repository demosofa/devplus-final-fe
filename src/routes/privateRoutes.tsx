import { Route, routeBasedRole } from './routeBasedRole';
import { PrivateLayout } from '@layouts/PrivateLayout/PrivateLayout';
import { WorkSpace } from 'components/WorkSpace/WorkSpace';
import { CampaignTest } from 'components/CampaignTest/CampaignTest';
import { Campaign } from '../components';
import { WorkSpaceDetail } from 'pages/WorkspaceDetail';
import { DetailCampaign } from 'components/Campaign/DetailCampaign';
import { ListCv } from '@pages';
import { ROLE } from '@enums';

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
		],
	},
];

const routes = routeBasedRole(privateRoutes);

export default routes;
