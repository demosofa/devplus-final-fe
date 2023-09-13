import axios from 'axios';

import { API_URL } from '@constants';
import { UserCountType, UserCreate, UserType } from '@types';

export const getListUser = (page: number, take: number, search: string) =>
	axios.get<UserType[]>(API_URL.USER, {
		params: {
			page,
			take,
			search,
		},
	});

export const getDetailUser = (id: number) =>
	axios.get<UserType>(API_URL.USER + id);

export const createHR = (data: UserCreate) =>
	axios.post(API_URL.USER + 'hr', data);

export const updateUser = (data: UserType) =>
	axios.patch<UserType>(API_URL.USER + data.id, data);

export const getUserStatistic = () =>
	axios.get<UserCountType>(API_URL.USER + API_URL.USER_STATISTIC);
