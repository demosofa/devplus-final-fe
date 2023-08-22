import { QUERY_KEY } from '@constants';
import { getListWorkSpace } from '@services';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { WORKSPACE } from 'types';

export const useGetListWorkSpace = (): UseQueryResult<WORKSPACE[]> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_WORKSPACE],
		queryFn: async () => {
			const { data } = await getListWorkSpace();
			return data;
		},
	});
};
