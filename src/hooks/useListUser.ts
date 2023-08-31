import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { PageMeta, UserType } from '@types';
import { getListUser } from 'services/user.service';

export const useGetListUser = (
	page: number,
	pageSize: number
): UseQueryResult<PageMeta<UserType>> => {
	return useQuery({
		queryKey: [QUERY_KEY.LIST_USER, page, pageSize],
		queryFn: async () => {
			const { data } = await getListUser(page, pageSize);
			return data;
		},
	});
};
