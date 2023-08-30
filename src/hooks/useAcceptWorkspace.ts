import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { acceptWorkspace } from '@services';
import { WorkspaceType } from '@types';
import { NOTIFICATION } from '@enums';

export function useAcceptWorkspace() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const { data } = await acceptWorkspace(id);
			return data as WorkspaceType;
		},
		onSuccess() {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Accept workspace successfully.',
			});
			queryClient.refetchQueries();
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Accept workspace failed',
			});
		},
	});
}
