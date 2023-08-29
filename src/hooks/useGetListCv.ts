import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';

import { PageMeta, CvType } from '@types';
import { getListCv } from 'services/cv.services';

export const useGetListCv = (
	page: number,
	pageSize: number
): UseQueryResult<PageMeta<CvType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_CV, page, pageSize],
		queryFn: async () => {
			const { data } = await getListCv(page, pageSize);
			return data;
		},
	});
};
