import { QUERY_KEY } from '@constants';
import { acceptWorkspace } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WorkspaceType } from '@types';
import { notification } from 'antd';
import { WORKSPACE } from '@enums';

export function useAcceptWorkspace() {
	const [api] = notification.useNotification();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const { data } = await acceptWorkspace(id);
			return data as WorkspaceType;
		},
		onSuccess(_, id) {
			api.success({ message: 'Success accept workspace' });
			queryClient.setQueryData<WorkspaceType[]>(
				[QUERY_KEY.LIST_WORKSPACE],
				(lstWorkspace) => {
					if (lstWorkspace) {
						const idx = lstWorkspace.findIndex((item) => item.id == id);
						const cloned = lstWorkspace.concat();
						cloned[idx].status = WORKSPACE.ACCEPT;
						return cloned;
					}
				}
			);
		},
		onError() {
			api.error({ message: 'Fail to accept workspace' });
		},
	});
}
