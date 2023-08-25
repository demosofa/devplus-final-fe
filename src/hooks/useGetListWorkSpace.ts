import { QUERY_KEY } from '@constants';
import { getListWorkSpace } from '@services';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { WorkspaceType } from '@types';
import { PageMeta } from './../types/pageMeta.type';

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
