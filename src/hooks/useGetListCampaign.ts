import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { CampaignType, PageMeta } from '@types';
import { getListCampaign } from '@services';

export const useGetListCampaign = (
	page: number
): UseQueryResult<PageMeta<CampaignType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_CAMPAIGN, page],
		queryFn: async () => {
			const { data } = await getListCampaign(page);
			return data;
		},
	});
};
