import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { QUERY_KEY } from '@constants';
import { rejectWorkspace } from '@services';

export function useRejectWorkspace() {
	const [api] = notification.useNotification();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [QUERY_KEY.LIST_WORKSPACE],
		mutationFn: async (id: number) => {
			const { data } = await rejectWorkspace(id);
			return data;
		},
		onSuccess() {
			api.success({ message: 'Success accept workspace' });
			queryClient.refetchQueries([QUERY_KEY.LIST_WORKSPACE]);
		},
		onError() {
			api.error({ message: 'Fail to reject workspace' });
		},
	});
}
