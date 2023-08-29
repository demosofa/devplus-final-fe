import axios from 'axios';

import { CvType } from '@types';
import { API_URL } from '@constants';

export const getListCv = (page: number, take: number) =>
	axios.get<CvType[]>(API_URL.CV, {
		params: {
			page,
			take,
		},
	});
