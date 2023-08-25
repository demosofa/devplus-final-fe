import { QUERY_KEY } from '@constants';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { CampaignType } from '@types';
import { PageMeta } from '../types/pageMeta.type';
import { getListCampaign } from '../services/campaign.service';

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
