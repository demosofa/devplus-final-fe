import axios from 'axios';

import { API_URL } from '@constants';
import { CampaignType, CreateWorkspaceType, WorkspaceType } from '@types';

export const createWorkSpace = (data: CreateWorkspaceType) =>
	axios.post(API_URL.WORKSPACE, data);

export const getListWorkSpace = (page: number, take: number) =>
	axios.get<WorkspaceType[]>(API_URL.WORKSPACE, {
		params: {
			page,
			take,
		},
	});

export const getWorkspaceDetail = (id: number) =>
	axios.get(API_URL.WORKSPACE + '/' + id);

export const listCampaignFromWorkspace = (
	page: number,
	take: number,
	id: number
) =>
	axios.get<CampaignType[]>(API_URL.WORKSPACE + id + API_URL.CAMPAIGN, {
		params: {
			page,
			take,
		},
	});

export const listUserFromWorkspace = (page: number, take: number, id: number) =>
	axios.get<CampaignType[]>(API_URL.WORKSPACE + id + API_URL.USER, {
		params: {
			page,
			take,
		},
	});

export const acceptWorkspace = (id: number) =>
	axios.patch(API_URL.WORKSPACE + `/accept/${id}`);

export const rejectWorkspace = (id: number) =>
	axios.delete(API_URL.WORKSPACE + `/reject/${id}`);

export const deleteCampaign = (id: number) =>
	axios.delete(API_URL.CAMPAIGN + id);
