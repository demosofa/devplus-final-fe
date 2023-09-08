import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { NOTIFICATION } from '@enums';
import { failCV } from '@services';

export function useFailCV() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const { data } = await failCV(id);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'CV fail',
			});
			queryClient.refetchQueries();
		},

		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'error',
			});
		},
	});
}
