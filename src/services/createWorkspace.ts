import { API_URL } from '@constants';
import axios from 'axios';
import { CREATEWORKSPACE } from 'types';

export const createWorkSpace = (data: CREATEWORKSPACE) =>
	axios.post(API_URL.WORKSPACE, data);
