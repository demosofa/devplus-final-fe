import { QUERY_KEY } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getChartCampaign } from '@services';
import { FILTER_TIME } from '@enums';

export const useChartCampaign = (filterTime: FILTER_TIME) => {
	return useQuery({
		queryKey: [QUERY_KEY.CHART_WORKSPACE, filterTime, 'campaign'],
		queryFn: async () => {
			const { data } = await getChartCampaign(filterTime);
			return data;
		},
	});
};
