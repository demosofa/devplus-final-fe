import { API_URL } from '@constants';
import axios, { AxiosResponse } from 'axios';
import { WorkspaceType } from '@types';

export const getListWorkSpace = (): Promise<AxiosResponse<WorkspaceType[]>> =>
	axios.get<WorkspaceType[]>(API_URL.WORKSPACE);

export const acceptWorkspace = (id: number) =>
	axios.patch(API_URL.WORKSPACE + `/accept/${id}`);

export const rejectWorkspace = (id: number) =>
	axios.delete(API_URL.WORKSPACE + `/reject/${id}`);
