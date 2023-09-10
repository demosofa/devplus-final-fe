import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { PageMeta, CampaignType } from '@types';
import { listUserFromWorkspace } from '@services';

export const useListUserWithWorkspace = (
	id: number,
	page: number,
	pageSize: number
): UseQueryResult<PageMeta<CampaignType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_USER_FROM_WORKSPACE, page, pageSize, id],
		queryFn: async () => {
			const { data } = await listUserFromWorkspace(page, pageSize, id);
			return data;
		},
	});
};
