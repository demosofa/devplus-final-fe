import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@constants';
import { getDetailUser } from '@services';

export const useDetailUser = (id: number) => {
	return useQuery({
		queryKey: [QUERY_KEY.DETAIL_USER],
		queryFn: async () => {
			const { data } = await getDetailUser(id);
			return data;
		},
	});
};
