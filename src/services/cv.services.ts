import axios from 'axios';

import { CvCountType, CvType } from '@types';
import { API_URL } from '@constants';

export const getListCv = (page: number, take: number, search: string) =>
	axios.get<CvType[]>(API_URL.CV, {
		params: {
			page,
			take,
			search,
		},
	});

export const createCv = (data: FormData) =>
	axios.post(API_URL.CV, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const passCV = (id: number) =>
	axios.patch<CvType>(API_URL.CV + `pass/${id}`);

export const failCV = (id: number) =>
	axios.patch<CvType>(API_URL.CV + `fail/${id}`);

export const getCvDetail = (id: number) => axios.get(API_URL.CV + id);

export const getCvStatistic = () =>
	axios.get<CvCountType>(API_URL.CV + API_URL.CV_STATISTIC);
