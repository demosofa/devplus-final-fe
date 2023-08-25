import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { getListWorkSpace } from '@services';
import { WorkspaceType, PageMeta } from '@types';

export const useGetListWorkSpace = (
	page: number
): UseQueryResult<PageMeta<WorkspaceType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_WORKSPACE, page],
		queryFn: async () => {
			const { data } = await getListWorkSpace(page);
			return data;
		},
	});
};
