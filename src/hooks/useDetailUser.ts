import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '../constants/query-key';
import { getDetailUser } from 'services/user.services';

export const useDetailUser = (id: number) => {
	return useQuery({
		queryKey: [QUERY_KEY.DETAIL_USER],
		queryFn: async () => {
			const { data } = await getDetailUser(id);
			return data;
		},
	});
};
