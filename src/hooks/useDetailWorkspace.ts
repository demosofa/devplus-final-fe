import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { detailWorkSpace } from '@services';
import { WorkspaceType } from '@types';

export const useDetailWorkspace = (
	id: number
): UseQueryResult<{
	data: WorkspaceType[];
}> => {
	return useQuery({
		queryKey: [QUERY_KEY.DETAIL_WORKSPACE],
		queryFn: async () => {
			const { data } = await detailWorkSpace(id);
			return data;
		},
	});
};
