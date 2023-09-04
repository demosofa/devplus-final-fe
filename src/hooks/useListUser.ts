import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { AuthPayload, PageMeta, UserType } from '@types';
import { getListUser } from 'services/user.services';

export const useGetListUser = (
	auth: AuthPayload | void,
	page: number,
	pageSize: number
): UseQueryResult<PageMeta<UserType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_USER, auth, page, pageSize],
		queryFn: async () => {
			const { data } = await getListUser(page, pageSize);
			return data;
		},
	});
};
