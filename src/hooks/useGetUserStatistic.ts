import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';

import { getUserStatistic } from '@services';

export const useGetUserStatistic = () => {
	return useQuery({
		queryKey: [QUERY_KEY.STATISTIC_USER],
		queryFn: async () => {
			const { data } = await getUserStatistic();
			return data;
		},
	});
};
