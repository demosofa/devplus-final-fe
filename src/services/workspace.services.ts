import axios from 'axios';

import { API_URL } from '@constants';
import { CreateWorkspaceType, WorkspaceType } from '@types';

export const createWorkSpace = (data: CreateWorkspaceType) =>
	axios.post(API_URL.WORKSPACE, data);

export const getListWorkSpace = (page: number, pageSize: number) =>
	axios.get<WorkspaceType[]>(API_URL.WORKSPACE, {
		params: {
			page,
			pageSize,
		},
	});

export const detailWorkSpace = (id: number) =>
	axios.get(API_URL.WORKSPACE + id);

export const acceptWorkspace = (id: number) =>
	axios.patch(API_URL.WORKSPACE + `/accept/${id}`);

export const rejectWorkspace = (id: number) =>
	axios.delete(API_URL.WORKSPACE + `/reject/${id}`);
