import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';

import { getCvDetail } from 'services/cv.services';

export const useGetDetailCv = (id: number) => {
	return useQuery({
		queryKey: [QUERY_KEY.DETAIL_CV],
		queryFn: async () => {
			const { data } = await getCvDetail(id);
			return data;
		},
	});
};
