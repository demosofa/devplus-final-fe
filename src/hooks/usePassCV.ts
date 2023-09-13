import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { NOTIFICATION } from '@enums';
import { passCV } from '@services';
import { QUERY_KEY } from '@constants';

export function usePassCV() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const { data } = await passCV(id);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'pass CV successfully',
			});
			queryClient.refetchQueries([QUERY_KEY.LIST_CV]);
		},

		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'pass CV failed',
			});
		},
	});
}
