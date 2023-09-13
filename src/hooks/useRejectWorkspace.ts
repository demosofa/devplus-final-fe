import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { rejectWorkspace } from '@services';
import { NOTIFICATION } from '@enums';
import { QUERY_KEY } from '@constants';
import { NestError } from '@types';

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
