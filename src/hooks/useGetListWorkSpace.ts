import { QUERY_KEY } from '@constants';
import { getListWorkSpace } from '@services';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { WorkspaceType } from '@types';

export const useGetListWorkSpace = (
	page: number
): UseQueryResult<{
	data: WorkspaceType[];
	count: number;
}> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_WORKSPACE, page],
		queryFn: async () => {
			const { data } = await getListWorkSpace(page);
			return data;
		},
	});
};
