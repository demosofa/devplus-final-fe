import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { rejectWorkspace } from '@services';
import { NOTIFICATION } from '@enums';

export function useRejectWorkspace() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const { data } = await rejectWorkspace(id);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Reject workspace successfully.',
			});
			queryClient.refetchQueries();
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Reject workspace failed',
			});
		},
	});
}
