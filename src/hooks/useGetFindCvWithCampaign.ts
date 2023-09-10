import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { getFindCvWithCampaign } from '@services';

export const useGetFindCvWithCampaign = (id: number) => {
	return useQuery({
		queryKey: [QUERY_KEY.FIND_CV_WITH_CAMPAIGN, id],
		queryFn: async () => {
			const { data } = await getFindCvWithCampaign(id);
			return data;
		},
	});
};
