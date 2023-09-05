import { Route, routeBasedRole } from './routeBasedRole';
import { PrivateLayout } from '@layouts/PrivateLayout/PrivateLayout';
import {
	WorkSpace,
	Campaign,
	UpdateCampaign,
	DetailCampaign,
	CreateCampaign,
	ListUser,
	DetailUser,
} from '@components';
import { CreateHR, ListCv, WorkSpaceDetail, CvDetail } from '@pages';
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
				path: '/workspace-detail/:id',
				element: <WorkSpaceDetail />,
				roles: [ROLE.SUPER_ADMIN],
			},

			{
				path: '/detail-campaign/:id',
				element: <DetailCampaign />,
				roles: [ROLE.ADMIN, ROLE.HR],
			},

			{
				path: '/cv',
				element: <ListCv />,
				roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
			},

			{
				path: '/user',
				element: <ListUser />,
				roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
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

			{
				path: '/update-campaign/:id',
				element: <UpdateCampaign />,
				roles: [ROLE.ADMIN, ROLE.HR],
			},

			{
				path: '/create-campaign',
				element: <CreateCampaign />,
				roles: [ROLE.ADMIN, ROLE.HR],
			},

			{
				path: '/cv-detail/:id',
				element: <CvDetail />,
				roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
			},

			{
				path: '/create-campaign',
				element: <CreateCampaign />,
			},
		],
	},
];

const routes = routeBasedRole(privateRoutes);

export default routes;
