import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import { WorkSpace } from 'components/WorkSpace/WorkSpace';
import { CreateWorkSpace } from 'components/WorkSpace/CreateWorkSpace';
import WorkSpaceDetail from 'components/WorkSpace/WorkSpaceDetail';
import { Campaign } from '../components';
import { ModalCampaign } from 'components/Campaign/ModalCampaign';
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
				path: 'campaign',
				element: <Campaign />,
			},

			{
				path: 'create-ws',
				element: <CreateWorkSpace />,
			},

			{
				path: '/update-campaign/:id',
				element: <ModalCampaign />,
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
