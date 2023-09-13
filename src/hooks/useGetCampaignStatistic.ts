import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';

import { getCampaignStatistic } from '@services';

export const useGetCampaignStatistic = () => {
	return useQuery({
		queryKey: [QUERY_KEY.STATISTIC_CAMPAIGN],
		queryFn: async () => {
			const { data } = await getCampaignStatistic();
			return data;
		},
	});
};
