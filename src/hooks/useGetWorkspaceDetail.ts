import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';

import { getWorkspaceDetail } from '@services';

export const useGetWorkspaceDetail = (id: number) => {
	return useQuery({
		queryKey: [QUERY_KEY.DETAIL_WORKSPACE],
		queryFn: async () => {
			const { data } = await getWorkspaceDetail(id);
			return data;
		},
	});
};
