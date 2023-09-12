import { QUERY_KEY } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getChartUser } from '@services';
import { FILTER_TIME } from '@enums';

export const useChartUser = (filterTime: FILTER_TIME) => {
	return useQuery({
		queryKey: [QUERY_KEY.CHART_WORKSPACE, filterTime, 'user'],
		queryFn: async () => {
			const { data } = await getChartUser(filterTime);
			return data;
		},
	});
};
