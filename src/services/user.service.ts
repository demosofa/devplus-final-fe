import axios from 'axios';

import { API_URL } from '@constants';
import { UserType } from '@types';

export const getListUser = (page: number, take: number) =>
	axios.get<UserType[]>(API_URL.USER, {
		params: {
			page,
			take,
		},
	});
