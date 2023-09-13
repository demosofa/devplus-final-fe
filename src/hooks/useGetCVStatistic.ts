import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';

import { getCvStatistic } from '@services';

export const useGetCvStatistic = () => {
	return useQuery({
		queryKey: [QUERY_KEY.STATISTIC_CV],
		queryFn: async () => {
			const { data } = await getCvStatistic();
			return data;
		},
	});
};
