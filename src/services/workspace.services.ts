import { API_URL } from '@constants';
import axios, { AxiosResponse } from 'axios';
import { WorkspaceType } from '@types';

export const getListWorkSpace = (
	page: number
): Promise<AxiosResponse<WorkspaceType[]>> =>
	axios.get<WorkspaceType[]>(API_URL.WORKSPACE, {
		params: {
			page,
		},
	});
export const detailWorkSpace = (
	id: number
): Promise<AxiosResponse<WorkspaceType[]>> =>
	axios.get<WorkspaceType[]>(API_URL.DETAIL_WORKSPACE + id);

export const acceptWorkspace = (id: number) =>
	axios.patch(API_URL.WORKSPACE + `/accept/${id}`);

export const rejectWorkspace = (id: number) =>
	axios.delete(API_URL.WORKSPACE + `/reject/${id}`);
