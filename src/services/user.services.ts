import axios from 'axios';

import { API_URL } from '@constants';
import { UserCreate, UserType } from '@types';

export const getListUser = (page: number, take: number) =>
	axios.get<UserType[]>(API_URL.USER, {
		params: {
			page,
			take,
		},
	});

export const getDetailUser = (id: number) =>
	axios.get<UserType>(API_URL.USER + id);

export const createHR = (data: UserCreate) =>
	axios.post(API_URL.USER + 'hr', data);
export const updateUser = (data: UserType) =>
	axios.patch<UserType>(API_URL.USER + data.id, data);
