import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { PageMeta, CampaignType } from '@types';
import { listCampaignFromWorkspace } from '@services';

export const useListCampaignWithWorkspace = (
	id: number,
	page: number,
	pageSize: number
): UseQueryResult<PageMeta<CampaignType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_CAMPAIGN_FROM_WORKSPACE, page, pageSize, id],
		queryFn: async () => {
			const { data } = await listCampaignFromWorkspace(page, pageSize, id);
			return data;
		},
	});
};
