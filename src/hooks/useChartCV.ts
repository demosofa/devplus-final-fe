import { QUERY_KEY } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getChartCV } from '@services';

export const useChartCV = (filterTime: string) => {
	return useQuery({
		queryKey: [QUERY_KEY.CHART_CAMPAIGN, filterTime],
		queryFn: async () => {
			const { data } = await getChartCV(filterTime);
			return data;
		},
	});
};
