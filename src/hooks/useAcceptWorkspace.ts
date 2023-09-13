import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { acceptWorkspace } from '@services';
import { NestError, WorkspaceType } from '@types';
import { NOTIFICATION } from '@enums';
import { QUERY_KEY } from '@constants';

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
			queryClient.refetchQueries([QUERY_KEY.LIST_WORKSPACE]);
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
}
