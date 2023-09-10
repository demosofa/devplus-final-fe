import { Route, routeBasedRole } from './routeBasedRole';

import { PrivateLayout } from '@layouts/PrivateLayout/PrivateLayout';

import {
	CreateHR,
	ListCv,
	ListWorkSpace,
	CvDetail,
	ListUser,
	DetailUser,
	UpdateCampaign,
	CreateCampaign,
	ListCampaign,
	WorkSpaceDetail,
	DetailCampaign,
} from '@pages';
import { ROLE } from '@enums';

const privateRoutes: Route[] = [
	{
		element: <PrivateLayout />,
		children: [
			{
				path: '/list-workspace',
				element: <ListWorkSpace />,
				roles: [ROLE.SUPER_ADMIN],
			},

			{
				path: '/list-campaign',
				element: <ListCampaign />,
			},

			{
				path: '/workspace-detail/:id',
				element: <WorkSpaceDetail />,
				roles: [ROLE.SUPER_ADMIN],
			},

			{
				path: '/detail-campaign/:id',
				element: <DetailCampaign />,
				roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.HR],
			},

			{
				path: '/list-cv',
				element: <ListCv />,
				roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
			},

			{
				path: '/list-user',
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
		],
	},
];

const routes = routeBasedRole(privateRoutes);

export default routes;
