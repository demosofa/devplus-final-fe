import axios from 'axios';

import { CvType } from '@types';
import { API_URL } from '@constants';

export const getListCv = (page: number, take: number, search: string) =>
	axios.get<CvType[]>(API_URL.CV, {
		params: {
			page,
			take,
			search,
		},
	});

export const passCV = (id: number) =>
	axios.patch<CvType>(API_URL.CV + `pass/${id}`);

export const failCV = (id: number) =>
	axios.patch<CvType>(API_URL.CV + `fail/${id}`);

export const getCvDetail = (id: number) => axios.get(API_URL.CV + id);
