import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { AuthPayload, PageMeta, UserType } from '@types';
import { getListUser } from '@services';

export const useGetListUser = (
	auth: AuthPayload | void,
	page: number,
	pageSize: number,
	searchTerm: string
): UseQueryResult<PageMeta<UserType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_USER, auth, page, pageSize, searchTerm],
		queryFn: async () => {
			const { data } = await getListUser(page, pageSize, searchTerm);
			return data;
		},
	});
};
