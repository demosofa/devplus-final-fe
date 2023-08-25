import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import { WorkSpace } from 'components/WorkSpace/WorkSpace';
import { CampainTest } from '../components/CaimpainTest/CampainTest';
import { CreateWorkSpace } from 'components/WorkSpace/CreateWorkSpace';
import { UpdateCampaign } from 'components/Campaign/UpdateCampaign';
import WorkSpaceDetail from 'components/WorkSpace/WorkSpaceDetail';
import { ModalDetailCampaign } from 'components/Campaign/ModalDetailCampaign';

const publicRoutes: RouteObject[] = [
	{
		element: <PublicLayout />,
		children: [
			{
				path: '/workspace',
				element: <WorkSpace />,
			},

			{
				path: 'campain',
				element: <CampainTest />,
			},

			{
				path: '/create-ws',
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

			{
				path: '/detail-campaign/:id',
				element: <ModalDetailCampaign />,
			},
		],
	},
];

export default publicRoutes;
