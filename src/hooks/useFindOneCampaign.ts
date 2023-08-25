import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '../constants/query-key';
import { getFindOneCampaign } from '@services';

export const useFindOneCampaign = (id: number) => {
	return useQuery({
		queryKey: [QUERY_KEY.FIND_ONE_CAMPAIGN],
		queryFn: async () => {
			const { data } = await getFindOneCampaign(id);
			return data;
		},
	});
};
