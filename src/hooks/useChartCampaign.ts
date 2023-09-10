import { QUERY_KEY } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { getChartCV } from 'services/campaign.services';

export const useChartCampaign = (id: number) => {
	return useQuery({
		queryKey: [QUERY_KEY.CHART_CAMPAIGN],
		queryFn: async () => {
			const { data } = await getChartCV(id);
			return data;
		},
	});
};
