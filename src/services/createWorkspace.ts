import { API_URL } from '@constants';
import axios from 'axios';
import { CreateWorkspaceType } from '@types';

export const createWorkSpace = (data: CreateWorkspaceType) =>
	axios.post(API_URL.WORKSPACE, data);
