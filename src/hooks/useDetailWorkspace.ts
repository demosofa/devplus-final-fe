import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { QUERY_KEY } from '@constants';
import { detailWorkSpace } from '@services';

export const useDetailWorkspace = () => {
	const { id } = useParams();
	return useQuery({
		queryKey: [QUERY_KEY.DETAIL_WORKSPACE],
		queryFn: async () => {
			const { data } = await detailWorkSpace(Number(id));
			return data;
		},
	});
};
